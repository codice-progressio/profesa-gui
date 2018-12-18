import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map, catchError } from '../../../../node_modules/rxjs/operators';

import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service';
import { throwError } from 'rxjs';
import { Departamento } from 'src/app/models/departamento.models';
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(
    public http: HttpClient,
    public _msjService: ManejoDeMensajesService,
    public _preLoaderService: PreLoaderService
  ) { }
  cargarDepartamentos( ) {
    const a: number = this._preLoaderService.loading('Cargando departamentos.');
    const url = URL_SERVICIOS + `/departamento`;
    return this.http.get(url).pipe( 
      map (( resp: any ) => {
        this._msjService.ok_(resp,null, a);
        return resp.departamentos;
      }), 
      catchError( err => {
        this._msjService.err( err );
        return throwError( err );
      })
    );
  }

  guardarUnDepartamento( depto: Departamento ) {
    const a: number = this._preLoaderService.loading('Guardando departamento.');
    
    const url = URL_SERVICIOS + `/departamento`;
    return this.http.post( url, depto ).pipe(
      map( (resp: any) => {
        this._msjService.ok_(resp,null, a);
        return resp.departamento;
      }), catchError( err => {
        this._msjService.err( err );
        return throwError( err );
      }) 
    );
  }
}
