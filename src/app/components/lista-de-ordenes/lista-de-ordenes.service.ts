import { Injectable, Input } from '@angular/core';
import { Orden } from '../../models/orden.models';
import { FolioService, UtilidadesService } from '../../services/service.index';
import { PreLoaderService } from '../pre-loader/pre-loader.service';

@Injectable({
  providedIn: 'root'
})
export class ListaDeOrdenesService {
  
  depto: string;
  ordenes = {};
  niveles: string[] = [];
  opciones = {};
  
  
  constructor(
    public _folioService: FolioService,
    public _preLoaderService: PreLoaderService,
    public _util: UtilidadesService,
  ) {

    
  }
  
  materiales() {
    if ( this.depto ) {
      this._preLoaderService.cargando = true;
      this.cargarOrdenes(this.depto, this.opciones);
    }
  }

  pastilla() {
    if ( this.depto ) {
      this._preLoaderService.cargando = true;
      this.cargarOrdenes(this.depto, this.opciones);
    }
  }
  
  
  
  cargarOrdenes(depto: string, opciones = {}) {
    this._folioService.cargarOrdenesDepartamento(depto, opciones)
    .subscribe( (resp: any ) => {
      this.ordenes = resp;
      console.log(this.ordenes);
      
      if ( this.ordenes ) {
        this.niveles = Object.keys(this.ordenes);

      }
      this._preLoaderService.cargando = false;
    });
  }

  hayOrdenes() {
    for (const x in this.ordenes) {
      if ( this.ordenes[x].length > 0 ) {
        return true;
      }
    }

    return false;
  }

  remover( id: string ) {
    // Removemos la órden que acabamos de eliminar. 
    
    // tslint:disable-next-line:forin
    for ( const x in this.ordenes ) {
      const a = this.ordenes[x];
      this.ordenes[x] = this.ordenes[x].filter( orden => {
        if ( orden._id !== id) {
          return true;
        }
      });
    }
  }
}
