import { Injectable } from '@angular/core'
import { CRUD } from '../crud'
import { Empleado } from 'src/app/models/recursosHumanos/empleados/empleado.model'
import { EmpleadoFiltros } from '../utilidades/filtrosParaConsultas/empleado.filtros'
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service'
import { UtilidadesService } from '../utilidades/utilidades.service'
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service'
import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import { URL_SERVICIOS } from 'src/app/config/config'
import { Observable, throwError } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service'
import { map, catchError } from 'rxjs/operators'
import { Permiso } from 'src/app/models/recursosHumanos/empleados/eventos/permiso.model'
import { Bono } from 'src/app/models/recursosHumanos/empleados/eventos/bono.model'
import { EstatusLaboral } from 'src/app/models/recursosHumanos/empleados/eventos/estatusLaboral.model'
import { toFormData } from 'src/app/utils/subidaDeImagenes/toFormData'
import { uploadProgress } from 'src/app/utils/subidaDeImagenes/uploadProgess'
import { toResponseBody } from 'src/app/utils/subidaDeImagenes/toResponseBody'

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService extends CRUD<
  Empleado,
  EmpleadoService,
  EmpleadoFiltros<EmpleadoService>
> {
  constructor(
    public http: HttpClient,
    public _msjService: ManejoDeMensajesService,
    public _utiliadesService: UtilidadesService,
    public _preLoaderService: PreLoaderService,
    public _paginadorService: PaginadorService,
    public _subirArchivo: SubirArchivoService
  ) {
    super(
      http,
      _msjService,
      _utiliadesService,
      _preLoaderService,
      _paginadorService
    )
    this.base = URL_SERVICIOS + `/empleado`
    this.nombreDeDatos.plural = 'empleados'
    this.nombreDeDatos.singular = 'empleado'
    this.urlBusqueda = '/buscar'
  }

  todo(): Observable<Empleado[]> {
    return this.getAll(
      undefined,
      undefined,
      this.filtrosDelFolio.obtenerFiltros(),
      Empleado,
      false
    )
  }

  /**
   *Guarda el empleado con todo y foto.
   *
   * @param {Empleado} empleado
   * @param {File} foto
   * @returns {Observable<null>}
   * @memberof EmpleadoService
   */
  guardarOModificarConFoto(empleado: Empleado): Observable<any> {
    let a = this._preLoaderService.loading('Haciendo algo con el empleado')

    let url = this.base + '/guardarConFoto'
    return this.http
      .post(url, toFormData(empleado), {
        reportProgress: true,
        observe: 'events'
      })
      .pipe(
        uploadProgress(progress =>
          this._preLoaderService.progreso(
            a,
            progress,
            'Cargando fotografia del empledo'
          )
        ),
        toResponseBody((respuesta, nada, a) => {
          this._msjService.ok_(respuesta, nada, a)
        }, a),
        catchError(err => {
          this._msjService.err(err)

          return throwError(err)
        })
      )
  }

  mapFun(resp: any, a) {
    this._msjService.ok_(resp, null, a)
    return true
  }

  errFun(err) {
    this._msjService.err(err)
    return throwError(err)
  }
  registroDeEventoGenerico(url, a, datos): Observable<boolean> {
    return this.http.put(url, datos).pipe(
      map((resp: any) => this.mapFun(resp, a)),
      catchError(err => this.errFun(err))
    )
  }

  preloaderEvento = msj => this._preLoaderService.loading('EVENTO: ' + msj)
  urlEvento = url => `${this.base}/evento/${url}`

  registrarCurso(
    _id: string,
    fecha: Date,
    idCurso: string
  ): Observable<boolean> {
    const a = this.preloaderEvento('Agregando curso a empleado')
    const url = this.urlEvento('curso')
    return this.registroDeEventoGenerico(url, a, { _id: _id, idCurso, fecha })
  }

  registrarVacaciones(
    _id: string,
    fecha: Date = new Date(),
    desde: Date,
    hasta: Date
  ) {
    const a = this.preloaderEvento('Agregando vacaciones a empleado')
    const url = this.urlEvento('vacaciones')
    return this.registroDeEventoGenerico(url, a, {
      _id,
      fecha,
      desde,
      hasta
    })
  }

  registrarSueldo(_id: string, nuevoSueldo: number, observacion: string) {
    const a = this.preloaderEvento('Agregando aumento al empleado')
    const url = this.urlEvento('sueldo')
    return this.registroDeEventoGenerico(url, a, {
      _id,
      nuevoSueldo,
      observacion
    })
  }

  registrarPuesto(_id: string, _idPuestoNuevo: number, observaciones: string) {
    const a = this.preloaderEvento('Aplicando cambio de puesto')
    const url = this.urlEvento('puesto')
    return this.registroDeEventoGenerico(url, a, {
      _id,
      _idPuestoNuevo,
      observaciones
    })
  }

  registrarFelicitacionPorEscrito(_id: string, documento: File, fecha: Date) {
    const a = this.preloaderEvento('Registrando felicitacion por escrito')
    const url = this.urlEvento('felicitacion')
    return this.http
      .put(url, toFormData({ _id, documento, fecha }), {
        reportProgress: true,
        observe: 'events'
      })
      .pipe(
        uploadProgress(progress =>
          this._preLoaderService.progreso(
            a,
            progress,
            'Cargando documento felicitacion del empleado'
          )
        ),
        toResponseBody((respuesta, nada, a) => {
          this._msjService.ok_(respuesta, nada, a)
        }, a),
        catchError(err => this.errFun(err))
      )
  }

  registrarAmonestacionPorEscrito(_id: string, documento: File, fecha: Date) {
    const a = this.preloaderEvento('Registrando monestacion por escrito')
    const url = this.urlEvento('amonestacion')

    return this.http
      .put(url, toFormData({ _id, documento, fecha }), {
        reportProgress: true,
        observe: 'events'
      })
      .pipe(
        uploadProgress(progress =>
          this._preLoaderService.progreso(
            a,
            progress,
            'Cargando documento amonestacion del empleado'
          )
        ),
        toResponseBody((respuesta, nada, a) => {
          this._msjService.ok_(respuesta, nada, a)
        }, a),
        catchError(err => this.errFun(err))
      )
  }

  registrarCastigo(_id: string, acta: File, fecha: Date) {
    const a = this.preloaderEvento('Registrando castigo por escrito')
    const url = this.urlEvento('castigo')
    return this.http
      .put(url, toFormData({ _id, acta, fecha }), {
        reportProgress: true,
        observe: 'events'
      })
      .pipe(
        uploadProgress(progress =>
          this._preLoaderService.progreso(
            a,
            progress,
            'Cargando documento castigo del empleado'
          )
        ),
        toResponseBody((respuesta, nada, a) => {
          this._msjService.ok_(respuesta, nada, a)
        }, a),
        catchError(err => this.errFun(err))
      )
  }

  registrarPermiso(_id: string, permiso: Permiso) {
    const a = this.preloaderEvento('Registrando permiso')
    const url = this.urlEvento('permiso')

    permiso['_id'] = _id

    return this.registroDeEventoGenerico(url, a, permiso)
  }


  /**
   * Autoriza un permiso que este pendiente de autorizacion. 
   *
   * @param {string} _id
   * @param {string} idHisto El id del historial de eventos que contiene
   * el objeto 'permiso' y que queremos autorizar. 
   * @returns
   * @memberof EmpleadoService
   */
  permisoAutorizar(_id: string, idHisto: string) {
    const a = this.preloaderEvento('Autorizando permiso')
    const url = this.urlEvento('permiso/autorizar')

    return this.registroDeEventoGenerico(url, a, {_id, idHisto})
  }
  /**
   * Rechaza un permiso que este pendiente de autorizacion. 
   *
   * @param {string} _id
   * @param {string} idHisto El id del historial de eventos que contiene
   * el objeto 'permiso' y que queremos autorizar. 
   * @returns
   * @memberof EmpleadoService
   */
  permisoRechazar(_id: string, idHisto: string, motivo: string) {
    const a = this.preloaderEvento('Rechazando permiso')
    const url = this.urlEvento('permiso/rechazar')

    return this.registroDeEventoGenerico(url, a, {_id, idHisto, motivo})
  }


  

  registrarBono(_id: string, bono: Bono) {
    const a = this.preloaderEvento('Aplicando cambio de bono')
    const url = this.urlEvento('bono')

    bono['_id'] = _id

    return this.registroDeEventoGenerico(url, a, bono)
  }
  
  registrarEstatusLaboral(_id: string, datos: EstatusLaboral) {
    const a = this.preloaderEvento('Aplicando cambio de estatus laboral')
    const url = this.urlEvento('estatusLaboral')

    datos['_id'] = _id

    return this.registroDeEventoGenerico(url, a, datos)
  }
}