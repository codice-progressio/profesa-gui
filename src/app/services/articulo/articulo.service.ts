import { Injectable } from '@angular/core'
import { Articulo } from 'src/app/models/almacenDeMateriaPrimaYHerramientas/articulo.modelo'
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service'
import { UtilidadesService } from '../utilidades/utilidades.service'
import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import { URL_BASE } from 'src/app/config/config'
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { SalidaArticulo } from '../../models/almacenDeMateriaPrimaYHerramientas/salidaArticulo.model'
import { map, catchError } from 'rxjs/operators'
import { EntradaArticulo } from '../../models/almacenDeMateriaPrimaYHerramientas/entradaArticulo.model'
import { Paginacion } from 'src/app/utils/paginacion.util'

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  total: number = 0
  base = URL_BASE('articulo')

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
  ): Observable<Articulo[]> {
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
        return respuesta.articulos as Articulo[]
      }),
      catchError(err => this.errFun(err))
    )
  }

  findById(id: string): Observable<Articulo> {
    const url = this.base.concat(`/buscar/id/${id}`)
    return this.http.get(url).pipe(
      map((respuesta: any) => {
        return respuesta.articulo as Articulo
      }),
      catchError(err => this.errFun(err))
    )
  }

  findByTerm(
    termino: string,
    paginacion: Paginacion,
    filtros: string = ''
  ): Observable<Articulo[]> {
    const url = this.base
      .concat(`/buscar/termino/${termino}`)
      .concat('?')
      .concat(`&desde=${paginacion.desde}`)
      .concat(`&limite=${paginacion.limite}`)
      .concat(`&campo=${paginacion.campoDeOrdenamiento}`)
      .concat(`&sort=${paginacion.orden}`)
      .concat(`&${filtros}`)

    return this.http.get(url).pipe(
      map((res: any) => {
        this.total = res.total
        return res.articulos as Articulo[]
      }),
      catchError(err => this.errFun(err))
    )
  }

  delete(id: string): Observable<Articulo> {
    const url = this.base.concat(`/${id}`)

    return this.http.delete(url).pipe(
      map((respuesta: any) => {
        this.msjService.toastCorrecto(respuesta.mensaje)
        return respuesta.articulo as Articulo
      }),
      catchError(err => this.errFun(err))
    )
  }

  update(articulo: Articulo): Observable<Articulo> {
    let url = this.base
    return this.http.put<Articulo>(url, articulo).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mensaje)
        return resp.articulo as Articulo
      }),
      catchError(err => this.errFun(err))
    )
  }

  save(articulo: Articulo): Observable<Articulo> {
    let url = this.base

    return this.http.post<Articulo>(url, articulo).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mensaje)
        return resp.articulo as Articulo
      }),
      catchError(err => this.errFun(err))
    )
  }

  salida(id: string, salida: SalidaArticulo): Observable<Articulo> {
    return this.http.put(`${this.base}/salida/${id}`, salida).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mensaje)
        return resp.articulo as Articulo
      }),
      catchError(err => this.errFun(err))
    )
  }
  entrada(id: string, entrada: EntradaArticulo): Observable<Articulo> {
    return this.http.put(`${this.base}/entrada/${id}`, entrada).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mensaje)
        return resp.articulo as Articulo
      }),
      catchError(err => this.errFun(err))
    )
  }
  
  
  existencias() {
    return this.http
      .get<any>(`${this.base}/reporte/existencias`)
      .pipe(catchError(err => this.errFun(err)))
  }

  
}
