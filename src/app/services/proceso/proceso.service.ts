import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { FamiliaDeProcesos } from 'src/app/models/familiaDeProcesos.model';
import { Proceso } from 'src/app/models/proceso.model';


@Injectable({
  providedIn: 'root'
})
export class ProcesoService {

  constructor(
    public http: HttpClient,
    public router: Router,
    private _notificacionesService: ManejoDeMensajesService
  ) { }

  obtenerTodosLosProcesos( ) {

    // Retorna los dos tipos de procesos y la 
    //  familia de procesos. 
    const url = URL_SERVICIOS + '/proceso';
    return this.http.get( url ).pipe(
      map( (resp: any) => {
        return resp;
      })
      , 
      catchError( err => {
        this._notificacionesService.err(err);
        return throwError( err);
      })
    );
  }
  
  guardarNuevaFamiliaDeProcesos( familia: FamiliaDeProcesos ) {
    
    const url  = URL_SERVICIOS + `/proceso/familia`;
    return this.http.post(url, familia ).pipe(
      map( (resp: any) => {
        this._notificacionesService.ok_( resp );
        console.log(resp);
        
        return resp.familiaDeProcesos;
      }),
      catchError( err => {
        this._notificacionesService.err(err);
        return throwError(err);
      })
    );
  }
  modificarModeloConFamiliaDeProcesos( ) {
    return throwError( new Error('Sin implementar'));
  }

  modificarFamiliaDeProcesos( familia: FamiliaDeProcesos ) {
    const url = URL_SERVICIOS + `/proceso/familia/${familia._id}`;
    return this.http.put(url, familia).pipe(
      map( (resp: any) => {
        this._notificacionesService.ok_(resp);
        return resp;
      }), catchError ( err => { 
        this._notificacionesService.err(err); 
        return throwError(err); 
      })
    );
  }

  guardarNuevoProceso ( pro: Proceso ) {
    const url = URL_SERVICIOS + `/proceso`;
    return this.http.post( url, pro ).pipe(
      map( (resp: any) => {
        this._notificacionesService.ok_( resp);
        return resp.proceso;
      }), catchError( err => {
        this._notificacionesService.err( err );
        return throwError( err );
      })
    );
  }

  modificarProceso( pro: Proceso ) {
    const url = URL_SERVICIOS + `/proceso/${pro._id}`;
    return this.http.put(url, pro ).pipe(
      map( (resp: any) => {
        this._notificacionesService.ok_( resp);
        return resp.proceso;
      }), catchError( err => {
        this._notificacionesService.err( err );
        return throwError( err );
      })
    );

  }





}
