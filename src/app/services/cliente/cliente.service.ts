import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { Laser } from '../../models/laser.models';
import swal from 'sweetalert2';
import { throwError } from '../../../../node_modules/rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    public http: HttpClient
  ) { }


  buscarCliente( termino: string ) {
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


}
