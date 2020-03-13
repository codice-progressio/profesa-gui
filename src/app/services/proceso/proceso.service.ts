import { Injectable } from '@angular/core'
import { URL_SERVICIOS, URL_BASE } from '../../config/config'
import { HttpClient } from '@angular/common/http'
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service'
import { Proceso } from 'src/app/models/proceso.model'
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service'
import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import { CRUD } from '../crud'
import { UtilidadesService } from '../utilidades/utilidades.service'
import { Observable } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { throwError } from 'rxjs/internal/observable/throwError'
import { Paginacion } from 'src/app/utils/paginacion.util'

@Injectable({
  providedIn: 'root'
})
export class ProcesoService extends CRUD<Proceso, undefined, undefined> {
  total: number = 0
  base = URL_BASE('proceso')

  constructor(
    public http: HttpClient,
    public msjService: ManejoDeMensajesService,
    public _utiliadesService: UtilidadesService,
    public _preLoaderService: PreLoaderService,
    public _paginadorService: PaginadorService
  ) {
    super(
      http,
      msjService,
      _utiliadesService,
      _preLoaderService,
      _paginadorService
    )
    this.base = URL_SERVICIOS + `/proceso`
    this.nombreDeDatos.plural = 'procesos'
    this.nombreDeDatos.singular = 'proceso'
    this.urlBusqueda = '/buscar'
  }

  errFun(err) {
    this._msjService.err(err)
    return throwError(err)
  }

  findAll(paginacion: Paginacion, filtros: string = ''): Observable<Proceso[]> {
    const a = this._preLoaderService.loading('Cargando proceso')
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

        const procesos: Proceso[] = []

        this.total = respuesta.total

        respuesta.procesos.forEach(x =>
          procesos.push(new Proceso().deserialize(x))
        )
        this.total = respuesta.total
        return procesos
      }),
      catchError(err => this.errFun(err))
    )
  }

  findById(id: string): Observable<Proceso> {
    const a = this._preLoaderService.loading('Cargando procesos')
    const url = this.base.concat(`/${id}`)
    return this.http.get(url).pipe(
      map((respuesta: any) => {
        this._msjService.ok_(respuesta, null, a)

        return new Proceso().deserialize(respuesta.proceso)
      }),
      catchError(err => this.errFun(err))
    )
  }

  find(
    termino: string,
    paginacion: Paginacion,
    filtros: string = ''
  ): Observable<Proceso[]> {
    const a = this._preLoaderService.loading(
      'Buscando procesos con el termino: ' + termino
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
        const procesos: Proceso[] = []

        respuesta.procesos.forEach(x =>
          procesos.push(new Proceso().deserialize(x))
        )

        this.total = respuesta.total

        return procesos
      }),
      catchError(err => this.errFun(err))
    )
  }

  delete(id: string): Observable<Proceso> {
    const a = this._preLoaderService.loading('Eliminando proceso')
    const url = this.base.concat(`/${id}`)

    return this.http.delete(url).pipe(
      map((respuesta: any) => {
        this._msjService.ok_(respuesta, null, a)

        return new Proceso().deserialize(respuesta.proceso)
      }),
      catchError(err => this.errFun(err))
    )
  }

  update(proceso: Proceso): Observable<Proceso> {
    const a = this._preLoaderService.loading('Modificando proceso')
    let url = this.base

    return this.http.put<Proceso>(url, proceso).pipe(
      map((resp: any) => {
        this.msjService.ok_(resp, null, a)
        return resp.proceso as Proceso
      }),
      catchError(err => this.errFun(err))
    )
  }

  save(proceso: Proceso): Observable<Proceso> {
    const a = this._preLoaderService.loading('Guardando proceso')
    let url = this.base

    return this.http.post<Proceso>(url, proceso).pipe(
      map((resp: any) => {
        this.msjService.ok_(resp, null, a)
        return resp.proceso as Proceso
      }),
      catchError(err => this.errFun(err))
    )
  }

  findById_multiple(ids: string[]): Observable<Proceso[]> {
    let a = this._preLoaderService.loading('Buscando procesos por defecto')
    let i = { busqueda: ids }
    return this.http.post(`${this.base}/buscar_multiple`, i).pipe(
      map(resp => this.findById_cb(resp, a)),
      catchError(this.err)
    )
  }

  private findById_cb(resp, a) {
    let p: Proceso[] = []
    resp.procesos.forEach(pp => {
      let np = new Proceso().deserialize(pp)
      p.push(np)
    })
    this.msjService.ok_(resp, null, a)

    return p
  }
}
