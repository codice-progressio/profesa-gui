import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Maquina } from 'src/app/models/maquina.model';
import { CRUD } from '../crud';

import { PaginadorService } from 'src/app/components/paginador/paginador.service';
import { UtilidadesService } from '../utilidades/utilidades.service';
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service';
import { UsuarioService } from '../usuario/usuario.service';



@Injectable({
  providedIn: 'root'
})
export class MaquinaService extends CRUD <Maquina> {
  
  
  constructor(
    public http: HttpClient,
    public _msjService: ManejoDeMensajesService,
    public _utiliadesService: UtilidadesService,
    public _preLoaderService: PreLoaderService,
    public _paginadorService: PaginadorService,
    public _usuarioService: UsuarioService
  ) { 

    super(http, _msjService, _utiliadesService, _preLoaderService, _paginadorService);
    this.base =  URL_SERVICIOS + `/maquina`;
    this.nombreDeDatos.plural = 'maquinas';
    this.nombreDeDatos.singular = 'maquina';
    this.urlBusqueda = '/buscar';
  }
  
  buscarMaquinasPorDepartamento(id: string): any {
    let a = this._preLoaderService.loading('Buscando maquinas para este departamento')
    const url = URL_SERVICIOS + `/maquina/departamento/${id}`;
    return this.http.get( url ).pipe(
      map( ( resp: any ) => {
        this._msjService.ok_(resp, null, a)
        let ordenadoPorNombre = <Maquina[]>  resp.maquinas

        ordenadoPorNombre = ordenadoPorNombre.sort((a, b)=>{
          return a.nombre < b.nombre ? 1 : -1
        } )
        return ordenadoPorNombre;
      }), 
      catchError( err => {
        this._msjService.err(err);
        return throwError(err);
      })
    );
  }

}
