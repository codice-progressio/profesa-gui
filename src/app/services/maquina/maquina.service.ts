import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Maquina } from 'src/app/models/maquina.model';



@Injectable({
  providedIn: 'root'
})
export class MaquinaService {
  
  
  constructor(
    public http: HttpClient,
    public router: Router,
    private _notificacionesService: ManejoDeMensajesService
  ) { }
  
  buscarMaquinasPorDepartamento(NOMBRE_DEPTO: string): any {
    const url = URL_SERVICIOS + `/maquina`    ;
    return this.http.get( url ).pipe(
      map( ( resp: any ) => {
        return resp.maquinas;
      }), 
      catchError( err => {
        this._notificacionesService.err(err);
        return throwError(err);
      })
    );
  }

  obtenerTodasLasMaquinas( ) {
    const url = URL_SERVICIOS + `/maquina`;
    return this.http.get( url ).pipe(
      map( (resp: any ) => {
        this._notificacionesService.ok_( resp);
        return resp.maquinas;
      }), catchError( err => {
        this._notificacionesService.err( err );
        return throwError( err );
      })
    );
  }

  guardarNuevaMaquina(maquina: Maquina): any {
     const url = URL_SERVICIOS + `/maquina`;
    return this.http.post( url, maquina ).pipe(
      map( (resp: any ) => {
        this._notificacionesService.ok_( resp);
        return resp.maquina;
      }), catchError( err => {
        this._notificacionesService.err( err );
        return throwError( err );
      })
    );
  }


  modificarMaquina(maquina: Maquina): any {
    const url = URL_SERVICIOS + `/maquina`;
    return this.http.put( url, maquina ).pipe(
      map( (resp: any ) => {
        this._notificacionesService.ok_( resp);
        return resp.maquina;
      }), catchError( err => {
        this._notificacionesService.err( err );
        return throwError( err );
      })
    );
  }
}
