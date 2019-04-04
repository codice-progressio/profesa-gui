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
export class ProcesoService extends CRUD<Proceso, undefined, undefined>{
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
    this.urlBusqueda ='/buscar';

  
   }

}
