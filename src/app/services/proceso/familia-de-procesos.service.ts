import { Injectable } from '@angular/core'
import { PaginadorService } from '../../components/paginador/paginador.service'
import { HttpClient } from '@angular/common/http'

import { URL_BASE } from 'src/app/config/config'
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service'
import { UtilidadesService } from '../utilidades/utilidades.service'
import { throwError, Observable } from 'rxjs'
import { Paginacion } from 'src/app/utils/paginacion.util'
import { map, catchError } from 'rxjs/operators'
import { FamiliaDeProcesos } from 'src/app/models/familiaDeProcesos.model'

@Injectable({
  providedIn: 'root'
})
export class FamiliaDeProcesosService {
  total: number = 0
  base = URL_BASE('familiaDeProcesos')

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
  ): Observable<FamiliaDeProcesos[]> {
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
        return respuesta.familiaDeProcesos as FamiliaDeProcesos[]
      }),
      catchError(err => this.errFun(err))
    )
  }

  findById(id: string): Observable<FamiliaDeProcesos> {
    const url = this.base.concat(`/${id}`)
    return this.http.get(url).pipe(
      map((respuesta: any) => {
        return respuesta.familiaDeProcesos as FamiliaDeProcesos
      }),
      catchError(err => this.errFun(err))
    )
  }

  findByTerm(
    termino: string,
    paginacion: Paginacion,
    filtros: string = ''
  ): Observable<FamiliaDeProcesos[]> {
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
        return res.familiasDeProcesos as FamiliaDeProcesos[]
      }),
      catchError(err => this.errFun(err))
    )
  }

  delete(id: string): Observable<FamiliaDeProcesos> {
    const url = this.base.concat(`/${id}`)

    return this.http.delete(url).pipe(
      map((respuesta: any) => {
        this.msjService.toastCorrecto(respuesta.mensaje)
        return respuesta.familiaDeProcesos as FamiliaDeProcesos
      }),
      catchError(err => this.errFun(err))
    )
  }

  update(familiaDeProcesos: FamiliaDeProcesos): Observable<FamiliaDeProcesos> {
    let url = this.base
    return this.http.put<FamiliaDeProcesos>(url, familiaDeProcesos).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mensaje)
        return resp.familiaDeProcesos as FamiliaDeProcesos
      }),
      catchError(err => this.errFun(err))
    )
  }

  save(familiaDeProcesos: FamiliaDeProcesos): Observable<FamiliaDeProcesos> {
    let url = this.base

    return this.http.post<FamiliaDeProcesos>(url, familiaDeProcesos).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mensaje)
        return resp.familiaDeProcesos as FamiliaDeProcesos
      }),
      catchError(err => this.errFun(err))
    )
  }
}
