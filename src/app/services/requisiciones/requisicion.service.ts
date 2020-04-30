import { Injectable } from '@angular/core'
import { Requisicion } from '../../models/requisiciones/requisicion.model'
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service'
import { UtilidadesService } from '../utilidades/utilidades.service'
import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import { URL_BASE } from 'src/app/config/config'
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { Paginacion } from 'src/app/utils/paginacion.util'
import { EstatusRequisicion } from '../../models/requisiciones/estatusRequisicion.model'

@Injectable({
  providedIn: 'root'
})
export class RequisicionService {
  total: number = 0
  base = URL_BASE('requisicion')

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
  ): Observable<Requisicion[]> {
    const url = this.base
      .concat('?')
      .concat(`desde=${paginacion.desde}`)
      .concat(`&limite=${paginacion.limite}`)
      .concat(`&campo=${paginacion.campoDeOrdenamiento}`)
      .concat(`&sort=${paginacion.orden}`)
      .concat(`&${filtros}`)

    return this.http.get(url).pipe(
      map((respuesta: any) => {
        console.log(`respuesta`, respuesta)
        this.total = respuesta.total
        return respuesta.requisiciones as Requisicion[]
      }),
      catchError(err => this.errFun(err))
    )
  }

  findById(id: string): Observable<Requisicion> {
    const url = this.base.concat(`/buscar/id/${id}`)
    return this.http.get(url).pipe(
      map((respuesta: any) => {
        return respuesta.requisicion as Requisicion
      }),
      catchError(err => this.errFun(err))
    )
  }

  findByTerm(
    termino: string,
    paginacion: Paginacion,
    filtros: string = ''
  ): Observable<Requisicion[]> {
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
        return res.requisiciones as Requisicion[]
      }),
      catchError(err => this.errFun(err))
    )
  }

  delete(id: string): Observable<Requisicion> {
    const url = this.base.concat(`/${id}`)

    return this.http.delete(url).pipe(
      map((respuesta: any) => {
        this.msjService.toastCorrecto(respuesta.mensaje)
        return respuesta.requisicion as Requisicion
      }),
      catchError(err => this.errFun(err))
    )
  }

  update(requisicion: Requisicion): Observable<Requisicion> {
    let url = this.base
    return this.http.put<Requisicion>(url, requisicion).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mensaje)
        return resp.requisicion as Requisicion
      }),
      catchError(err => this.errFun(err))
    )
  }

  save(requisicion: Requisicion): Observable<Requisicion> {
    let url = this.base

    return this.http.post<Requisicion>(url, requisicion).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mensaje)
        return resp.requisicion as Requisicion
      }),
      catchError(err => this.errFun(err))
    )
  }

  actualizarEstatus(requisicion: Requisicion): Observable<Requisicion> {
    let url = `${this.base}/estatus/actualizar/${requisicion._id}`

    return this.http.put(url, requisicion).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mensaje)

        return new Requisicion().deserialize(resp.requisicion)
      }),
      catchError(err => this.errFun(err))
    )
  }

  estatusActual(estatus: EstatusRequisicion): { msj: string; fa: string } {
    let objeto: { msj: string; fa: string } = { msj: '', fa: '' }

    if (estatus.esRequisicion) {
      objeto.msj = 'En espera de compra'
      objeto.fa = 'fa-cart-plus text-warning'
    }
    if (estatus.esOrdenDeCompra) {
      objeto.msj = 'En proceso'
      objeto.fa = 'fa-shipping-fast text-info '
    }
    if (estatus.esEntregaParcial) {
      objeto.msj = 'Entregas parciales'
      objeto.fa = 'fa-star-half text-dark'
    }
    if (estatus.esTerminada) {
      objeto.msj = 'Requisicion terminada'
      objeto.fa = 'fa-check-circle text-success'
    }
    if (estatus.esCancelada) {
      objeto.msj = 'Requisicion cancelada'
      objeto.fa = 'fa-times-circle text-danger'
    }

    return objeto
  }

  /**
   *Reinicia el estatus para que se vaya creando el historial y no 
   se dupliquen estatus. No altera las imagenes. 
   *
   */
  reiniciar(e: EstatusRequisicion) {
    e.esOrdenDeCompra = false
    e.esRequisicion = false
    e.esEntregaParcial = false
    e.esEntregaParcial = false
    e.esCancelada = false
    e.esTerminada = false
  }
}
