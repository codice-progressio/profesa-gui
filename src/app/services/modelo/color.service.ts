import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service'
import { UtilidadesService } from '../utilidades/utilidades.service'
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service'
import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import { URL_BASE } from '../../config/config'
import { throwError, Observable } from 'rxjs'
import { Paginacion } from 'src/app/utils/paginacion.util'
import { Color } from '../../models/color.models'
import { map, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  total: number = 0
  base = URL_BASE('color')

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

  findAll(paginacion: Paginacion, filtros: string = ''): Observable<Color[]> {
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
        return respuesta.colores as Color[]
      }),
      catchError(err => this.errFun(err))
    )
  }

  findById(id: string): Observable<Color> {
    const url = this.base.concat(`/${id}`)
    return this.http.get(url).pipe(
      map((respuesta: any) => {
        return respuesta.color as Color
      }),
      catchError(err => this.errFun(err))
    )
  }

  findByTerm(
    termino: string,
    paginacion: Paginacion,
    filtros: string = ''
  ): Observable<Color[]> {
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
        return res.colores as Color[]
      }),
      catchError(err => this.errFun(err))
    )
  }

  delete(id: string): Observable<Color> {
    const url = this.base.concat(`/${id}`)

    return this.http.delete(url).pipe(
      map((respuesta: any) => {
        this.msjService.toastCorrecto(respuesta.mensaje)
        return respuesta.color as Color
      }),
      catchError(err => this.errFun(err))
    )
  }

  update(color: Color): Observable<Color> {
    let url = this.base
    return this.http.put<Color>(url, color).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mensaje)
        return resp.color as Color
      }),
      catchError(err => this.errFun(err))
    )
  }

  save(color: Color): Observable<Color> {
    let url = this.base

    return this.http.post<Color>(url, color).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mensaje)
        return resp.color as Color
      }),
      catchError(err => this.errFun(err))
    )
  }
}
