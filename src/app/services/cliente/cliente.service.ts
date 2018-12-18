import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { Laser } from '../../models/laser.models';
import swal from 'sweetalert2';
import { throwError } from '../../../../node_modules/rxjs';
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service';
import { Cliente } from 'src/app/models/cliente.models';
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service';
import { Usuario } from '../../models/usuario.model';
import { ModeloCompleto } from 'src/app/models/modeloCompleto.modelo';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  findById(_id: string): any {
    const a: number = this._preLoaderService.loading('Cargando cliente.');
    const url = URL_SERVICIOS + `/cliente/id/${_id}`;
    console.log(` Estemos findById ${_id}`);
    return this.http.get(url).pipe(
      map( (resp: any) => {
        console.log(` Repuesta ${resp}`);
        this._msjService.ok_(resp,null, a);
        return resp.cliente;
      }),
      catchError (err => {
        this._msjService.err(err);
        return throwError(err);
      })
    );
  }
  

  constructor(
    public http: HttpClient,
    private _msjService: ManejoDeMensajesService,
    public _preLoaderService: PreLoaderService,
    public _usuarioService: UsuarioService
  ) { }


  buscar( termino: string ) {
    const url = URL_SERVICIOS + `/busqueda/coleccion/clientes/${termino}`;
    return this.http.get( url ).pipe( map( (resp: any) => resp.clientes)
    );
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

  obtenerTodos( ){
    const a: number = this._preLoaderService.loading('Cargando clientes.');
    const url = `${URL_SERVICIOS}/cliente`;
    return this.http.get(url).pipe(
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

  guardaNuevo( cliente: Cliente) {
    const a: number = this._preLoaderService.loading('Guardando nuevo cliente.');
    const url =`${URL_SERVICIOS}/cliente`;
    return this.http.post(url, cliente).pipe(
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
  modificar( cliente: Cliente) {
    const a: number = this._preLoaderService.loading('Guardando modificaciones a cliente.');
    
    const url =`${URL_SERVICIOS}/cliente/${cliente._id}`;
    return this.http.put(url, cliente).pipe(
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
