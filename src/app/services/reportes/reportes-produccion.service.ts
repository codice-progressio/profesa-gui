import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ManejoDeMensajesService, UtilidadesService, PreLoaderService } from '../service.index';
import { URL_SERVICIOS } from 'src/app/config/config';
import { ReporteTransformacionDetalle } from 'src/app/models/reportes/trasnformacion/ReporteTransformacionDetalle';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

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


  transformacionSimplificado( ): Observable<ReporteTransformacionDetalle>{
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




}
