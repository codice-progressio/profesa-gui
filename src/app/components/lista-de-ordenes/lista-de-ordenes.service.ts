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
    private _folioService: FolioService,
    private _preLoaderService: PreLoaderService,
    private _util: UtilidadesService,
    ) {
      
      
    }
    
    controlDeProduccion(): any {
      if ( this.depto ) {
        this._preLoaderService.cargando = true;
        this.cargarOrdenes(this.depto, this.opciones);
      }
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

  obtenerTodasLasOrdenesDeEsteDepartamentoEnArray( ): Orden[] {
    let a: Orden[] = [];
    for (const x in this.ordenes) {
      if (this.ordenes.hasOwnProperty(x)) {
        const ordenes = this.ordenes[x];
        
        a = a.concat(ordenes)
        console.log('agregar');
        console.log(a);
      }
    }
   
    console.log('concatenado');
    console.log(a);
    
    return a;
  }

  obtenerTodasLasOrdenesDeEsteDepartamentoEnArrayYSoloId(): string[] {
    const ordenes:Orden []= this.obtenerTodasLasOrdenesDeEsteDepartamentoEnArray();
    const ids: string [] = [];
    ordenes.forEach((orden:Orden) => {

      ids.push(orden._id);
    });
    console.log(ids);
    
    return ids;
    
  }

}
