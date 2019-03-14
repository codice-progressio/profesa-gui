import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ManejoDeMensajesService, UtilidadesService, PreLoaderService } from '../service.index';
import { URL_SERVICIOS } from 'src/app/config/config';
import { ReporteTransformacionDetalle } from 'src/app/models/reportes/trasnformacion/ReporteTransformacionDetalle';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { ReporteTransformacionSimplificado } from 'src/app/models/reportes/trasnformacion/ReporteTransformacionSimplificado';
import { ReporteQuimica } from 'src/app/models/reportes/quimica/reporteQuimica';

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
  transformacionDetalle(msjLoading:string=`Cargando reporte de transformacion detalle.` , ): Observable<ReporteTransformacionDetalle>{
    let url = `${URL_SERVICIOS}/${this.urlReportes}/transformacion`
    // const a: number = this._preLoaderService.loading(msjLoading);

    return this.http.get(url).pipe(
      map( (resp:any)=>{
        let r = new ReporteTransformacionDetalle()
        r.objetoContenedorDePasos = resp['objetoContenedorDePasos'];
        r.agrupar()
        // this._msjService.ok_( resp, null, a)
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
  transformacionSimplificado(msjLoading:string=`Cargando reporte de transformacion simplificado.` , ): Observable<ReporteTransformacionSimplificado>{
    let url = `${URL_SERVICIOS}/${this.urlReportes}/transformacion`

    // const a: number = this._preLoaderService.loading(msjLoading);

    return this.http.get(url).pipe(
      map( (resp:any)=>{
        let r = new ReporteTransformacionSimplificado()
        r.objetoContenedorDePasos = resp['objetoContenedorDePasos'];
        r.agrupar()
        // this._msjService.ok_( resp, null, a)
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
   *Retorna un objeto tipo ReporteQuimica dentro del observable con los datos acomodados 
   del reporte. 
   *
   * @returns {*}
   * @memberof ReportesProduccionService
   */
  quimica(msjLoading:string=`Cargando reporte de quimica.` ,): Observable<ReporteQuimica> {
    
    let url = `${URL_SERVICIOS}/${this.urlReportes}/quimica`

    return this. http.get( url ).pipe( 
      map((resp: any)=>{
        let reporte: ReporteQuimica = new ReporteQuimica(  )
        reporte.disponibles = resp.disponibles
        reporte.pendientes = resp.pendientes
        reporte.trabajando = resp.trabajando
        reporte.agruparPorPedido()
        return reporte
      } ),
      catchError( (err)=>{
        console.log( err )
        this._msjService.err(err)
        return throwError( err )
      } )
    )


  }








}
