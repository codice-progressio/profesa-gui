import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map, catchError } from '../../../../node_modules/rxjs/operators';

import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service';
import { throwError } from 'rxjs';
import { Departamento } from 'src/app/models/departamento.models';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(
    public http: HttpClient,
    private _manejoDeMensajesService: ManejoDeMensajesService
  ) { }
  
  cargarDepartamentos( ) {
    const url = URL_SERVICIOS + `/departamento`;
    return this.http.get(url).pipe( 
      map (( resp: any ) => {
        return resp.departamentos;
      }), 
      catchError( err => {
        this._manejoDeMensajesService.err( err );
        return throwError( err );
      })
    );
  }

  guardarUnDepartamento( depto: Departamento ) {
    const url = URL_SERVICIOS + `/departamento`;
    return this.http.post( url, depto ).pipe(
      map( (resp: any) => {
        return resp.departamento;
      }), catchError( err => {
        this._manejoDeMensajesService.err( err );
        return throwError( err );
      }) 
    );
  }
}
