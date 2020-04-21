import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ManejoDeMensajesService } from './utilidades/manejo-de-mensajes.service'
import { Observable, throwError } from 'rxjs'
import { LocalizacionDeOrdenes } from '../models/parametros/localizacionDeOrdenes.parametros.model'
import { URL_BASE } from '../config/config'
import { map, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {
  base = URL_BASE('parametros')
  constructor(
    public httpClient: HttpClient,
    public msjService: ManejoDeMensajesService
  ) {}

  localizacionDeOrdenes(): Observable<LocalizacionDeOrdenes> {
    let url = this.base.concat('/localizacionDeOrdenes')

    return this.httpClient.get<LocalizacionDeOrdenes>(url).pipe(
      map(resp => {
        return resp
      }),
      catchError(err => {
        this.msjService.toastError(err)

        return throwError(err)
      })
    )
  }

  localizacionDeOrdenesSave(l: LocalizacionDeOrdenes) {
    let url = this.base.concat('/localizacionDeOrdenes')

    return this.httpClient
      .put(url, {
        procesosIniciales: l.procesosIniciales.map(x => x._id),
        procesosFinales: l.procesosFinales.map(x => x._id)
      })
      .pipe(
        map(resp => {
          this.msjService.toastCorrecto('Se guardaron los cambios')
          return resp
        }),
        catchError(err => {
          this.msjService.toastError(err)
          return throwError(err)
        })
      )
  }
}
