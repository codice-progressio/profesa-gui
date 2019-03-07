import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ManejoDeMensajesService, UtilidadesService, PreLoaderService } from '../service.index';
import { URL_SERVICIOS } from 'src/app/config/config';
import { ReporteTransformacionDetalle } from 'src/app/models/reportes/trasnformacion/ReporteTransformacionDetalle';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { ReporteTransformacionSimplificado } from 'src/app/models/reportes/trasnformacion/ReporteTransformacionSimplificado';

@Injectable({
  providedIn: 'root'
})
export class ReportesProduccionService {

  constructor(
    public http: HttpClient,
    public _msjService: ManejoDeMensajesService,
    public _utiliadesService: UtilidadesService,
    public _preLoaderService: PreLoaderService,
  ) { 
    
  }

  urlReportes: string = 'reportes'


  /**
   *Retorna un objeto ReporteTransformacionDetalle dentro del observable
   con los datos acomodados del reporte para una vision detallada. 
   *
   * @returns {Observable<ReporteTransformacionDetalle>}
   * @memberof ReportesProduccionService
   */
  transformacionDetalle( ): Observable<ReporteTransformacionDetalle>{
    let url = `${URL_SERVICIOS}/${this.urlReportes}/transformacion`
    return this.http.get(url).pipe(
      map( (datos:any)=>{
        let r = new ReporteTransformacionDetalle()
        r.objetoContenedorDePasos = datos['objetoContenedorDePasos'];
        r.agrupar()
        return  r
      } ),
      catchError( (err)=>{
        console.log( err)
        this._msjService.err(err)
        return throwError( err );
      } )
    )
  }


  /**
   *Almacena el intervalo de refresco para que no se creen nuevos 
   cada vez que cambiamos de componente. 
   *
   * @memberof ReportesProduccionService
   */
  intervaloDeRefrescoReporteTransformacionSimplificado = null

  /**
   *Retorna un objeto ReporteTransformacionSimplificado dontro del observable 
   con los datos acomodados del reporte para una vision simplificada. 
   *
   * @returns {Observable<ReporteTransformacionSimplificado>}
   * @memberof ReportesProduccionService
   */
  transformacionSimplificado( ): Observable<ReporteTransformacionSimplificado>{
    let url = `${URL_SERVICIOS}/${this.urlReportes}/transformacion`
    return this.http.get(url).pipe(
      map( (datos:any)=>{
        let r = new ReporteTransformacionSimplificado()
        r.objetoContenedorDePasos = datos['objetoContenedorDePasos'];
        r.agrupar()
        return  r
      } ),
      catchError( (err)=>{
        console.log( err)
        this._msjService.err(err)
        return throwError( err );
      } )
    )
  }




}
