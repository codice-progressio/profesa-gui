import { Injectable } from '@angular/core'
import { CRUD } from '../crud'
import { Empleado } from 'src/app/models/recursosHumanos/empleados/empleado.model'
import { EmpleadoFiltros } from '../utilidades/filtrosParaConsultas/empleado.filtros'
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service'
import { UtilidadesService } from '../utilidades/utilidades.service'
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service'
import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import { URL_SERVICIOS } from 'src/app/config/config'
import { Observable, throwError, concat } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service'
import { map, catchError } from 'rxjs/operators'
import { Permiso } from 'src/app/models/recursosHumanos/empleados/eventos/permiso.model'
import { Bono } from 'src/app/models/recursosHumanos/empleados/eventos/bono.model'
import { EstatusLaboral } from 'src/app/models/recursosHumanos/empleados/eventos/estatusLaboral.model'
import { toFormData } from 'src/app/utils/subidaDeImagenes/toFormData'
import { uploadProgress } from 'src/app/utils/subidaDeImagenes/uploadProgess'
import { toResponseBody } from 'src/app/utils/subidaDeImagenes/toResponseBody'
import { URL_BASE } from '../../config/config'
import { Paginacion } from '../../utils/paginacion.util'

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  base = URL_BASE('empleado')
  total: number = 0

  constructor(
    public http: HttpClient,
    public _msjService: ManejoDeMensajesService,
    public _utiliadesService: UtilidadesService,
    public _preLoaderService: PreLoaderService,
    public _paginadorService: PaginadorService,
    public _subirArchivo: SubirArchivoService
  ) {}

  errFun(err) {
    this._msjService.err(err)
    return throwError(err)
  }

  findAll(
    paginacion: Paginacion,
    filtros: string = ''
  ): Observable<Empleado[]> {
    const a = this._preLoaderService.loading('Cargando empleados')
    const url = this.base
      .concat('?')
      .concat(`desde=${paginacion.desde}`)
      .concat(`&limite=${paginacion.limite}`)
      .concat(`&campo=${paginacion.campoDeOrdenamiento}`)
      .concat(`&sort=${paginacion.orden}`)
      .concat(`&${filtros}`)

    return this.http.get(url).pipe(
      map((respuesta: any) => {
        this._msjService.ok_(respuesta, null, a)

        const empleados: Empleado[] = []

        respuesta.empleados.forEach(x =>
          empleados.push(new Empleado().deserialize(x))
        )
        this.total = respuesta.total
        return empleados
      }),
      catchError(err => this.errFun(err))
    )
  }

  findById(id: string): Observable<Empleado> {
    const a = this._preLoaderService.loading('Cargando empleados')
    const url = this.base.concat(`/${id}`)
    return this.http.get(url).pipe(
      map((respuesta: any) => {
        this._msjService.ok_(respuesta, null, a)

        return new Empleado().deserialize(respuesta.empleado)
      }),
      catchError(err => this.errFun(err))
    )
  }

  find(
    termino: string,
    paginacion: Paginacion,
    filtros: string = ''
  ): Observable<Empleado[]> {
    const a = this._preLoaderService.loading(
      'Buscando empleados con el termino: ' + termino
    )
    const url = this.base
      .concat(`/buscar/${termino}`)
      .concat('?')
      .concat(`&desde=${paginacion.desde}`)
      .concat(`&limite=${paginacion.limite}`)
      .concat(`&campo=${paginacion.campoDeOrdenamiento}`)
      .concat(`&sort=${paginacion.orden}`)
      .concat(`&${filtros}`)

    return this.http.get(url).pipe(
      map((respuesta: any) => {
        this._msjService.ok_(respuesta, null, a)

        const empleados: Empleado[] = []

        respuesta.empleados.forEach(x =>
          empleados.push(new Empleado().deserialize(x))
        )

        this.total = respuesta.total

        return empleados
      }),
      catchError(err => this.errFun(err))
    )
  }

  delete(id: string): Observable<Empleado> {
    const a = this._preLoaderService.loading('Buscando empleados')
    const url = this.base.concat(`/${id}`)

    return this.http.delete(url).pipe(
      map((respuesta: any) => {
        this._msjService.ok_(respuesta, null, a)

        return new Empleado().deserialize(respuesta.empleado)
      }),
      catchError(err => this.errFun(err))
    )
  }

  /**
   *Es la misma operacion que guardar o modifcar. Solo lo pongo para semantica.
   *
   * @param {Empleado} empleado
   * @returns {Observable<any>}
   * @memberof EmpleadoService
   */
  update(empleado: Empleado): Observable<any> {
    return this.guardarOModificar(empleado)
  }
  /**
   *Es la misma operacion que guardarOModicar. Solo lo pongo para semantica
   *
   * @param {Empleado} empleado
   * @returns {Observable<any>}
   * @memberof EmpleadoService
   */
  save(empleado: Empleado): Observable<any> {
    return this.guardarOModificar(empleado)
  }

  /**
   *Guarda el empleado con todo y foto.
   *
   * @param {Empleado} empleado
   * @param {File} foto
   * @returns {Observable<null>}
   * @memberof EmpleadoService
   */
  guardarOModificar(empleado: Empleado): Observable<any> {
    let a = this._preLoaderService.loading('Haciendo algo con el empleado')

    let url = this.base
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

    return this.registroDeEventoGenerico(url, a, { _id, idHisto })
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

    return this.registroDeEventoGenerico(url, a, { _id, idHisto, motivo })
  }

  registrarBono(_id: string, bono: Bono) {
    const a = this.preloaderEvento('Aplicando cambio de bono')
    const url = this.urlEvento('bono')

    bono['_id'] = _id

    return this.registroDeEventoGenerico(url, a, bono)
  }

  // <!--
  // =====================================
  //  Estatus laboral
  // =====================================
  // -->

  // Cada operacion la hizimos de manera atomica.
  // No permite tener mas control

  registrarEstatusLaboral_baja(_id: string, observaciones: string) {
    const a = this.preloaderEvento('Aplicando baja al empleado')
    const url = this.urlEvento('estatusLaboral/baja')
    const datos = { _id, observaciones }
    return this.registroDeEventoGenerico(url, a, datos)
  }

  registrarEstatusLaboral_reingreso(_id: string, observaciones: string) {
    const a = this.preloaderEvento('Aplicando reingreso al empleado')
    const url = this.urlEvento('estatusLaboral/reingreso')
    const datos = { _id, observaciones }
    return this.registroDeEventoGenerico(url, a, datos)
  }

  registrarEstatusLaboral_incapacidad_enfermedadGeneral(
    _id: string,
    datos: EstatusLaboral
  ) {
    const a = this.preloaderEvento(
      'Aplicando incapacidad por enfermedad general al empleado'
    )
    const url = this.urlEvento('estatusLaboral/incapacidad/enfermedadGeneral')

    datos['_id'] = _id
    return this.registroDeEventoGenerico(url, a, datos)
  }

  registrarEstatusLaboral_incapacidad_riesgoDeTrabajo(
    _id: string,
    datos: EstatusLaboral
  ) {
    const a = this.preloaderEvento(
      'Aplicando incapacidad por riesgo de trabajo al empleado'
    )
    const url = this.urlEvento('estatusLaboral/incapacidad/riesgoDeTrabajo')

    datos['_id'] = _id
    return this.registroDeEventoGenerico(url, a, datos)
  }

  registrarEstatusLaboral_incapacidad_maternidad(
    _id: string,
    datos: EstatusLaboral
  ) {
    const a = this.preloaderEvento(
      'Aplicando incapacidad por maternidad al empleado'
    )
    const url = this.urlEvento('estatusLaboral/incapacidad/maternidad')

    datos['_id'] = _id
    return this.registroDeEventoGenerico(url, a, datos)
  }

  // <!--
  // =====================================
  //  END Estatus laboral
  // =====================================
  // -->

  eliminarEvento(_id: string, idHisto: string) {
    const a = this.preloaderEvento('Aplicando baja al empleado')
    const url = this.urlEvento(`${_id}/${idHisto}`)

    return this.http.delete(url).pipe(
      map((resp: any) => this.mapFun(resp, a)),
      catchError(err => this.errFun(err))
    )
  }
}
