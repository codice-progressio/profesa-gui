import { Injectable } from '@angular/core'
import { AlmacenDescripcion } from '../../models/almacenDeMateriaPrimaYHerramientas/almacen-descripcion.model'
import {} from '../utilidades/filtrosParaConsultas/FiltrosArticulos'
import { HttpClient } from '@angular/common/http'
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service'
import { UtilidadesService } from '../utilidades/utilidades.service'
import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import { URL_BASE } from 'src/app/config/config'
import { Observable, throwError } from 'rxjs'
import { Paginacion } from 'src/app/utils/paginacion.util'
import { map, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AlmacenDescripcionService {
  total: number = 0
  base = URL_BASE('almacendescripcion')

  constructor(
    public http: HttpClient,
    public msjService: ManejoDeMensajesService,
    public utiliadesService: UtilidadesService,
    public paginadorService: PaginadorService
  ) {}

  errFun(err) {
    this.msjService.err(err)
    return throwError(err)
  }

  findAll(
    paginacion: Paginacion,
    filtros: string = ''
  ): Observable<AlmacenDescripcion[]> {
    const url = this.base
      .concat('?')
      .concat(`desde=${paginacion.desde}`)
      .concat(`&limite=${paginacion.limite}`)
      .concat(`&campo=${paginacion.campoDeOrdenamiento}`)
      .concat(`&sort=${paginacion.orden}`)
      .concat(`&${filtros}`)

    return this.http.get(url).pipe(
      map((respuesta: any) => {
        this.total = respuesta.total
        return respuesta.almacenesDescripcion as AlmacenDescripcion[]
      }),
      catchError(err => this.errFun(err))
    )
  }

  findById(id: string): Observable<AlmacenDescripcion> {
    const url = this.base.concat(`/${id}`)
    return this.http.get(url).pipe(
      map((respuesta: any) => {
        return respuesta.almacenDescripcion as AlmacenDescripcion
      }),
      catchError(err => this.errFun(err))
    )
  }

  findByTerm(
    termino: string,
    paginacion: Paginacion,
    filtros: string = ''
  ): Observable<AlmacenDescripcion[]> {
    const url = this.base
      .concat(`/buscar/${termino}`)
      .concat('?')
      .concat(`&desde=${paginacion.desde}`)
      .concat(`&limite=${paginacion.limite}`)
      .concat(`&campo=${paginacion.campoDeOrdenamiento}`)
      .concat(`&sort=${paginacion.orden}`)
      .concat(`&${filtros}`)

    return this.http.get(url).pipe(
      map((res: any) => {
        this.total = res.total
        return res.almacenesDescripcion as AlmacenDescripcion[]
      }),
      catchError(err => this.errFun(err))
    )
  }

  delete(id: string): Observable<AlmacenDescripcion> {
    const url = this.base.concat(`/${id}`)

    return this.http.delete(url).pipe(
      map((respuesta: any) => {
        this.msjService.toastCorrecto(respuesta.mensaje)
        return respuesta.almacendescripcion as AlmacenDescripcion
      }),
      catchError(err => this.errFun(err))
    )
  }

  update(
    almacendescripcion: AlmacenDescripcion
  ): Observable<AlmacenDescripcion> {
    let url = this.base
    return this.http.put<AlmacenDescripcion>(url, almacendescripcion).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mensaje)
        return resp.almacendescripcion as AlmacenDescripcion
      }),
      catchError(err => this.errFun(err))
    )
  }

  save(almacendescripcion: AlmacenDescripcion): Observable<AlmacenDescripcion> {
    let url = this.base

    return this.http.post<AlmacenDescripcion>(url, almacendescripcion).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mensaje)
        return resp.almacendescripcion as AlmacenDescripcion
      }),
      catchError(err => this.errFun(err))
    )
  }
}
