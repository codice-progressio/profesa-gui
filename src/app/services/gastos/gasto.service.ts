import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Gasto } from 'src/app/models/gasto.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  constructor(
    public http: HttpClient,
    private _notificacionesService: ManejoDeMensajesService
  ) { }

  cargarTodosLosGastos(  ) {
     const url = URL_SERVICIOS + `/gasto`;
     return this.http.get( url ).pipe(
      map( ( resp: any ) => {
         return resp.gastos;
      }), catchError( err => {
        this._notificacionesService.err(err);
        return throwError( err);
      }));
  }

  guardarUnGasto ( gasto: Gasto ) {
   const url = URL_SERVICIOS + `/gasto`;
   return this.http.post( url, gasto ).pipe(
    map( ( resp: any ) => {
       this._notificacionesService.ok_( resp );
       return resp.gasto;
    }), catchError( err => {
      this._notificacionesService.err(err);
      return throwError( err);
    }));
  }

  modificarUnGasto( gasto: Gasto ) {
   const url = URL_SERVICIOS + `/gasto`;
   return this.http.put( url, gasto ).pipe(
    map( ( resp: any ) => {
       this._notificacionesService.ok_( resp );
       return resp.gasto;
    }), catchError( err => {
      this._notificacionesService.err(err);
      return throwError( err);
    }));
   
  }
  eliminarUnGasto( gasto: Gasto ) {
   const url = URL_SERVICIOS + `/gasto/${gasto._id}`;
   return this.http.delete( url ).pipe(
    map( ( resp: any ) => {
       this._notificacionesService.ok_( resp );
       return resp.gasto;
    }), catchError( err => {
      this._notificacionesService.err(err);
      return throwError( err);
    }));
  }

}
