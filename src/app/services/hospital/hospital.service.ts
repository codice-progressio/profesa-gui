import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { map } from 'rxjs/operators';
import { Hospital } from '../../models/hospital.model';
import swal from 'sweetalert2';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;

  constructor(
    // Para que este funcione hay que hacer un "imports"
    // en service.module.ts
    public http: HttpClient,
    public _subirArchivosService: SubirArchivoService,
    public _usuarioService: UsuarioService
  ) { }

  // Carga los hospitales para mostrarlos.
  cargarHospitales(desde: number = 0) {
    const url = URL_SERVICIOS + `/hospital?desde=${desde}`;
    return this.http.get(url).pipe(
      map( (resp: any) => {
        this.totalHospitales = resp.total;
        return resp.hospitales;
      })
    );
  }

  obtenerHospital( id: string) {
    const url = URL_SERVICIOS + `/hospital/${id}`;

    return this.http.get( url ).pipe(
        map( (resp: any) => resp.hospital)
      );

  }

  borrarHospital( id: string ) {
    const url = URL_SERVICIOS + `/hospital/${id}?token=${this._usuarioService.token}`;
    return this.http.delete(url).pipe(
      map( (resp: any) => resp.hospitales)
    );
  }

  // Realiza la busqueda de un hospital.
  buscarHospital( termino: string ) {
    const url = URL_SERVICIOS + `/busqueda/coleccion/hospitales/${termino}`;

    return this.http.get( url ).pipe( map( (resp: any) => resp.hospitales)
    );
  }

  // Modifica un hospital.
  actualizarHospital( hospital: Hospital) {
    const url = URL_SERVICIOS + `/hospital/${hospital._id}?token=${this._usuarioService.token}`;
    // console.log( hospital );
    return this.http.put( url, hospital ).pipe(
      map((resp: any) => {
        swal({
          // position: 'center',
          type: 'success',
          title: 'Hospital actualizado',
          html: resp.hospital.nombre,
          showConfirmButton: false,
          timer: 1500
        });
      })
    );

  }

  crearHospital ( dato: string ) {

    const url = URL_SERVICIOS + `/hospital?token=${this._usuarioService.token}`;
    const hospital: Hospital = {nombre: dato, usuario: JSON.parse(localStorage.getItem('usuario'))};

    return this.http.post(url, hospital).pipe(
      map( (resp: any ) => {
        swal({
          // position: 'center',
          type: 'success',
          title: 'Hospital guardado.',
          html: resp.hospital.nombre,
          showConfirmButton: false,
          timer: 1500
        });
      })
    );
  }



}
