import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Folio } from '../../models/folio.models';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Router } from '@angular/router';
import { FolioLinea } from '../../models/folioLinea.models';
import { Orden } from '../../models/orden.models';
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service';


@Injectable({
  providedIn: 'root'
})
export class FolioService {
  
  
  totalFolios: number = 0;

  constructor(  
    public http: HttpClient,
    public router: Router,
    private _notificacionesService: ManejoDeMensajesService
  ) { }



  guardarFolio ( folio: Folio) {
    let url = URL_SERVICIOS + `/folio`;
    if ( folio._id) {
      url += `/${folio._id}`;
      // Si tiene un id queiere decir que hay que modificar. 
      return this.http.put(url, folio).pipe(
        map( (resp: any) => {
          swal({
            // position: 'center',
            type: 'success',
            title: 'Folio modificado.',
            html: 'Se modifico el folio de manera exitosa.',
            showConfirmButton: false,
            timer: 1500
          });
          return;
        }), 
        catchError( err => {
          swal( 'Error con el folio',
          err.error.mensaje + '<br>'
          + err.error.errors.message
          , 'error' );
          return throwError(err);
        })
      );
    } else {
      // Si no tiene id creamos un objeto nuevo.
      return this.http.post( url, folio).pipe(
        map( (resp: any) => {
          swal({
            // position: 'center',
            type: 'success',
            title: 'Folio creado.',
            html: 'Ahora puedes agregar pedidos.',
            showConfirmButton: false,
            timer: 1500
          });
          return resp.folio;
        }), catchError( err => {
          swal( 'Error con el folio',
          err.error.mensaje + '<br>'
          + err.error.errors.message
          , 'error' );
          return throwError(err);
        })
      );
    }
  }

  
  
  cargarFolio ( id: string ) {
    // Carga todos los datos del folio y sus lineas
    const url = URL_SERVICIOS + `/folio/${id}`;
    
    return this.http.get(url).pipe(
      map( (resp: any) => {
        this.totalFolios = resp.total;
        return resp.folio;
      }), catchError( err => {
        swal( 'Error con el folio', 'Algo paso y no se pudo cargar el folio.', 'error' );
        this.router.navigate(['/folios']);
        return throwError(err);
      })
      
    );
  }
  
  cargarFolios (desde: number = 0, limite: number = 5) {
    // Es necesario siempre el signo al final para 
    // que no haya problemas con los otros parametros. 
    const url = URL_SERVICIOS + `/folio?`;
    return this.cargaDeFolios(url, limite, desde);
  }
  
  cargarFoliosConOrdenes( desde: number = 0, limite: number = 5) {
    // Carga los folios que ya tienen órdenes generadas. 
    const url = URL_SERVICIOS + `/folio/?conOrdenes=true`;
    return this.cargaDeFolios(url, limite, desde);
  }

  cargarFoliosSinOrdenes(desde: number = 0, limite: number = 5) {
    // Carga los folios de los cuales aún no se generan órdenes. 
    // Esto aunque un solo pedido no se haya genera órdenes. 
    // Los pedidos que ya se generón del folio no aparecen aqui. 
    const url = URL_SERVICIOS + `/folio/?sinOrdenes=true`;
    return this.cargaDeFolios( url, limite, desde);
  }

  cargarFolioPorPrioridad(desde: number = 0, limite: number = 5, prioridad: string) {
    const url = URL_SERVICIOS + `/folio/?prioridad=${prioridad}`;
    return this.cargaDeFolios( url, limite, desde);
  }

  private cargaDeFolios (url: string, limite: number = 5, desde: number = 0) {
    
    url += `&limite=${limite}`; 
    url += `&desde=${desde}`;

    return this.http.get( url ).pipe(
      map( (resp: any) => {
        this.totalFolios = resp.total;
        return resp.folios;
      }),
      catchError ( err => {
        swal( 'Error al cargar los folios'
        , 'Algo paso y no se pudieron cargar los folios para generar órdenes.'
        , 'error' );
        return throwError(err);
      })
    );
  }

  guardarLinea (idFolio: string, linea: FolioLinea) {

    // Si la linea tiene un id entonces es para modificar.
    let url = URL_SERVICIOS;
    if (linea._id) {
      // Modificamos.
      url += `/folioLinea/${idFolio}/${linea._id}`;
      return this.http.put(url, linea).pipe(
        map( (resp: any) => {
          swal('Pedido modificado.', `Se modifico el pedido correctamente.`, 'success');
          console.log('=>' + JSON.stringify( resp));
          return;
        }), catchError( err => {
          swal('Error al modificar el pedido.', err.error.mensaje, 'error') ;
          return throwError(err);
        })
      );
    } else {
      url += `/folioLinea/${idFolio}`;
      return this.http.post(url, linea).pipe(
        map( (resp: any) => {
          swal('Pedido agregado.', `Se agrego el nuevo pedido correctamente.`, 'success');
          return resp.folioLinea;
        }), catchError( err => {
          swal('Error al guardar el pedido.', err.error.mensaje, 'error') ;
          return throwError(err);
        })
      );
    }

  }

  eliminarLinea( idFolio: string , idLinea: string ) {
    const url = URL_SERVICIOS + `/folioLinea/${idFolio}/${idLinea}`;
    return this.http.delete(url).pipe(
      map( (resp: any) => {
        return;
      }),
      catchError( err => {
        swal('Error eliminando el pedido', err.error.mensaje, 'error');
        return throwError(err);
      })
    );
  }
  
  eliminarFolio( idFolio: string) {
    const url = URL_SERVICIOS + `/folio/${idFolio}`;
    return this.http.delete(url).pipe(
      catchError( err => {
        swal('Error eliminando el folio', err.error.mensaje, 'error');
        return throwError(err);
      })
    );
  }
  
  guardarOrdenes( folio: Folio ) {
    // QUITAMOS TODA LA BASURA.
    const limpio = this.limpiarParaOrdenes( folio );
    console.log(limpio);
    
    const url = URL_SERVICIOS + `/orden`;
    return this.http.post( url, limpio ).pipe( 
      map( () => {
        swal('Órdenes guardadas', 'Las órdenes se guardarón de manera correcta', 'success');
        return;
      }), catchError( err => {
        swal('Error guardando las órdenes.', err.error.mensaje, 'error');
        return throwError(err);
      })
    );
  }

  limpiarParaOrdenes (folio: Folio ) {
    folio.folioLineas.forEach(linea => {
      delete linea.modeloCompleto;
      delete linea.cantidad;
      delete linea.nivelDeUrgencia;
      delete linea.laserCliente;
      delete linea.almacen;
      delete linea.createdAt;
      delete linea.updatedAt;
      delete linea.eliminar;
      delete linea.ordenesGeneradas;

      linea.ordenes.forEach(orden => {
        delete orden.materiales;
        delete orden.transformacion;
        delete orden.pulido;
        delete orden.seleccion;
        delete orden.piezasFinales;
        delete orden.trayectoNormal;
        delete orden.trayectoRecorrido;
        delete orden.ubicacionActual;
        delete orden.editando;
      });
  });
  
  const limpio = {
     folioLineas: folio.folioLineas,
     idFolio: folio._id
  };
  
  folio = new Folio;
  return limpio;
  }

  buscarOrden( id: string, depto: string, callbackError: any = null ) {

    const url = URL_SERVICIOS + `/orden/${id}/${depto}`;
    return this.http.get(url).pipe(
      map( (resp: any) => {
        // Se retorna un objeto Orden y
        // un objeto ModeloCompleto
        return resp;        
      }), catchError( err => {
       

        // swal('Error buscando la órden', err.error.mensaje, 'error')
    
        // .then(() => {
          
        //   if ( callbackError ) {
        //     callbackError();
        //   }
          
        // });
        
        console.log( err );
        
        this._notificacionesService.err( err, callbackError);

        return throwError(err);
      })
    );
    
  }


  // Este dato solo lo vamos a acceder desde el servicio de lista 
  // de ordenes
  cargarOrdenesDepartamento( depto: string, opciones = {}) {
    const url = URL_SERVICIOS + `/orden/${depto}`;
    return this.http.get( url ).pipe(
      map ( (resp: any)  => {
        return resp.ordenes;
      }), catchError ( err => {
        swal('No se pudieron cargar las órdenes', err, 'error');
      
        return throwError( err );
      })
    );
  }

  // Guardamos los cambios de la órden. 
  modificarOrden(dato: any, idOrden: string, depto: string): any {
    
    const url = URL_SERVICIOS + `/orden/${idOrden}?depto='${depto}'`;
    return this.http.put( url, dato ).pipe(
      map( (resp: any) => {
        this._notificacionesService.ok_(resp);
        return resp;
      }),
      catchError( err => {
        this._notificacionesService.err(err);
        return throwError(err);
      })
    );
  }


}
