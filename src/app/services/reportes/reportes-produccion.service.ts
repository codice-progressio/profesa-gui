import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ManejoDeMensajesService, UtilidadesService, PreLoaderService } from '../service.index';
import { URL_SERVICIOS } from 'src/app/config/config';
import { get } from 'http';
import { ReporteTransformacion } from 'src/app/models/reportes/trasnformacion/trasformacion';
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


  transformacion( ): Observable<ReporteTransformacion>{
    let url = `${URL_SERVICIOS}/${this.urlReportes}/transformacion`
    return this.http.get(url).pipe(
      map( (datos:any)=>{
        return datos['objetoContenedorDePasos']
      } ),
      catchError( (err)=>{
        this._msjService.err(err)
        return throwError( err );
      } )
    )
  }




}
