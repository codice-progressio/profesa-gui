import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators'
import { throwError, Observable } from 'rxjs'
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service'
import { UtilidadesService } from '../utilidades/utilidades.service'
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service'
import { URL_BASE } from '../../config/config'
import { ReporteFaltantesProductoTerminado } from 'src/app/models/reportes/productoTerminado/reporte.faltantes.productoTerminado'

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
}
