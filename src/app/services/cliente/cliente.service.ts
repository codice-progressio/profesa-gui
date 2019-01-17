import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { Laser } from '../../models/laser.models';
import { throwError } from '../../../../node_modules/rxjs';
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service';
import { Cliente } from 'src/app/models/cliente.models';
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service';
import { ModeloCompleto } from 'src/app/models/modeloCompleto.modelo';
import { CRUD } from '../crud';

import { PaginadorService } from 'src/app/components/paginador/paginador.service';
import { UtilidadesService } from '../utilidades/utilidades.service';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class ClienteService extends CRUD<Cliente>{
  
  constructor(
    public http: HttpClient,
    public _msjService: ManejoDeMensajesService,
    public _utiliadesService: UtilidadesService,
    public _preLoaderService: PreLoaderService,
    public _paginadorService: PaginadorService,
    public _usuarioService: UsuarioService
  ) {
    super(http, _msjService, _utiliadesService, _preLoaderService, _paginadorService);
    this.base =  URL_SERVICIOS + `/cliente`;
    this.nombreDeDatos.plural = 'clientes';
    this.nombreDeDatos.singular = 'cliente';
    this.urlBusqueda = '/buscar';
  }

  guardarNuevaMarcaLaser ( id: string, marca: string) {
    const a: number = this._preLoaderService.loading('Guardando marca laser.');
    
    const url = URL_SERVICIOS + `/cliente/laser/${id}`;

    const laser = new Laser('', marca);

    return this.http.put(url, laser).pipe(
      map( (resp: any) => {

        this._msjService.ok_(resp,null, a);
        return resp.cliente;
      }),
      catchError (err => {
        console.log('Capturando error.');
        
        this._msjService.err(err);
        return throwError(err);
      })
    );
  }

  solicitarAutorizacionDeModeloCompleto( cliente:Cliente,mc: ModeloCompleto ){
    const a: number = this._preLoaderService.loading('Guardando solicitud de modelo completo.');
    const datos = {
      modeloCompleto: mc._id,
      usuarioQueSolicitaAutorizacion: this._usuarioService.usuario._id
    };
    const url =`${URL_SERVICIOS}/cliente/solicitarAutorizacion/modeloCompleto/${cliente._id}`;
    return this.http.put(url, datos).pipe(
      map((resp:any) => {
        this._msjService.ok_(resp,null, a);
        return resp.clientes;
      }),
      catchError( err => {
        this._msjService.err(err);
        return throwError (err );
      })
    );
  }

 
}
