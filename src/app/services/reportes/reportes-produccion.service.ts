import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from 'src/app/config/config';
import { ReporteTransformacionDetalle } from 'src/app/models/reportes/trasnformacion/ReporteTransformacionDetalle';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { ReporteTransformacionSimplificado } from 'src/app/models/reportes/trasnformacion/ReporteTransformacionSimplificado';
import { ReporteQuimica } from 'src/app/models/reportes/quimica/reporteQuimica';
import { ReporteLaser } from 'src/app/models/reportes/laser/reporteLaser';
import { Folio } from 'src/app/models/folio.models';
import { FolioLinea } from 'src/app/models/folioLinea.models';
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service';
import { UtilidadesService } from '../utilidades/utilidades.service';
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service';

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

  /**
   *Retorna un objeto de tipo reporteLaser dentro del observable con los datos acomodados del reporte. 
   *
   * @returns {*}
   * @memberof ReportesProduccionService
   */
  laser(): Observable<ReporteLaser> {
    let url = `${URL_SERVICIOS}/${this.urlReportes}/laser`

    return this. http.get( url ).pipe( 
      map((resp: any)=>{
        let reporte: ReporteLaser = new ReporteLaser(  )
        reporte.disponibles = resp.disponibles 
        reporte.departamentosPendientes = resp.departamentosPendientes
        reporte.porSurtir = resp.porSurtir
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

  /**
   *Retorna la consulta de folios con los parametros de filtro que se le pasen.  
   *0
   * @returns {*}
   * @memberof ReportesProduccionService
   */
  historialPedidos( filtros: string ): Observable<Folio[]> {
    let url = `${URL_SERVICIOS}/${this.urlReportes}/historial/pedidos?foliosTerminados=1&${filtros}`
    const a: number = this._preLoaderService.loading('Cargando pedidos desde el historial');

    return this. http.get( url ).pipe( 
      map((resp: any)=>{
        
        this._msjService.ok_( resp, null, a )
        return resp.folios
      } ),
      catchError( (err)=>{
        console.log( err )
        this._msjService.err(err)
        return throwError( err )
      } )
    )

  }







}
