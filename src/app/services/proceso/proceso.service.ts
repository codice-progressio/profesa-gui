import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service';
import { Proceso } from 'src/app/models/proceso.model';
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service';
import { PaginadorService } from 'src/app/components/paginador/paginador.service';
import { CRUD } from '../crud';
import { UtilidadesService } from '../utilidades/utilidades.service';


@Injectable({
  providedIn: 'root'
})
export class ProcesoService extends CRUD<Proceso>{
  total:number = 0;


  constructor(
    public http: HttpClient,
    public _msjService: ManejoDeMensajesService,
    public _utiliadesService: UtilidadesService,
    public _preLoaderService: PreLoaderService,
    public _paginadorService: PaginadorService
  
  ) {
    super(http, _msjService, _utiliadesService, _preLoaderService, _paginadorService);
    this.base =  URL_SERVICIOS + `/proceso`;
    this.nombreDeDatos.plural = 'procesos';
    this.nombreDeDatos.singular = 'proceso';
   }

  // todo(
  //   desde: number = 0, 
  //   limite:number = 20, 
  //   paginador:PaginadorService = null,
  //    ):Observable<Proceso[]> {
  //   const a: number = this._preLoaderService.loading('Cargando procesos y familias');
   
    
  //   // Retorna los dos tipos de procesos y la 
  //   //  familia de procesos. 
  //   const url = URL_SERVICIOS + `/proceso?limite=${limite}&desde=${desde}`;
  //   return this.http.get( url ).pipe(
  //     map( (resp: any) => {
  //       this._msjService.ok_(resp,null, a);
  //       if (paginador) {
  //         paginador.activarPaginador(resp.total);
  //         paginador.totalDeElementos = resp.total
  //       } else {
  //         this.total = resp.total;
  //         this._paginadorService.activarPaginador(this.total);
  //       }
  //       return resp.procesos;
  //     })
  //     , 
  //     catchError( err => {
  //       console.error(` Hubo un error ${err}`);
  //       this._msjService.err(err);
  //       return throwError( err);
  //     })
  //   );
  // }
  
  //  guardar ( pro: Proceso ) {
  //   const a: number = this._preLoaderService.loading('Guardando nuevo proceso.');
  //   const url = URL_SERVICIOS + `/proceso`;
  //   return this.http.post( url, pro ).pipe(
  //     map( (resp: any) => {
  //       this._msjService.ok_( resp, null,  a);
  //       console.log(` Se recive la respuesta de nuevo proceso ${resp}`);
  //       return resp.proceso;
  //     }), catchError( err => {
  //       this._msjService.err( err );
  //       return throwError( err );
  //     })
  //   );
  // }

  // modificar( pro: Proceso ) {
  //   const a: number = this._preLoaderService.loading('Modificando proceso.');
  //   const url = URL_SERVICIOS + `/proceso/${pro._id}`;
  //   return this.http.put(url, pro ).pipe(
  //     map( (resp: any) => {
  //       this._msjService.ok_( resp, null, a);
  //       return resp.proceso;
  //     }), catchError( err => {
  //       this._msjService.err( err );
  //       return throwError( err );
  //     })
  //   );

  // }





}
