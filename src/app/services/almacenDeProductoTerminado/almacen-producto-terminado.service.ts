import { Injectable } from '@angular/core'
import { CRUD } from '../crud'
import { ModeloCompleto } from 'src/app/models/modeloCompleto.modelo'
import { HttpClient } from '@angular/common/http'
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service'
import { UtilidadesService } from '../utilidades/utilidades.service'
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service'
import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import { URL_SERVICIOS } from 'src/app/config/config'
import { Observable, throwError } from 'rxjs'
import { FiltrosModelosCompletos } from '../utilidades/filtrosParaConsultas/FiltrosModelosCompletos'
import { catchError, map } from 'rxjs/operators'
import { URL_BASE } from '../../config/config'
import { Paginacion } from '../../utils/paginacion.util'

@Injectable({
  providedIn: 'root'
})
export class AlmacenProductoTerminadoService {
  base: string = `${URL_SERVICIOS}/modeloCompleto`
  total: number

  constructor(
    public msjService: ManejoDeMensajesService,
    public httpClient: HttpClient
  ) {}

  errFun(err) {
    this.msjService.err(err)
    return throwError(err)
  }

  findAll(
    paginacion: Paginacion,
    filtros: string = ''
  ): Observable<ModeloCompleto[]> {
    const url = this.base
      .concat('?')
      .concat(`desde=${paginacion.desde}`)
      .concat(`&limite=${paginacion.limite}`)
      .concat(`&campo=${paginacion.campoDeOrdenamiento}`)
      .concat(`&sort=${paginacion.orden}`)
      .concat(`&${filtros}`)

    return this.httpClient.get(url).pipe(
      map((respuesta: any) => {
        this.total = respuesta.total
        return respuesta.modelosCompletos as ModeloCompleto[]
      }),
      catchError(err => this.errFun(err))
    )
  }

  findByTerm(
    termino: string,
    paginacion: Paginacion,
    filtros: string = ''
  ): Observable<ModeloCompleto[]> {
    const url = this.base
      .concat(`/buscar/${termino}`)
      .concat('?')
      .concat(`&desde=${paginacion.desde}`)
      .concat(`&limite=${paginacion.limite}`)
      .concat(`&campo=${paginacion.campoDeOrdenamiento}`)
      .concat(`&sort=${paginacion.orden}`)
      .concat(`&${filtros}`)

    return this.httpClient.get(url).pipe(
      map((res: any) => {
        this.total = res.total
        return res.modelosCompletos as ModeloCompleto[]
      }),
      catchError(err => this.errFun(err))
    )
  }

  consolidar(id: string): Observable<ModeloCompleto> {
    const url = URL_BASE('almacenDeProductoTerminado').concat(
      `/consolidar/${id}`
    )
    return this.httpClient.get<ModeloCompleto>(url).pipe(
      map((res: any) => {
        this.msjService.toastCorrecto(res.msj)
        return new ModeloCompleto().deserialize(res.modeloCompleto)
      }),
      catchError(err => this.errFun(err))
    )
  }
}
