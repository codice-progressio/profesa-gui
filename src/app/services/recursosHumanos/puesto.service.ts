import { Injectable } from '@angular/core'
import { CRUD } from '../crud'
import { Puesto } from 'src/app/models/recursosHumanos/puestos/puesto.model'
import { PuestoFiltros } from '../utilidades/filtrosParaConsultas/puesto.filtros'
import { HttpClient } from '@angular/common/http'
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service'
import { UtilidadesService } from '../utilidades/utilidades.service'
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service'
import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import { URL_SERVICIOS } from 'src/app/config/config'
import { Observable, pipe, throwError } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { uploadProgress } from '../../utils/subidaDeImagenes/uploadProgess'
import { toResponseBody } from '../../utils/subidaDeImagenes/toResponseBody'
import { toFormData } from '../../utils/subidaDeImagenes/toFormData'

@Injectable({
  providedIn: 'root'
})
export class PuestoService extends CRUD<
  Puesto,
  PuestoService,
  PuestoFiltros<PuestoService>
> {
  constructor(
    public http: HttpClient,
    public _msjService: ManejoDeMensajesService,
    public _utiliadesService: UtilidadesService,
    public _preLoaderService: PreLoaderService,
    public _paginadorService: PaginadorService
  ) {
    super(
      http,
      _msjService,
      _utiliadesService,
      _preLoaderService,
      _paginadorService
    )
    this.base = URL_SERVICIOS + `/puesto`
    this.nombreDeDatos.plural = 'puestos'
    this.nombreDeDatos.singular = 'puesto'
    this.urlBusqueda = '/buscar'
  }

  todo(): Observable<Puesto[]> {
    return this.getAll(
      undefined,
      undefined,
      this.filtrosDelFolio.obtenerFiltros(),
      Puesto,
      true
    )
  }

  findMultiple(ids: string[]): Observable<Puesto[]> {
    let a = this._preLoaderService.loading(
      'Poblacion manual de puestos en proceso'
    )
    let url = this.base + '/multiple'
    return this.http.post<Puesto[]>(url, ids).pipe(
      map((resp: any) => {
        this._msjService.ok_(resp, null, a)
        return resp.puestos.map(puesto => new Puesto().deserialize(puesto))
      }),
      catchError(this.err)
    )
  }

  filtrarPuesto(remplazos: Puesto[], id: string) {
    let filtrado = remplazos.find(p => p._id === id)
    return filtrado
  }

  guardarConOrganigrama(puesto: Puesto) {
    const a = this._preLoaderService.loading(
      'Guardando puesto con su organigrama'
    )

    const url = `${this.base}/`
    return this.http
      .post(url, toFormData(puesto), {
        reportProgress: true,
        observe: 'events'
      })
      .pipe(
        uploadProgress(progress => {
          this._preLoaderService.progreso(a, progress, 'Cargando organigrama')
        }),
        toResponseBody((respuesta, nada, a) => {
          this._msjService.ok_(respuesta, null, a)
          return respuesta.puesto
        }, a),
        catchError(err => this.err(err))
      )
  }
  modificarConOrganigrama(puesto: Puesto) {
    const a = this._preLoaderService.loading(
      'Modificando puesto con su organigrama'
    )
    const url = `${this.base}/`
    return this.http
      .put(url, toFormData(puesto), {
        reportProgress: true,
        observe: 'events'
      })
      .pipe(
        uploadProgress(p => {
          this._preLoaderService.progreso(a, p, 'Cargando organigrama')
        }),
        toResponseBody((res, nada, a) => {
          this._msjService.ok_(res, null, a)
          return res.puesto
        }, a),
        catchError(err => this.err(err))
      )
  }
}
