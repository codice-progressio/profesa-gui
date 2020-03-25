import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICIOS, URL_BASE } from 'src/app/config/config';
import { Modelo } from 'src/app/models/modelo.models';
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service';
import { UtilidadesService } from '../utilidades/utilidades.service';
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service';
import { PaginadorService } from 'src/app/components/paginador/paginador.service';
import { CRUD } from '../crud';
import { Tamano } from 'src/app/models/tamano.models';
import { throwError, Observable } from 'rxjs'
import { Paginacion } from 'src/app/utils/paginacion.util'
import { map, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ModeloService  {
  total: number = 0
  base = URL_BASE('modelo')

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

  findAll(paginacion: Paginacion, filtros: string = ''): Observable<Modelo[]> {
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
        return respuesta.modelos as Modelo[]
      }),
      catchError(err => this.errFun(err))
    )
  }

  findById(id: string): Observable<Modelo> {
    const url = this.base.concat(`/${id}`)
    return this.http.get(url).pipe(
      map((respuesta: any) => {
        return respuesta.modelo as Modelo
      }),
      catchError(err => this.errFun(err))
    )
  }

  findByTerm(
    termino: string,
    paginacion: Paginacion,
    filtros: string = ''
  ): Observable<Modelo[]> {
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
        return res.modelos as Modelo[]
      }),
      catchError(err => this.errFun(err))
    )
  }

  delete(id: string): Observable<Modelo> {
    const url = this.base.concat(`/${id}`)

    return this.http.delete(url).pipe(
      map((respuesta: any) => {
        this.msjService.toastCorrecto(respuesta.mensaje)
        return respuesta.modelo as Modelo
      }),
      catchError(err => this.errFun(err))
    )
  }

  update(modelo: Modelo): Observable<Modelo> {
    let url = this.base
    return this.http.put<Modelo>(url, modelo).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mensaje)
        return resp.modelo as Modelo
      }),
      catchError(err => this.errFun(err))
    )
  }

  save(modelo: Modelo): Observable<Modelo> {
    let url = this.base

    return this.http.post<Modelo>(url, modelo).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mensaje)
        return resp.modelo as Modelo
      }),
      catchError(err => this.errFun(err))
    )
  }


}
