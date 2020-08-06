import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators'
import { throwError, Observable } from 'rxjs'
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service'
import { UtilidadesService } from '../utilidades/utilidades.service'
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service'
import { URL_BASE } from '../../config/config'
import { ReporteFaltantesProductoTerminado } from 'src/app/models/reportes/productoTerminado/reporte.faltantes.productoTerminado'
import { ReporteFaltantesAlmacenProduccion } from '../../models/reportes/almacenProduccion/reporte.faltantes.almacenProduccion'
import { ReportePersonalizadoAlmacenProduccion } from '../../models/reportePersonalizadoAlmacenProduccion/reportePersonalizadoAlmacenProduccion.model'
import { Articulo } from '../../models/almacenDeMateriaPrimaYHerramientas/articulo.modelo'

@Injectable({
  providedIn: 'root'
})
export class ReportesProduccionService {
  constructor(
    public http: HttpClient,
    public _msjService: ManejoDeMensajesService,
    public _utiliadesService: UtilidadesService,
    public _preLoaderService: PreLoaderService
  ) {}

  urlReportes: string = 'reportes'
  base = URL_BASE('reportes')
  private error(err) {
    this._msjService.err(err)
    return throwError(err)
  }

  productoTerminadoFaltante(): Observable<ReporteFaltantesProductoTerminado[]> {
    const a = this._preLoaderService.loading('Generando reporte de faltantes')
    const url = URL_BASE('reportes/productoTerminado/faltantes')

    return this.http.get(url).pipe(
      map((datos: any) => {
        this._msjService.ok_(datos, null, a)

        return datos.reporte.map(x =>
          Object.assign(new ReporteFaltantesProductoTerminado(), x)
        )
      }),
      catchError(err => this.error(err))
    )
  }

  almacenProduccionFaltante(): Observable<ReporteFaltantesAlmacenProduccion[]> {
    const a = this._preLoaderService.loading('Generando reporte de faltantes')
    const url = URL_BASE('reportes/almacenDeProduccion/faltantes')

    return this.http.get(url).pipe(
      map((datos: any) => {
        this._msjService.ok_(datos, null, a)

        return datos.reporte.map(x =>
          Object.assign(new ReporteFaltantesAlmacenProduccion(), x)
        )
      }),
      catchError(err => this.error(err))
    )
  }

  almacenProduccionPersonalizado(id: string): Observable<Articulo[]> {
    const a = this._preLoaderService.loading('Generando reporte personalizado')
    const url = URL_BASE(`reportes/almacenDeProduccion/personalizado/${id}`)

    return this.http.get(url).pipe(
      map((datos: any) => {
        this._msjService.ok_(datos, null, a)

        return datos.reportes.map(x => Object.assign(new Articulo(), x))
      }),
      catchError(err => this.error(err))
    )
  }

  tiemposDeProceso(limiteInferior: Date, limiteSuperior: Date) {
    let url = this.base
      .concat('/controlDeProduccion/tiempoDeProcesosPorOrden')
      .concat(`?`)
      .concat(`inferior=${limiteInferior}`)
      .concat(`&superior=${limiteSuperior}`)

      console.log()

    return this.http.get<any[]>(url).pipe(catchError(err => this.error(err)))
  }
}
