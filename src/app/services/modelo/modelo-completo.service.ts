import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ModeloCompleto } from '../../models/modeloCompleto.modelo';
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service';
import { UtilidadesService } from '../utilidades/utilidades.service';
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service';
import { PaginadorService } from 'src/app/components/paginador/paginador.service';
import { CRUD } from '../crud';

@Injectable({
  providedIn: 'root'
})
export class ModeloCompletoService extends CRUD<ModeloCompleto>{

  // base: string = `${URL_SERVICIOS}/modeloCompleto`;
  // total: number;
  constructor(
    public http: HttpClient,
    public _msjService: ManejoDeMensajesService,
    public _utiliadesService: UtilidadesService,
    public _preLoaderService: PreLoaderService,
    public _paginadorService: PaginadorService
  ) {
    super(http, _msjService, _utiliadesService, _preLoaderService, _paginadorService);
    this.base =  URL_SERVICIOS + `/modeloCompleto`;
    this.nombreDeDatos.plural = 'modelosCompletos';
    this.nombreDeDatos.singular = 'modeloCompleto';
    this.urlBusqueda = '/buscar';

  }
  
  // guardar( mod: any ) {
  //   const a: number = this._preLoaderService.loading('Guardando modelo.');
    
  //   return this.http.post(this.base, mod).pipe(
  //     map( (resp: any) => {
  //       this._msjService.ok_( resp , null, a );
  //       this.total = resp.total;
  //       console.log(` Total  ${this.total}`);
  //       this._paginadorService.total = this.total;
  //       return resp.modeloCompleto;
  //     }), catchError(err => {
  //       this._msjService.err( err );
  //       return throwError(err);
  //     })
  //   );
  // } 

  // buscar( termino: string, desde:number=0, limite:number=0 ) {
  //   const url = `${this.base}/buscar/${termino}?desde=${desde}&limite=${limite}`;
  //   return this.http.get(url).pipe(
  //     map(
  //       (resp: any ) => {
  //         this.total = resp.total;
  //         this._msjService.ok_( resp );
  //         return resp.modelosCompletos;
  //       }
  //     ), catchError( err => {
  //       this._msjService.err( err );
  //       return throwError( err );
  //     })
  //   );
  // }

  // todos(desde: number = 0, limite: number = 5, paginador: PaginadorService = null) {
  //   const a: number = this._preLoaderService.loading('Cargando modelos.');
    
  //   // Siempre con el signo de interrogación para las concatenaciones posteriores. 
  //   const url = `${this.base}?`;
  //   return this.cargaDeModelosCompletos( url, limite, desde, paginador, a);
  // }


  // private cargaDeModelosCompletos (url: string, limite: number = 5, desde: number = 0, paginador: PaginadorService = null, a:number ) {
  //   url += `&limite=${limite}`; 
  //   url += `&desde=${desde}`;
  //  return this.http.get( url ).pipe(
  //     map( (resp: any)  => {
  //       if( paginador ){
  //         paginador.activarPaginador( resp.total );
  //       }else{
  //         this.total = resp.total;
  //         this._paginadorService.activarPaginador(this.total);
  //       }
  //       this._msjService.ok_(resp, null, a);
  //       return resp.modelosCompletos;
  //     }), 
  //     catchError( err => {
  //       this._msjService.err( err );
  //       return throwError(err);
  //     })
  //     );
      
  // }

  // // Obtiene todos los datos con costos. 
  // todo(paginador: PaginadorService  ) {

  //   return this.todo(paginador);


  //   // const a: number = this._preLoaderService.loading('Cargando modelos con sus costos.');
  //   // const url = `${this.base}/costos?&limite=${limite}&desde=${desde}`;
   
  //   // return this.http.get(url).pipe(
  //   //   map(
  //   //     (resp: any ) => {
  //   //       this._msjService.ok_( resp , null , a );
  //   //       if( paginador ){
  //   //         paginador.activarPaginador(resp.total)
  //   //       }else{
  //   //         this.total = resp.total;
  //   //         this._paginadorService.activarPaginador(this.total)
  //   //       }
  //   //       return resp.modelosCompletos;
  //   //     }
  //   //   ), catchError( err => {
  //   //     this._msjService.err( err );
  //   //     return throwError( err );
  //   //   })
  //   // );
  // }

  // eliminar(mc: ModeloCompleto): any {
  //   const a: number = this._preLoaderService.loading('Eliminado el modelo.');
    
  //   const url = `${this.base}/${mc._id}`;
  //   return this.http.delete(url).pipe(
  //     map(
  //       (resp: any ) => {
  //         this._msjService.ok_( resp , null, a );
  //         return resp.modeloCompleto;
  //       }
  //     ), catchError( err => {
  //       this._msjService.err( err );
  //       return throwError( err );
  //     })
  //   );
  // }

}
