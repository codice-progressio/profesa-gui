import { Injectable, Input } from '@angular/core';
import { Orden } from '../../models/orden.models';
import { FolioService, UtilidadesService } from '../../services/service.index';
import { PreLoaderService } from '../pre-loader/pre-loader.service';
import { DEPARTAMENTOS } from '../../config/departamentos';

/**
 * Provee los elementos necesarios para mostrar las ordenes
 * por departamento separado en prioridades. 
 *
 * @export
 * @class ListaDeOrdenesService
 */
@Injectable({
  providedIn: 'root'
})
export class ListaDeOrdenesService {
  


  // depto: string;
  /**
   * Las ordenes ordenadas por prioridad. 
   *
   * @memberof ListaDeOrdenesService
   */
  ordenes = {};
  /**
   * Los niveles de prioridad. Sirve para separar las ordenes ???
   *
   * @type {string[]}
   * @memberof ListaDeOrdenesService
   */
  niveles: string[] = [];
  /**
   * Opciones????
   *
   * @memberof ListaDeOrdenesService
   */
  opciones = {};
  /**
   * El departamento del cual se van a obtener las ordenes. 
   * Esta variable senala a un modelo. 
   *
   * @type {string}
   * @memberof ListaDeOrdenesService
   */
  depto_vm:string ='';


  
  
  constructor(
    public _folioService: FolioService,
    public _preLoaderService: PreLoaderService,
    public _util: UtilidadesService,
    ) {
      
      
    }
    
    /**
     * Extra las ordenes correspondientes a este departamento.
     *
     * @returns {*}
     * @memberof ListaDeOrdenesService
     */
    controlDeProduccion(): any {
      // if ( this.depto ) {
        const a: number = this._preLoaderService.loading(`Cargando ordenes: ${DEPARTAMENTOS.CONTROL_DE_PRODUCCION._n}`);
        this.cargarOrdenes(DEPARTAMENTOS.CONTROL_DE_PRODUCCION._n, this.opciones,a);
        this.depto_vm = DEPARTAMENTOS.CONTROL_DE_PRODUCCION._vm;
        
      // }
    }
    
    /**
     * Extra las ordenes correspondientes a este departamento.
     *
     * @returns {*}
     * @memberof ListaDeOrdenesService
     */
    materiales() {
      // if ( this.depto ) {
        const a: number = this._preLoaderService.loading(`Cargando ordenes: ${DEPARTAMENTOS.MATERIALES._n}`);
        this.cargarOrdenes(DEPARTAMENTOS.MATERIALES._n, this.opciones,a);
        this.depto_vm = DEPARTAMENTOS.MATERIALES._vm
        
      // }
    }
    
    /**
     * Extra las ordenes correspondientes a este departamento.
     *
     * @returns {*}
     * @memberof ListaDeOrdenesService
     */
    pastilla() {
      // if ( this.depto ) {
        const a: number = this._preLoaderService.loading(`Cargando ordenes: ${DEPARTAMENTOS.PASTILLA._n}`);
      this.cargarOrdenes(DEPARTAMENTOS.PASTILLA._n, this.opciones,a);
      this.depto_vm = DEPARTAMENTOS.PASTILLA._vm
      
    // }
  }

  /**
     * Extra las ordenes correspondientes a este departamento.
     *
     * @returns {*}
     * @memberof ListaDeOrdenesService
     */
  transformacion() {
      // if ( this.depto ) {
        const a: number = this._preLoaderService.loading(`Cargando ordenes: ${DEPARTAMENTOS.TRANSFORMACION._n}`);
      this.cargarOrdenes(DEPARTAMENTOS.TRANSFORMACION._n, this.opciones,a);
      this.depto_vm = DEPARTAMENTOS.TRANSFORMACION._vm
      
    // }
  }
  
  /**
     * Extra las ordenes correspondientes a este departamento.
     *
     * @returns {*}
     * @memberof ListaDeOrdenesService
     */
  pulido(): any {
    const a: number = this._preLoaderService.loading(`Cargando ordenes: ${DEPARTAMENTOS.PULIDO._n}`);
    this.cargarOrdenes(DEPARTAMENTOS.PULIDO._n, this.opciones,a);
    this.depto_vm = DEPARTAMENTOS.PULIDO._vm
    
  }
  
  /**
     * Extra las ordenes correspondientes a este departamento.
     *
     * @returns {*}
     * @memberof ListaDeOrdenesService
     */
  seleccion(): any {
    const a: number = this._preLoaderService.loading(`Cargando ordenes: ${DEPARTAMENTOS.SELECCION._n}`);
    this.cargarOrdenes(DEPARTAMENTOS.SELECCION._n, this.opciones,a);
    this.depto_vm = DEPARTAMENTOS.SELECCION._vm
  }
  
  /**
     * Extra las ordenes correspondientes a este departamento.
     *
     * @returns {*}
     * @memberof ListaDeOrdenesService
     */
  empaque(): any {
    const a: number = this._preLoaderService.loading(`Cargando ordenes: ${DEPARTAMENTOS.EMPAQUE._n}`);
    this.cargarOrdenes(DEPARTAMENTOS.EMPAQUE._n, this.opciones,a);
    this.depto_vm = DEPARTAMENTOS.EMPAQUE._vm
  }
  
  /**
     * Extra las ordenes correspondientes a este departamento.
     *
     * @returns {*}
     * @memberof ListaDeOrdenesService
     */
  metalizado(): any {
    const a: number = this._preLoaderService.loading(`Cargando ordenes: ${DEPARTAMENTOS.METALIZADO._n}`);
    this.cargarOrdenes(DEPARTAMENTOS.METALIZADO._n, this.opciones,a);
    this.depto_vm = DEPARTAMENTOS.METALIZADO._vm
  }
  /**
     * Extra las ordenes correspondientes a este departamento.
     *
     * @returns {*}
     * @memberof ListaDeOrdenesService
     */
  burato(): any {
    const a: number = this._preLoaderService.loading(`Cargando ordenes: ${DEPARTAMENTOS.BURATO._n}`);
    this.cargarOrdenes(DEPARTAMENTOS.BURATO._n, this.opciones,a);
    this.depto_vm = DEPARTAMENTOS.BURATO._vm
  }
  /**
     * Extra las ordenes correspondientes a este departamento.
     *
     * @returns {*}
     * @memberof ListaDeOrdenesService
     */
  barnizado(): any {
    const a: number = this._preLoaderService.loading(`Cargando ordenes: ${DEPARTAMENTOS.BARNIZADO._n}`);
    this.cargarOrdenes(DEPARTAMENTOS.BARNIZADO._n, this.opciones,a);
    this.depto_vm = DEPARTAMENTOS.BARNIZADO._vm
  }
  
  /**
     * Extra las ordenes correspondientes a este departamento.
     *
     * @returns {*}
     * @memberof ListaDeOrdenesService
     */
  productoTerminado(): any {
    const a: number = this._preLoaderService.loading(`Cargando ordenes: ${DEPARTAMENTOS.PRODUCTO_TERMINADO._n}`);
    this.cargarOrdenes(DEPARTAMENTOS.PRODUCTO_TERMINADO._n, this.opciones,a);
    this.depto_vm = DEPARTAMENTOS.PRODUCTO_TERMINADO._vm;
    
  }
  
  
  /**
   * Esta funcion carga las ordenes de manera genericia. Para un departamento
   * en especifico utilizar las propiad de cada uno. 
   *
   * @param {string} depto El nombre del departamento ( corresponde a la variable de defaults _n)
   * @param {*} [opciones={}] Opciones para algo????
   * @param {number} a
   * @memberof ListaDeOrdenesService
   */
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

  /**
   * Comprueba si hay ordenes cargadas. 
   *
   * @returns
   * @memberof ListaDeOrdenesService
   */
  hayOrdenes() {
    for (const x in this.ordenes) {
      if ( this.ordenes[x].length > 0 ) {
        return true;
      }
    }

    return false;
  }

  /**
   * Quita una orden de la lista. Esta funcion esta depecrated.
   * Hay que cargar todas las ordenes cada vez que se elimine una
   * para revisar si no se han agregado mas. 
   * @deprecated 
   *
   * @param {string} id
   * @memberof ListaDeOrdenesService
   */
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

  /**
   * Retorna las ordenes del departamento sin los niveles de prioridad. 
   *
   * @returns {Orden[]} Un arreglo de todas las ordenes existentes. 
   * @memberof ListaDeOrdenesService
   */
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

  /**
   *Obtiene id de las ordenes del departamento definido en un arreglo de strings. 
   *
   * @returns {string[]}
   * @memberof ListaDeOrdenesService
   */
  obtenerTodasLasOrdenesDeEsteDepartamentoEnArrayYSoloId(): string[] {
    const ordenes:Orden []= this.obtenerTodasLasOrdenesDeEsteDepartamentoEnArray();
    const ids: string [] = [];
    ordenes.forEach((orden:Orden) => {

      ids.push(orden._id);
    });
    return ids;
    
  }

}
