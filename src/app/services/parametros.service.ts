import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ManejoDeMensajesService } from './utilidades/manejo-de-mensajes.service'
import { Observable, throwError } from 'rxjs'
import { LocalizacionDeOrdenes } from '../models/parametros/localizacionDeOrdenes.parametros.model'
import { URL_BASE } from '../config/config'
import { map, catchError } from 'rxjs/operators'
import { Proceso } from '../models/proceso.model'
import { Departamento } from '../models/departamento.models'
import { Usuario } from '../models/usuario.model'

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {
  base = URL_BASE('parametros')
  constructor(
    public httpClient: HttpClient,
    public msjService: ManejoDeMensajesService
  ) {}

  findAllLocalizacionDeOrdenes(): Observable<LocalizacionDeOrdenes> {
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

  saveLocalizacionDeOrdenes(l: LocalizacionDeOrdenes) {
    let url = this.base.concat('/localizacionDeOrdenes')

    return this.httpClient
      .put(url, {
        procesosIniciales: l.procesosIniciales.map(x => x._id),
        procesosInicialesAlmacen: l.procesosInicialesAlmacen.map(x => x._id),
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

  findAllProcesosEspeciales(): Observable<Proceso[]> {
    let url = this.base.concat('/procesosEspeciales')
    return this.httpClient.get(url).pipe(
      map(resp => {
        return resp as Proceso[]
      }),
      catchError(err => {
        this.msjService.toastError(err)
        return throwError(err)
      })
    )
  }

  saveProcesosEspeciales(procesos: string[]): Observable<null> {
    let url = this.base.concat('/procesosEspeciales')
    return this.httpClient.put<Proceso[]>(url, procesos).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto('Se modificaron los procesos especiales')
        return null
      }),
      catchError(err => {
        this.msjService.toastError(err)
        return throwError(err)
      })
    )
  }

  actualizarPermisos() {
    let url = this.base.concat('/configurar-super-admin/permisos/reiniciar')
    return this.httpClient.put(url, {}).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mensaje)
        return null
      }),
      catchError(err => {
        this.msjService.toastError(err)
        return throwError(err)
      })
    )
  }

  findDepartamentoTransformacion(): Observable<Departamento> {
    let url = this.base.concat('/departamentoTransformacion')

    return this.httpClient.get<Departamento>(url).pipe(
      map((resp: any) => {
        return resp as Departamento
      }),
      catchError(err => {
        this.msjService.toastError(err)
        return throwError(err)
      })
    )
  }

  saveDepartamentoTransformarcion(id: string): Observable<null> {
    let url = this.base.concat('/departamentoTransformacion')
    return this.httpClient.put(url, { id }).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(resp.mesaje)
        return null
      }),
      catchError(err => {
        this.msjService.toastError(err)
        return throwError(err)
      })
    )
  }

  findAllEstacionesDeEscaneo(): Observable<ScannerDepartamentoGestion[]> {
    let url = this.base.concat('/estacionesDeEscaneo')
    return this.httpClient.get(url).pipe(
      map((resp: any) => resp as ScannerDepartamentoGestion[]),
      catchError(err => {
        this.msjService.toastError(err)
        return throwError(err)
      })
    )
  }

  saveEstacionesDeEscaneo(
    estaciones: ScannerDepartamentoGestion[]
  ): Observable<null> {
    let url = this.base.concat('/estacionesDeEscaneo')

    return this.httpClient.put(url, estaciones ).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto(
          'Se modificaron las estaciones de escaneo'
        )
        return null
      }),
      catchError(err => {
        this.msjService.toastError(err)
        return throwError(err)
      })
    )
  }
}

export interface ScannerDepartamentoGestion {
  departamento: Departamento
  usuarios: Usuario[]
}
