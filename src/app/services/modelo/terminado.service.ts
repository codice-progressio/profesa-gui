import { Injectable } from '@angular/core';
import { URL_BASE } from 'src/app/config/config'
import { HttpClient } from '@angular/common/http'
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service'
import { UtilidadesService } from '../utilidades/utilidades.service'
import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import { throwError, Observable } from 'rxjs'
import { Paginacion } from 'src/app/utils/paginacion.util'
import { Terminado } from 'src/app/models/terminado.models'
import { map, catchError } from 'rxjs/operators'



@Injectable({
  providedIn: 'root'
})
export class TerminadoService   {
  total: number = 0
  base = URL_BASE('terminado')

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

  findAll(paginacion: Paginacion, filtros: string = ''): Observable<Terminado[]> {
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
        return respuesta.terminados as Terminado[]
      }),
      catchError(err => this.errFun(err))
    )
  }

  findById(id: string): Observable<Terminado> {
    const url = this.base.concat(`/${id}`)
    return this.http.get(url).pipe(
      map((respuesta: any) => {
        return respuesta.terminado as Terminado
      }),
      catchError(err => this.errFun(err))
    )
  }

  findByTerm(
    termino: string,
    paginacion: Paginacion,
    filtros: string = ''
  ): Observable<Terminado[]> {
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
        return res.terminados as Terminado[]
      }),
      catchError(err => this.errFun(err))
    )
  }

  delete(id: string): Observable<Terminado> {
    const url = this.base.concat(`/${id}`)

    return this.http.delete(url).pipe(
      map((respuesta: any) => {
        this.msjService.toastCorrecto(respuesta.mensaje)
        return respuesta.terminado as Terminado
      }),
      catchError(err => this.errFun(err))
    )
  }

  update(terminado: Terminado): Observable<Terminado> {
    let url = this.base
    return this.http.put<Terminado>(url, terminado).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mensaje)
        return resp.terminado as Terminado
      }),
      catchError(err => this.errFun(err))
    )
  }

  save(terminado: Terminado): Observable<Terminado> {
    let url = this.base

    return this.http.post<Terminado>(url, terminado).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mensaje)
        return resp.terminado as Terminado
      }),
      catchError(err => this.errFun(err))
    )
  }

}
