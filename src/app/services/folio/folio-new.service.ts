import { Injectable } from '@angular/core';
import { CRUD } from '../crud';
import { Folio } from 'src/app/models/folio.models';
import { PaginadorService } from 'src/app/components/paginador/paginador.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service';
import { UtilidadesService } from '../utilidades/utilidades.service';
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { FiltrosFolio } from '../utilidades/filtrosParaConsultas/FiltrosFolio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FolioNewService extends CRUD<Folio, FolioNewService, FiltrosFolio<FolioNewService> >{
  
  

  constructor(
    public http: HttpClient,
    public _msjService: ManejoDeMensajesService,
    public _utiliadesService: UtilidadesService,
    public _preLoaderService: PreLoaderService,
    public _paginadorService: PaginadorService,
    public _usuarioService: UsuarioService
  ) { 

    super(http, _msjService, _utiliadesService, _preLoaderService, _paginadorService);

    this.base =  URL_SERVICIOS + `/folios`;
    this.nombreDeDatos.plural = 'folios';
    this.nombreDeDatos.singular = 'folio';
    this.urlBusqueda = '/buscar';
  }

  
  /**
   *Carga los elementos filtrados bajo los parametros de filtros. 
   *
   * @param {boolean} [foliosTerminados=false] Bandera que define si se cargan los folios terminados. 
   * @param {{[string:string]:string}} filtros El objeto que contenga la relacion parametro:valor como filtros aplicables. 
   * 
   * @returns {*}
   * @memberof FolioNewService
   */
  todoPorVendedor(  ): Observable<Folio[]> {
      
    return this.getAll(undefined, undefined, this.filtrosDelFolio.obtenerFiltros() )

  }


  

}