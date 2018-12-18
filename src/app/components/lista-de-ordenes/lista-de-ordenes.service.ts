import { Injectable, Input } from '@angular/core';
import { Orden } from '../../models/orden.models';
import { FolioService, UtilidadesService } from '../../services/service.index';
import { PreLoaderService } from '../pre-loader/pre-loader.service';
import { DEPARTAMENTOS } from '../../config/departamentos';

@Injectable({
  providedIn: 'root'
})
export class ListaDeOrdenesService {
  


  depto: string;
  ordenes = {};
  niveles: string[] = [];
  opciones = {};
  depto_vm:string ='';


  
  
  constructor(
    public _folioService: FolioService,
    public _preLoaderService: PreLoaderService,
    public _util: UtilidadesService,
    ) {
      
      
    }
    
    controlDeProduccion(): any {
      // if ( this.depto ) {
        const a: number = this._preLoaderService.loading(`Cargando ordenes: ${DEPARTAMENTOS.CONTROL_DE_PRODUCCION._n}`);
        this.cargarOrdenes(DEPARTAMENTOS.CONTROL_DE_PRODUCCION._n, this.opciones,a);
        this.depto_vm = DEPARTAMENTOS.CONTROL_DE_PRODUCCION._vm;
        
      // }
    }
    
    materiales() {
      // if ( this.depto ) {
        const a: number = this._preLoaderService.loading(`Cargando ordenes: ${DEPARTAMENTOS.MATERIALES._n}`);
        this.cargarOrdenes(DEPARTAMENTOS.MATERIALES._n, this.opciones,a);
        this.depto_vm = DEPARTAMENTOS.MATERIALES._vm
        
      // }
    }
    
    pastilla() {
      // if ( this.depto ) {
        const a: number = this._preLoaderService.loading(`Cargando ordenes: ${DEPARTAMENTOS.PASTILLA._n}`);
      this.cargarOrdenes(DEPARTAMENTOS.PASTILLA._n, this.opciones,a);
      this.depto_vm = DEPARTAMENTOS.PASTILLA._vm
      
    // }
  }
    
  transformacion() {
      // if ( this.depto ) {
        const a: number = this._preLoaderService.loading(`Cargando ordenes: ${DEPARTAMENTOS.TRANSFORMACION._n}`);
      this.cargarOrdenes(DEPARTAMENTOS.TRANSFORMACION._n, this.opciones,a);
      this.depto_vm = DEPARTAMENTOS.TRANSFORMACION._vm
      
    // }
  }

  pulido(): any {
    const a: number = this._preLoaderService.loading(`Cargando ordenes: ${DEPARTAMENTOS.PULIDO._n}`);
    this.cargarOrdenes(DEPARTAMENTOS.PULIDO._n, this.opciones,a);
    this.depto_vm = DEPARTAMENTOS.PULIDO._vm
    
  }
  
  seleccion(): any {
    const a: number = this._preLoaderService.loading(`Cargando ordenes: ${DEPARTAMENTOS.SELECCION._n}`);
    this.cargarOrdenes(DEPARTAMENTOS.SELECCION._n, this.opciones,a);
    this.depto_vm = DEPARTAMENTOS.SELECCION._vm
  }
  
  empaque(): any {
    const a: number = this._preLoaderService.loading(`Cargando ordenes: ${DEPARTAMENTOS.EMPAQUE._n}`);
    this.cargarOrdenes(DEPARTAMENTOS.EMPAQUE._n, this.opciones,a);
    this.depto_vm = DEPARTAMENTOS.EMPAQUE._vm
  }
  
  productoTerminado(): any {
    const a: number = this._preLoaderService.loading(`Cargando ordenes: ${DEPARTAMENTOS.PRODUCTO_TERMINADO._n}`);
    this.cargarOrdenes(DEPARTAMENTOS.PRODUCTO_TERMINADO._n, this.opciones,a);
    this.depto_vm = DEPARTAMENTOS.PRODUCTO_TERMINADO._vm;
    
  }
  
  
  cargarOrdenes(depto: string, opciones = {}, a:number) {
    this._folioService.cargarOrdenesDepartamento(depto, opciones)
    .subscribe( (resp: any ) => {
      this.ordenes = resp;
      if ( this.ordenes ) {
        this.niveles = Object.keys(this.ordenes);
      }
      this._preLoaderService.ok(a);
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
      }
    }
   
    
    return a;
  }

  obtenerTodasLasOrdenesDeEsteDepartamentoEnArrayYSoloId(): string[] {
    const ordenes:Orden []= this.obtenerTodasLasOrdenesDeEsteDepartamentoEnArray();
    const ids: string [] = [];
    ordenes.forEach((orden:Orden) => {

      ids.push(orden._id);
    });
    return ids;
    
  }

}
