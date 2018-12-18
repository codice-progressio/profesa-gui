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
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {

  
  total: number;
  constructor(
    public http: HttpClient,
    public _msjService: ManejoDeMensajesService,
    public _utiliadesService: UtilidadesService,
    public _preLoaderService: PreLoaderService
  ) { }

  
  guardar( mod: any ) {
    const a: number = this._preLoaderService.loading('Guardando modelo.');
    
    const url = URL_SERVICIOS + `/modeloCompleto`;
    return this.http.post(url, mod).pipe(
      map( (resp: any) => {
        this._msjService.ok_( resp , null, a );
        return resp.modeloCompleto;
      }), catchError(err => {
        this._msjService.err( err );
        return throwError(err);
      })
    );
  } 

  buscarModeloCompleto( termino: string, desde:number=0, limite:number=0 ) {
    // NO REQUIERE PRELOADER.
    
    const url = URL_SERVICIOS + `/modeloCompleto/buscar/${termino}?desde=${desde}&limite=${limite}`;
    return this.http.get(url).pipe(
      map(
        (resp: any ) => {
          this.total = resp.total;
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
    const a: number = this._preLoaderService.loading('Cargando modelos.');
    
    // Siempre con el signo de interrogación para las concatenaciones posteriores. 
    const url = URL_SERVICIOS + `/modeloCompleto?`;
    return this.cargaDeModelosCompletos( url, limite, desde, a);
  }


  private cargaDeModelosCompletos (url: string, limite: number = 5, desde: number = 0, a: number ) {
    url += `&limite=${limite}`; 
    url += `&desde=${desde}`;
   return this.http.get( url ).pipe(
      map( (resp: any)  => {
        this.total = resp.total;
        this._msjService.ok_(resp);
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
    const a: number = this._preLoaderService.loading('Cargando modelos con sus costos.');
    
    const url = URL_SERVICIOS + `/modeloCompleto/costos`;
    return this.http.get(url).pipe(
      map(
        (resp: any ) => {
          this._msjService.ok_( resp , null , a );
          return resp.modelosCompletos;
        }
      ), catchError( err => {
        this._msjService.err( err );
        return throwError( err );
      })
    );
  }


  cargarModelos () {
  const a: number = this._preLoaderService.loading('Cargando modelos.');
  
    const url = URL_SERVICIOS + `/modelo`;
    return this.http.get(url).pipe(
      map(
        (resp: any ) => {
          this._msjService.ok_( resp , null, a );
          return resp.modelos;
        }
      ), catchError( err => {
        this._msjService.err( err );
        return throwError( err );
      })
    );
  }

  cargarTamanos () {
    const a: number = this._preLoaderService.loading('Cargando tamanos.');
    
    const url = URL_SERVICIOS + `/tamano`;
    return this.http.get(url).pipe(
      map(
        (resp: any ) => {
          this._msjService.ok_( resp , null, a );
          return resp.tamanos;
        }
      ), catchError( err => {
        this._msjService.err( err );
        return throwError( err );
      })
    );
  }

  cargarColores () {
    const a: number = this._preLoaderService.loading('Cargando colores.');
    
    const url = URL_SERVICIOS + `/color`;
    return this.http.get(url).pipe(
      map(
        (resp: any ) => {
          this._msjService.ok_( resp , null, a );
          return resp.colores;
        }
      ), catchError( err => {
        this._msjService.err( err );
        return throwError( err );
      })
    );
  }
  
  cargarTerminados () {
    const a: number = this._preLoaderService.loading('Cargando terminados.');
    
    const url = URL_SERVICIOS + `/terminado`;
    return this.http.get(url).pipe(
      map(
        (resp: any ) => {
          this._msjService.ok_( resp , null, a );
          return resp.terminados;
        }
      ), catchError( err => {
        this._msjService.err( err );
        return throwError( err );
      })
    );
  }


  modificarModelo( m: Modelo) {
    const a: number = this._preLoaderService.loading('Guardando cambios a modelo.');
    
    const url = URL_SERVICIOS + `/modelo`;
    return this.http.put(url, m).pipe(
      map(
        (resp: any ) => {
          this._msjService.ok_( resp , null, a );
          return resp.modelo;
        }
      ), catchError( err => {
        this._msjService.err( err );
        return throwError( err );
      })
    );
  }

  modificarTamano( m: Tamano) {
    const a: number = this._preLoaderService.loading('Guardando cambios a tamano.');
    
    const url = URL_SERVICIOS + `/tamano`;
    return this.http.put(url, m).pipe(
      map(
        (resp: any ) => {
          this._msjService.ok_( resp , null, a );
          return resp.tamano;
        }
      ), catchError( err => {
        this._msjService.err( err );
        return throwError( err );
      })
    );
  }
  modificarColor( m: Color) {
    const a: number = this._preLoaderService.loading('Guardando cambios a color.');
    
    const url = URL_SERVICIOS + `/color`;
    return this.http.put(url, m).pipe(
      map(
        (resp: any ) => {
          this._msjService.ok_( resp , null, a );
          return resp.color;
        }
      ), catchError( err => {
        this._msjService.err( err );
        return throwError( err );
      })
    );
  }
  modificarTerminado( m: Terminado) {
    const a: number = this._preLoaderService.loading('Guardando cambios a terminado.');
    
    const url = URL_SERVICIOS + `/terminado`;
    return this.http.put(url, m).pipe(
      map(
        (resp: any ) => {
          this._msjService.ok_( resp , null, a );
          return resp.terminado;
        }
      ), catchError( err => {
        this._msjService.err( err );
        return throwError( err );
      })
    );
  }


  

  eliminarModeloCompleto(mc: ModeloCompleto): any {
    const a: number = this._preLoaderService.loading('Eliminado el modelo.');
    
    const url = URL_SERVICIOS + `/modeloCompleto/${mc._id}`;
    return this.http.delete(url).pipe(
      map(
        (resp: any ) => {
          this._msjService.ok_( resp , null, a );
          return resp.modeloCompleto;
        }
      ), catchError( err => {
        this._msjService.err( err );
        return throwError( err );
      })
    );
  }

  



  
}
