import { Injectable } from '@angular/core';
import { PreLoaderService } from '../../components/pre-loader/pre-loader.service';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { PaginadorService } from '../../components/paginador/paginador.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


import { FamiliaDeProcesos } from '../../models/familiaDeProcesos.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service';

@Injectable({
  providedIn: 'root'
})


export class FamiliaDeProcesosService {
  
  total: number;
  base:string = `${URL_SERVICIOS}/familiaDeProcesos`;
 
  totalProcesos: any;
  totalFamilias: any;
  constructor(
    public http: HttpClient,
    public router: Router,
    private _msjService: ManejoDeMensajesService,
    public _preLoaderService: PreLoaderService,
    public _paginadorService: PaginadorService
  ) { }

  todo(desde: number = 0,limite: number = 5,  paginador:PaginadorService = null): Observable<FamiliaDeProcesos[]>{
    const a: number = this._preLoaderService.loading('Cargando familias de procesos.');
    return this.http.get( `${this.base}?limite=${limite}&desde=${desde}`  ).pipe(
      map( (resp: any) => {
        this._msjService.ok_(resp,null, a);
       
        if( paginador){
          paginador.activarPaginador(resp.total);
          paginador.totalDeElementos = resp.total;

        }else{
          this.total = resp.total;
            this._paginadorService.activarPaginador(this.total);
          }
        return resp.familiasDeProcesos;
      })
      , 
      catchError( err => {
        console.error(` Hubo un error ${err}`);
        this._msjService.err(err);
        return throwError( err);
      })
    );
    
  }

  guardar( familia: FamiliaDeProcesos ) {
    const a: number = this._preLoaderService.loading('Guardando famila de procesos.');
    return this.http.post(this.base, familia ).pipe(
      map( (resp: any) => {
        this._msjService.ok_( resp, null, a);
        return resp.familiaDeProcesos;
      }),
      catchError( err => {
        this._msjService.err(err);
        return throwError(err);
      })
    );
  }

  modficar( familia: FamiliaDeProcesos ) {
    const a: number = this._preLoaderService.loading('Modificando familia de procesos.');
    const url = `${this.base}/${familia._id}`;
    return this.http.put(url, familia).pipe(
      map( (resp: any) => {
        this._msjService.ok_(resp,null, a);
        return resp;
      }), catchError ( err => { 
        this._msjService.err(err); 
        return throwError(err); 
      })
    );
  }

}
