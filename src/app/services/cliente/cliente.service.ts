import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { Laser } from '../../models/laser.models';
import swal from 'sweetalert2';
import { throwError } from '../../../../node_modules/rxjs';
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service';
import { Cliente } from 'src/app/models/cliente.models';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  

  constructor(
    public http: HttpClient,
    private _msjService: ManejoDeMensajesService
  ) { }


  buscar( termino: string ) {
    const url = URL_SERVICIOS + `/busqueda/coleccion/clientes/${termino}`;
    return this.http.get( url ).pipe( map( (resp: any) => resp.clientes)
    );
  }

  guardarNuevaMarcaLaser ( id: string, marca: string) {
    const url = URL_SERVICIOS + `/cliente/laser/${id}`;

    const laser = new Laser('', marca);

    return this.http.put(url, laser).pipe(
      map( (resp: any) => {

        swal(`Cliente ${resp.cliente.nombre} modificado.`, ` Se agrego la marca laser "${marca}" .`, 'success');
        return resp.cliente;
      }),
      catchError (err => {
        swal('Error al crear marca laser', err.error.mensaje, 'error') ;
        return throwError(err);
      })
    );
  }

  obtenerTodos( ){
    const url = `${URL_SERVICIOS}/cliente`;
    return this.http.get(url).pipe(
      map((resp:any) => {
        this._msjService.ok_(resp);
        return resp.clientes;
      }),
      catchError( err => {
        this._msjService.err(err);
        return throwError (err );
      })
    );
  }

  guardaNuevo( cliente: Cliente) {
    const url =`${URL_SERVICIOS}/cliente`;
    return this.http.post(url, cliente).pipe(
      map((resp:any) => {
        this._msjService.ok_(resp);
        return resp.clientes;
      }),
      catchError( err => {
        this._msjService.err(err);
        return throwError (err );
      })
    );
  }
  modificar( cliente: Cliente) {
    const url =`${URL_SERVICIOS}/cliente/${cliente._id}`;
    return this.http.put(url, cliente).pipe(
      map((resp:any) => {
        this._msjService.ok_(resp);
        return resp.clientes;
      }),
      catchError( err => {
        this._msjService.err(err);
        return throwError (err );
      })
    );
  }

  // buscarLaserado(idLaser: string): any {
  //   const url =`${URL_SERVICIOS}/cliente/${idLaser}`;
  //   console.log(idLaser);
    
  //   return this.http.get(url).pipe(
  //     map((resp:any) => {
  //       console.log(resp);
        
  //       this._msjService.ok_(resp);
  //       return resp.marcaLaser;
  //     }),
  //     catchError( err => {
  //       this._msjService.err(err);
  //       return throwError (err );
  //     })
  //   );
  // }


}
