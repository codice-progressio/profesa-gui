import { Injectable } from '@angular/core';
import { URL_BASE } from 'src/app/config/config'
import { HttpClient } from '@angular/common/http'
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service'
import { UtilidadesService } from '../utilidades/utilidades.service'
import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import { throwError, Observable } from 'rxjs'
import { Paginacion } from 'src/app/utils/paginacion.util'
import { Tamano } from 'src/app/models/tamano.models'
import { map, catchError } from 'rxjs/operators'



@Injectable({
  providedIn: 'root'
})
export class TamanoService   {
  total: number = 0
  base = URL_BASE('tamano')

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

  findAll(paginacion: Paginacion, filtros: string = ''): Observable<Tamano[]> {
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
        return respuesta.tamanos as Tamano[]
      }),
      catchError(err => this.errFun(err))
    )
  }

  findById(id: string): Observable<Tamano> {
    const url = this.base.concat(`/${id}`)
    return this.http.get(url).pipe(
      map((respuesta: any) => {
        return respuesta.tamano as Tamano
      }),
      catchError(err => this.errFun(err))
    )
  }

  findByTerm(
    termino: string,
    paginacion: Paginacion,
    filtros: string = ''
  ): Observable<Tamano[]> {
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
        return res.tamanos as Tamano[]
      }),
      catchError(err => this.errFun(err))
    )
  }

  delete(id: string): Observable<Tamano> {
    const url = this.base.concat(`/${id}`)

    return this.http.delete(url).pipe(
      map((respuesta: any) => {
        this.msjService.toastCorrecto(respuesta.mensaje)
        return respuesta.tamano as Tamano
      }),
      catchError(err => this.errFun(err))
    )
  }

  update(tamano: Tamano): Observable<Tamano> {
    let url = this.base
    return this.http.put<Tamano>(url, tamano).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mensaje)
        return resp.tamano as Tamano
      }),
      catchError(err => this.errFun(err))
    )
  }

  save(tamano: Tamano): Observable<Tamano> {
    let url = this.base

    return this.http.post<Tamano>(url, tamano).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mensaje)
        return resp.tamano as Tamano
      }),
      catchError(err => this.errFun(err))
    )
  }

}
