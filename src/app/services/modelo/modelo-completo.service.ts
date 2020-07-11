import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { URL_SERVICIOS, URL_BASE } from '../../config/config'
import { map, catchError } from 'rxjs/operators'
import { throwError, Observable } from 'rxjs'
import { ModeloCompleto } from '../../models/modeloCompleto.modelo'
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service'
import { UtilidadesService } from '../utilidades/utilidades.service'
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service'
import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import { Paginacion } from 'src/app/utils/paginacion.util'

@Injectable({
  providedIn: 'root'
})
export class ModeloCompletoService {
  total: number = 0
  base = URL_BASE('modeloCompleto')

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
  ): Observable<ModeloCompletoLigero[]> {
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
        return respuesta.modelosCompletos as ModeloCompletoLigero[]
      }),
      catchError(err => this.errFun(err))
    )
  }

  findById(id: string): Observable<ModeloCompleto> {
    const url = this.base.concat(`/buscar/id/${id}`)
    return this.http.get(url).pipe(
      map((respuesta: any) => {
        return respuesta.modeloCompleto as ModeloCompleto
      }),
      catchError(err => this.errFun(err))
    )
  }

  findByTerm(
    termino: string,
    paginacion: Paginacion,
    filtros: string = ''
  ): Observable<ModeloCompletoLigero[]> {
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
        return res.modelosCompletos as ModeloCompletoLigero[]
      }),
      catchError(err => this.errFun(err))
    )
  }

  delete(id: string): Observable<ModeloCompleto> {
    const url = this.base.concat(`/${id}`)

    return this.http.delete(url).pipe(
      map((respuesta: any) => {
        this.msjService.toastCorrecto(respuesta.mensaje)
        return respuesta.modeloCompleto as ModeloCompleto
      }),
      catchError(err => this.errFun(err))
    )
  }

  update(modeloCompleto: ModeloCompleto): Observable<ModeloCompleto> {
    let url = this.base
    return this.http.put<ModeloCompleto>(url, modeloCompleto).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mensaje)
        return resp.modeloCompleto as ModeloCompleto
      }),
      catchError(err => this.errFun(err))
    )
  }

  save(modeloCompleto: ModeloCompleto): Observable<ModeloCompleto> {
    let url = this.base

    return this.http.post<ModeloCompleto>(url, modeloCompleto).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mensaje)
        return resp.modeloCompleto as ModeloCompleto
      }),
      catchError(err => this.errFun(err))
    )
  }

  /**
   *Obtiene el total del modelo completo en transito.
   *
   * @param {string} id El id del modeloCompleto del que se quiere obtener la informacion.
   * @returns {Observable< number >} El observable con los datos.
   * @memberof ModeloCompletoService
   */
  obtenerProduccionEnTransito(id: string): Observable<number> {
    return this.http.get(`${this.base}/transito/${id}`).pipe(
      map((resp: any) => {
        return <number>resp.total
      }),
      catchError(err => this.errFun(err))
    )
  }

  modificarStock(mc: ModeloCompleto): Observable<ModeloCompleto> {
    // solo mandamos el stock.

    let m = {
      _id: mc._id,
      stockMinimo: mc.stockMinimo,
      stockMaximo: mc.stockMaximo
    }

    return this.http.post(`${this.base}/stock`, m).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mensaje)
        let mod = new ModeloCompleto()
        mod._servicio = this

        return mod.deserialize(resp.modeloCompleto)
      }),
      catchError(err => this.errFun(err))
    )
  }

  /**
   *Obtiene la cantidad de lotes que tienen existencia > 0
   *
   * @returns {number} El numero de lotes con existencia > 0
   * @memberof ModeloCompleto
   */
  obtenerLotesConExistencia(mc: ModeloCompleto): number {
    if (!mc.lotes) return 0
    let contador = 0
    mc.lotes.forEach(lote => {
      if (lote.existencia > 0) contador++
    })

    return contador
  }

  todoParaExcel() {
    let url = this.base.concat('/todoParaExcel')
    return this.http.get<any[]>(url).pipe(catchError(_ => this.errFun(_)))
  }
}

export interface ModeloCompletoLigero {
  _id: string
  nombreCompleto: string
  existencia: number
  stockMaximo: number
  stockMinimo: number
  familiaDeProcesos: string
  medias: boolean
}
