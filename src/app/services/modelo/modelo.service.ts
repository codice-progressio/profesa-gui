import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError, zip } from '../../../../node_modules/rxjs/operators';
import { throwError, Observable } from 'rxjs';
import swal from 'sweetalert2';
import { ModeloCompleto } from '../../models/modeloCompleto.modelo';
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service';
import { UtilidadesService } from '../utilidades/utilidades.service';
import { ModelosComponent } from '../../pages/modelos/modelos.component';
import { Modelo } from 'src/app/models/modelo.models';
import { Tamano } from 'src/app/models/tamano.models';
import { Color } from 'src/app/models/color.models';
import { Terminado } from 'src/app/models/terminado.models';
import { Laser } from 'src/app/models/laser.models';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {

  
  total: number;
  constructor(
    public http: HttpClient,
    public _msjService: ManejoDeMensajesService,
    public _utiliadesService: UtilidadesService
  ) { }

  
  guardar( mod: any ) {
    const url = URL_SERVICIOS + `/modeloCompleto`;
    return this.http.post(url, mod).pipe(
      map( (resp: any) => {
        this._msjService.ok_( resp );
        return resp.modeloCompleto;
      }), catchError(err => {
        this._msjService.err( err );
        return throwError(err);
      })
    );
  } 

  buscarModeloCompleto( termino: string ) {
    const url = URL_SERVICIOS + `/busqueda/coleccion/modelosCompletos/${termino}`;
    return this.http.get(url).pipe(
      map(
        (resp: any ) => {
          this._msjService.ok_( resp );
          return resp.modelosCompletos;
        }
      ), catchError( err => {
        this._msjService.err( err );
        return throwError( err );
      })
    );
  }

  cagarModelosCompletos(desde: number = 0, limite: number = 5 ) {
    // Siempre con el signo de interrogación para las concatenaciones posteriores. 
    const url = URL_SERVICIOS + `/modeloCompleto?`;
    return this.cargaDeModelosCompletos( url, limite, desde);
  }


  private cargaDeModelosCompletos (url: string, limite: number = 5, desde: number = 0) {
    url += `&limite=${limite}`; 
    url += `&desde=${desde}`;
   return this.http.get( url ).pipe(
      map( (resp: any)  => {
        this.total = resp.total;
        return resp.modelosCompletos;
      }), 
      catchError( err => {
        this._msjService.err( err );
        return throwError(err);
      })
      );
      
  }

  // Obtiene todos los datos con costos. 
  cargarModelosCompletosParaCostos( ) {
    const url = URL_SERVICIOS + `/modeloCompleto/costos`;
    return this.http.get(url).pipe(
      map(
        (resp: any ) => {
          this._msjService.ok_( resp );
          return resp.modelosCompletos;
        }
      ), catchError( err => {
        this._msjService.err( err );
        return throwError( err );
      })
    );
  }


  cargarModelos () {
    const url = URL_SERVICIOS + `/modelo`;
    return this.http.get(url).pipe(
      map(
        (resp: any ) => {
          this._msjService.ok_( resp );
          return resp.modelos;
        }
      ), catchError( err => {
        this._msjService.err( err );
        return throwError( err );
      })
    );
  }

  cargarTamanos () {
    const url = URL_SERVICIOS + `/tamano`;
    return this.http.get(url).pipe(
      map(
        (resp: any ) => {
          this._msjService.ok_( resp );
          return resp.tamanos;
        }
      ), catchError( err => {
        this._msjService.err( err );
        return throwError( err );
      })
    );
  }

  cargarColores () {
    const url = URL_SERVICIOS + `/color`;
    return this.http.get(url).pipe(
      map(
        (resp: any ) => {
          this._msjService.ok_( resp );
          return resp.colores;
        }
      ), catchError( err => {
        this._msjService.err( err );
        return throwError( err );
      })
    );
  }
  
  cargarTerminados () {
    const url = URL_SERVICIOS + `/terminado`;
    return this.http.get(url).pipe(
      map(
        (resp: any ) => {
          this._msjService.ok_( resp );
          return resp.terminados;
        }
      ), catchError( err => {
        this._msjService.err( err );
        return throwError( err );
      })
    );
  }


  modificarModelo( m: Modelo) {
    const url = URL_SERVICIOS + `/modelo`;
    return this.http.put(url, m).pipe(
      map(
        (resp: any ) => {
          this._msjService.ok_( resp );
          return resp.modelo;
        }
      ), catchError( err => {
        this._msjService.err( err );
        return throwError( err );
      })
    );
  }

  modificarTamano( m: Tamano) {
    const url = URL_SERVICIOS + `/tamano`;
    return this.http.put(url, m).pipe(
      map(
        (resp: any ) => {
          this._msjService.ok_( resp );
          return resp.tamano;
        }
      ), catchError( err => {
        this._msjService.err( err );
        return throwError( err );
      })
    );
  }
  modificarColor( m: Color) {
    const url = URL_SERVICIOS + `/color`;
    return this.http.put(url, m).pipe(
      map(
        (resp: any ) => {
          this._msjService.ok_( resp );
          return resp.color;
        }
      ), catchError( err => {
        this._msjService.err( err );
        return throwError( err );
      })
    );
  }
  modificarTerminado( m: Terminado) {
    const url = URL_SERVICIOS + `/terminado`;
    return this.http.put(url, m).pipe(
      map(
        (resp: any ) => {
          this._msjService.ok_( resp );
          return resp.terminado;
        }
      ), catchError( err => {
        this._msjService.err( err );
        return throwError( err );
      })
    );
  }


  

  eliminarModeloCompleto(mc: ModeloCompleto): any {
    const url = URL_SERVICIOS + `/modeloCompleto/${mc._id}`;
    return this.http.delete(url).pipe(
      map(
        (resp: any ) => {
          this._msjService.ok_( resp );
          return resp.modeloCompleto;
        }
      ), catchError( err => {
        this._msjService.err( err );
        return throwError( err );
      })
    );
  }

  



  
}
