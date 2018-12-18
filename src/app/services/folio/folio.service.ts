import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Folio } from '../../models/folio.models';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Router } from '@angular/router';
import { FolioLinea } from '../../models/folioLinea.models';
import { Orden } from '../../models/orden.models';
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service';

@Injectable({
  providedIn: 'root'
})
export class FolioService {
 
  
  totalFolios: number = 0;
 
  
  constructor(  
    public http: HttpClient,
    public router: Router,
    private _msjService: ManejoDeMensajesService,
    private _u: UsuarioService,
    private _preLoaderService: PreLoaderService
    ) {
  }
    
    
    
  guardarFolio ( folio: Folio) {
    const a: number = this._preLoaderService.loading('Guardando folio nuevo.');
    let url =`${URL_SERVICIOS}/folio`; 
    if ( folio._id) {
      url += `/${folio._id}`;
      // Si tiene un id queiere decir que hay que modificar. 
      return this.http.put(url, folio).pipe(
        map( (resp: any) => {
          this._msjService.ok_(resp,null, a);
          return;
        }), 
        catchError( err => {
          this._msjService.err(err);
          return throwError(err);
        })
        );
      } else {
        // Si no tiene id creamos un objeto nuevo.
        return this.http.post( url, folio).pipe(
          map( (resp: any) => {
            this._msjService.ok_(resp,null, a);
            return resp.folio;
          }), catchError( err => {
            this._msjService.err(err);
            return throwError(err);
          })
        );
      }
  }
          
        
        
  cargarFolio ( id: string ) {
    const a: number = this._preLoaderService.loading('Cargando folios');
    
    // Carga todos los datos del folio y sus lineas
    const url =`${URL_SERVICIOS}/folio/${id}`;
    
    return this.http.get(url).pipe(
      map( (resp: any) => {
        this.totalFolios = resp.total;
        this._msjService.ok_(resp,null, a);
        return resp.folio;
      }), catchError( err => {
        this._msjService.err(err);
        this.router.navigate(['/folios']);
        return throwError(err);
      })
      
      );
    }
          
  cargarFolios (desde: number = 0, limite: number = 5) {
    // Es necesario siempre el signo al final para 
    // que no haya problemas con los otros parametros. 
    const a: number = this._preLoaderService.loading('Cargando folios.');
    
    const url =`${URL_SERVICIOS}/folio?`;
    return this.cargaDeFolios(url, limite, desde, a);
  }
  
  cargarFoliosConOrdenesSinTerminar( desde: number = 0, limite: number = 5) {
    const a: number = this._preLoaderService.loading('Cargando ordenes.');
    
    // Carga los folios que ya tienen órdenes generadas. 
    const url =`${URL_SERVICIOS}/folio?conOrdenes=true`;
    return this.cargaDeFolios(url, limite, desde, a);
  }

  cargarFoliosConOrdenesTerminados( desde: number = 0, limite: number = 5) {
    const a: number = this._preLoaderService.loading('Buscando folios terminados.');
    
    // Carga los folios que ya tienen órdenes generadas. 
    const url =`${URL_SERVICIOS}/folio?conOrdenes=true&terminados=true`;
    return this.cargaDeFolios(url, limite, desde, a);
  }

  
  cargarFoliosSinOrdenes(desde: number = 0, limite: number = 5) {
    const a: number = this._preLoaderService.loading('Cargando folios.');
    
    // Carga los folios de los cuales aún no se generan órdenes. 
    // Esto aunque un solo pedido no se haya genera órdenes. 
    // Los pedidos que ya se generón del folio no aparecen aqui. 
    const url =`${URL_SERVICIOS}/folio?sinOrdenes=true`;
    return this.cargaDeFolios( url, limite, desde, a);
  }
  
  cargarFolioPorPrioridad(desde: number = 0, limite: number = 5, prioridad: string) {
    
    const a: number = this._preLoaderService.loading('Cargando folios por prioridad');
    const url =`${URL_SERVICIOS}/folio?prioridad=${prioridad}&terminados=false&conOrdenes=true`;
    return this.cargaDeFolios( url, limite, desde, a);
  }
  
  private cargaDeFolios (url: string, limite: number = 5, desde: number = 0, a:number) {
    url += `&limite=${limite}`; 
    url += `&desde=${desde}`;
    
    return this.http.get( url ).pipe(
      map( (resp: any) => {
        this._msjService.ok_(resp,null, a);
        this.totalFolios = resp.total;
        return resp.folios;
      }),
      catchError ( err => {
        this._msjService.err(err);
        return throwError(err);
      })
      );
    }
    
    guardarLinea (idFolio: string, linea: FolioLinea) {
      const a: number = this._preLoaderService.loading('Guardando linea');
      // Si la linea tiene un id entonces es para modificar.
      
      if (linea._id) {
        // Modificamos.
        const url =`${URL_SERVICIOS}/folioLinea/${idFolio}/${linea._id}`;
        return this.http.put(url, linea).pipe(
          map( (resp: any) => {
            // swal('Pedido modificado.', `Se modifico el pedido correctamente.`, 'success');
            this._msjService.ok_(resp,null, a);
          return;
        }), catchError( err => {
          this._msjService.err(err);
          return throwError(err);
        })
        );
      } else {
        const url =`${URL_SERVICIOS}/folioLinea/${idFolio}`;
        return this.http.post(url, linea).pipe(
          map( (resp: any) => {
            this._msjService.ok_(resp,null, a);
            return resp.folioLinea;
          }), catchError( err => {
            this._msjService.err(err);
            
          return throwError(err);
        })
        );
      }
      
    }
    
  eliminarLinea( idFolio: string , idLinea: string ) {
    const a: number = this._preLoaderService.loading('Eliminando linea');
    const url =`${URL_SERVICIOS}/folioLinea/${idFolio}/${idLinea}`;
    return this.http.delete(url).pipe(
      map( (resp: any) => {
        this._msjService.ok_(resp,null, a);
        
        return;
      }),
      catchError( err => {
        this._msjService.err(err);
        return throwError(err);
      })
      );
    }
      
  eliminarFolio( idFolio: string) {
    const a: number = this._preLoaderService.loading('Eliminando folio.');
    const url =`${URL_SERVICIOS}/folio/${idFolio}`;
    return this.http.delete(url).pipe(
      map( (resp: any) => {
        this._msjService.ok_(resp,null, a);
        return;
      }),
      catchError( err => {
        this._msjService.err(err);
        return throwError(err);
      })
  );}
  
  guardarOrdenes( folio: Folio ) {
    const a: number = this._preLoaderService.loading('Guardando ordenes.');
    
    // QUITAMOS TODA LA BASURA.
    const limpio = this.limpiarParaOrdenes( folio );
    const url =`${URL_SERVICIOS}/orden`;
    return this.http.post( url, limpio ).pipe( 
      map( (resp) => {
        this._msjService.ok_(resp,null, a);
        
        return;
      }), catchError( err => {
        this._msjService.err(err);
        
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
  
  
  // Recive una nueva órden.
  recivirUnaOrden( id: string, depto: string, callbackError: any = null ) {
    const a: number = this._preLoaderService.loading('Reciviendo la orden.');
    
    const url =`${URL_SERVICIOS}/orden`;
    return this.http.put(url, {_id: id, departamento: depto}).pipe(
      map( (resp: any) => {
        this._msjService.ok_(resp,null, a);
        return resp;        
      }), catchError( err => {
        this._msjService.err( err, callbackError);
        return throwError(err);
      })
      );
  }
  
  // Inicia el trabajo de una órden. 
  iniciarTrabajoDeOrden(orden: Orden , depto: any , callbackError: any = null) {
    const a: number = this._preLoaderService.loading('Iniciando trabajdo de orden.');
    console.log(orden.ubicacionActual);
    
    const url = URL_SERVICIOS + `/orden?empezarATrabajar=true`;
    return this.http.put(url, 
      {
        _id: orden._id,
        departamento: depto._n, 
        deptoTrabajado: orden.ubicacionActual[depto._v.toLowerCase()],
      
      }).pipe(
        map( (resp: any) => {
        this._msjService.ok_(resp,null, a);
        return resp;        
      }), catchError( err => {
        this._msjService.err( err, callbackError);
        return throwError(err);
      })
      );
  }

  buscarOrden( id: string, depto: string, callbackError: any = null ) {
    const a: number = this._preLoaderService.loading('Buscando orden.');

    const url =`${URL_SERVICIOS}/orden/${id}/${depto}`;
    return this.http.get(url).pipe(
      map( (resp: any) => {
        // Se retorna un objeto Orden y
        // un objeto ModeloCompleto
        this._msjService.ok_(resp,null, a);
        
        return resp;        
      }), catchError( err => {
        
        this._msjService.err( err, callbackError);

        return throwError(err);
      })
    );
    
  }


  // Este dato solo lo vamos a acceder desde el servicio de lista 
  // de ordenes
  cargarOrdenesDepartamento( depto: string, opciones = {}) {
    const a: number = this._preLoaderService.loading('Cargando ordenes del departamento');
    
    const url =`${URL_SERVICIOS}/orden/${depto}`;
    return this.http.get( url ).pipe(
      map ( (resp: any)  => {
        this._msjService.ok_(resp,null, a);
        
        return resp.ordenes;
      }), catchError ( err => {
        this._msjService.err(err);
        
        return throwError( err );
      })
    );
  }

  // Guardamos los cambios de la órden. 
  modificarOrden(dato: any, idOrden: string, depto: string): any {
    const a: number = this._preLoaderService.loading('Guardando cambios de orden.');
    
    const url =`${URL_SERVICIOS}/orden/${idOrden}?depto='${depto}'`;
    return this.http.put( url, dato ).pipe(
      map( (resp: any) => {
        this._msjService.ok_(resp,null, a);
        return resp;
      }),
      catchError( err => {
        this._msjService.err(err);
        return throwError(err);
      })
    );
  }

  controlDeProduccion_RecivirYEntregar(idOrdenes: String[]): any {
   const a: number = this._preLoaderService.loading('Entregando ordenes.');
   
    const url =`${URL_SERVICIOS}/orden/controlDeProduccionRecivirYEntregar`;
   return this.http.put( url, idOrdenes ).pipe(
    map( (resp: any) => {
      this._msjService.ok_(resp,null, a);
      return resp;
    }),
    catchError( err => {
      this._msjService.err(err);
      return throwError(err);
    })
  );
  }

  ordenesImpresas(_id: string): any {
    // const a: number = this._preLoaderService.loading('Entregando ordenes.');
   
    const url =`${URL_SERVICIOS}/folio/ordenesImpresas`;
   return this.http.post( url, {_id: _id}).pipe(
    map( (resp: any) => {
      this._msjService.correcto('Se imprimio el folio.', '', 4000)
      this._msjService.ok_(resp,null);
      return resp;
    }),
    catchError( err => {
      this._msjService.err(err);
      return throwError(err);
    })
  );
  }





}
