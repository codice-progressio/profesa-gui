import { Injectable } from '@angular/core'
import { URL_BASE } from '../config/config'
import { ManejoDeMensajesService } from './utilidades/manejo-de-mensajes.service'
import { UtilidadesService } from './utilidades/utilidades.service'
import { PreLoaderService } from '../components/pre-loader/pre-loader.service'
import { PaginadorService } from '../components/paginador/paginador.service'
import { SubirArchivoService } from './subir-archivo/subir-archivo.service'
import { throwError } from 'rxjs'
import { Paginacion } from '../utils/paginacion.util'
import { HttpClient } from '@angular/common/http'
import { map, catchError } from 'rxjs/operators'
import { ReportePersonalizadoAlmacenProduccion } from '../models/reportePersonalizadoAlmacenProduccion/reportePersonalizadoAlmacenProduccion.model'

@Injectable({
  providedIn: 'root'
})
export class ReportesPersonalizadosAlmacenProduccionService {
  base = URL_BASE('reportePersonalizadoAlmacenProduccion')
  total: number = 0
  constructor(
    private http: HttpClient,
    private _msjService: ManejoDeMensajesService,
    private _utiliadesService: UtilidadesService,
    private _preLoaderService: PreLoaderService,
    private _paginadorService: PaginadorService
  ) {}

  errFun(err) {
    this._msjService.err(err)
    return throwError(err)
  }

  findAll(paginacion: Paginacion, filtros: string = '') {
    const a = this._preLoaderService.loading('Cargando reportes personalizados')
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
        this._msjService.ok_(respuesta, null, a)
        return respuesta.reportesPersonalizadosAlmacenProduccion.map(x =>
          Object.assign(new ReportePersonalizadoAlmacenProduccion(), x)
        )
      }),
      catchError(err => this.errFun(err))
    )
  }

  findById(id: string) {
    const a = this._preLoaderService.loading(
      'Buscando reporte personalizado por id'
    )
    const url = this.base.concat(`/${id}`)
    return this.http.get(url).pipe(
      map((respuesta: any) => {
        this._msjService.ok_(respuesta, null, a)
        return Object.assign(
          new ReportePersonalizadoAlmacenProduccion(),
          respuesta.reportePersonalizadoAlmacenProduccion
        )
      }),
      catchError(err => this.errFun(err))
    )
  }

  find(termino: string, paginacion: Paginacion, filtros: string = '') {
    const a = this._preLoaderService.loading(
      'Buscando reportes personalizados con el termino ' + termino
    )
    const url = this.base
      .concat(`/buscar/${termino}`)
      .concat('?')
      .concat(`desde=${paginacion.desde}`)
      .concat(`&limite=${paginacion.limite}`)
      .concat(`&campo=${paginacion.campoDeOrdenamiento}`)
      .concat(`&sort=${paginacion.orden}`)
      .concat(`&${filtros}`)

    return this.http.get(url).pipe(
      map((respuesta: any) => {
        this.total = respuesta.total
        this._msjService.ok_(respuesta, null, a)
        return respuesta.reportesPersonalizadosAlmacenProduccion.map(x =>
          Object.assign(new ReportePersonalizadoAlmacenProduccion(), x)
        )
      }),
      catchError(err => this.errFun(err))
    )
  }

  delete(id: string) {
    const a = this._preLoaderService.loading('Eliminando reporte personalizado')
    const url = this.base.concat(`/${id}`)

    return this.http.delete(url).pipe(
      map((respuesta: any) => {
        this._msjService.ok_(respuesta, null, a)

        return Object.assign(
          new ReportePersonalizadoAlmacenProduccion(),
          respuesta.reportePersonalizadoAlmacenProduccion
        )
      }),
      catchError(err => this.errFun(err))
    )
  }

  update(reporte: ReportePersonalizadoAlmacenProduccion) {
    const a = this._preLoaderService.loading('Eliminando reporte personalizado')
    const url = this.base

    return this.http.put(url, reporte).pipe(
      map((res: any) => {
        this._msjService.ok_(res, null, a)

        return Object.assign(
          new ReportePersonalizadoAlmacenProduccion(),
          res.reportePersonalizadoAlmacenProduccion
        )
      }),
      catchError(err => this.errFun(err))
    )
  }
  save(reporte: ReportePersonalizadoAlmacenProduccion) {
    const a = this._preLoaderService.loading('Guardando reporte personalizado')
    const url = this.base

    return this.http.post(url, reporte).pipe(
      map((res: any) => {
        this._msjService.ok_(res, null, a)

        return Object.assign(
          new ReportePersonalizadoAlmacenProduccion(),
          res.reportePersonalizadoAlmacenProduccion
        )
      }),
      catchError(err => this.errFun(err))
    )
  }
}
