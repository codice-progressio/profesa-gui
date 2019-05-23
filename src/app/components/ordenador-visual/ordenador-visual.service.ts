import { Injectable } from '@angular/core';
import { ModeloCompleto } from 'src/app/models/modeloCompleto.modelo';
import { Procesos } from "src/app/models/procesos.model";
import { Proceso } from 'src/app/models/proceso.model';
import { FolioLinea } from 'src/app/models/folioLinea.models';
import { ProcesoService } from 'src/app/services/proceso/proceso.service';
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service';
import { ModeloCompletoService } from '../../services/modelo/modelo-completo.service';
import { FamiliaDeProcesosService } from 'src/app/services/proceso/familia-de-procesos.service';
import { PaginadorService } from '../paginador/paginador.service';


/**
 * Esta clase deberia tener el nombre de OrdenadorVisualDeProcesos.
 * 
 * Organiza las familias de procesos en objectos y dentro de este en
 * objetos para poder reordenar nuevos proceos con drangAndDrop.
 * Para inicializar esta clase es necesario primero setear el modeloCompleto
 * con una familia de procesos y procesos independientes y despues llamar
 * generar().
 * 
 * Ejemplo.
 * 
 *    this._ordenadorVisualService.modeloCompleto = this.folioLinea.modeloCompleto;
      this._ordenadorVisualService.generar(); `
 *
 * @export
 * @class OrdenadorVisualService
 */
@Injectable({
  providedIn: 'root'
})
export class OrdenadorVisualService {

  /**
   *Cuando esta en true esconde los procesos que estan senalados como 
   requiereProduccion = true;
   *
   * @type {boolean}
   * @memberof OrdenadorVisualService
   */
  soloParaProductoTerminado: boolean = false;

  
  /**
   * Genera el componente. 
   *
   * @type {boolean}
   * @memberof OrdenadorVisualService
   */
  generarComponente: boolean = false;

  /**
   * El modelo completo de donde se extraera la informacion. 
   *
   * @type {ModeloCompleto}
   * @memberof OrdenadorVisualService
   */
  modeloCompleto: ModeloCompleto;

  /**
   * Almacena la información de los procesos para reoganizar y asignar el
   * orden conforme al proceso que sigue. Este arreglo tiene esta estructura. 
   *     [
   *       ID del proceso (TODO: Definir por que asi?)
   *       5bce49092cb2a81894899c5b: {arreglo: Array(0), proc: {…}},
   *       5bce49092cb2a81894899c5c: {arreglo: Array(1), proc: {…}},
   *       5bd22a38b37775377c0776e1: {arreglo: Array(0), proc: {…}},
   *       5bd22a38b37775377c0776e2: {arreglo: Array(0), proc: {…}},
   *     ]
   * En arreglo:Array() se almacena los Procesos para el órde y proc se utiza para 
   * almacenar los datos que el ordenador-visual va utilizar para generar las areas de dnd.
   *
   * @type {*}
   * @memberof OrdenadorVisualService
   */
  arreglosDrop: any = {};

  /**
   * Son los procesos propios de la familia y el modelo completo. 
   *
   * @type {Proceso[]}
   * @memberof OrdenadorVisualService
   */
  procesosNormales: Proceso[];
  

  constructor(
    public _procesosService: ProcesoService,
    public _modeloService: ModeloCompletoService,
    public _msjService: ManejoDeMensajesService, 
    public _familiaDeProcesosSerivce: FamiliaDeProcesosService,
    public _paginadorService: PaginadorService
    
  ) { 
    this._paginadorService.callback = ()=>{
      this.cargarProcesos();
    }
  }

  /**
   * Obtiene los procesos de la BD. 
   *
   * @memberof OrdenadorVisualService
   */
  cargarProcesos( ) {
    this._procesosService.todo().subscribe(procesos => {
      // this.familiaDeProcesos = resp.familiaDeProcesos;  
      // this.procesosEspeciales = resp.procesosEspeciales;
      this.procesosNormales = procesos;
    });
  }

  /**
   *Reordena los procesos segun el arreglo donde fueron acomodados. 
   *
   * @memberof OrdenadorVisualService
   */
  reordenarProcesos( ) {
  for (const x in this.arreglosDrop) {
    if (this.arreglosDrop.hasOwnProperty(x)) {
      const element = this.arreglosDrop[x];
      for (let i = 0; i < element.arreglo.length; i++) {
        const pro = element.arreglo[i];
        pro.orden = (( i + 1) / 10) + element.proc.orden ;
      }
    }
  }
  }

   /**
    * Una vez seteado this.modeloCompleto genera 
    * los espacios para el d&d.
    *
    * @memberof OrdenadorVisualService
    */
   generar( ) {
     this.cargarProcesos();
    // Creamos arreglos según la cantidad de procesos que existen para las zonas.
    // Cargamos la familia de procesos. 
    for (let i = 0; i < this.modeloCompleto.familiaDeProcesos.procesos.length; i++) {
      const proc = this.modeloCompleto.familiaDeProcesos.procesos[i]._id;
      const arreglo: Procesos[] = [];
      this.arreglosDrop[proc] = {
        arreglo: arreglo,
        proc:  this.modeloCompleto.familiaDeProcesos.procesos[i]
      };
    }

    // Cargamos y ordenamos los procesos especiales. 
    this.modeloCompleto.procesosEspeciales.forEach( proc => {
      this.ordenarProcesosConSusPadres(proc, false);
    });

    this.generarComponente = true;
  }

  /**
   * Anade un proceso al primer objecto que se genero. 
   *
   * @param {Proceso} proceso El proceso que se quiere anadir. 
   * @returns null
   * @memberof OrdenadorVisualService
   */
  agregarProceso( proceso: Proceso ) {

    for (const x in this.arreglosDrop) {
      if (this.arreglosDrop.hasOwnProperty(x)) {
        const element = this.arreglosDrop[x];
        
        const proc = new Procesos();
        proc.proceso = proceso;
        proc.orden = '0';
        proc.dragEnable = true;
        element.arreglo.push( proc );
        this.reordenarProcesos();
        this._msjService.correcto('Se agrego un proceso temporal a este pedido.');
        return;
      }
    }
  }

  /**
   * Elimina un proceso del arreglo que se le pase como parametro.
   *
   * @param {*} arreglo El arreglo del que se va eliminar.  
   * @param {number} index El indice del elemento que se quiere eliminar. 
   * @memberof OrdenadorVisualService
   */
  eliminarProceso( arreglo: any, index: number ) {
    // Eliminamos el proceso. 
    arreglo.splice(index, 1);
    // Reordenamos lo que quede. 
    this.reordenarProcesos();
  }

  /**
   *
   * Obtiene solo los Procesos y no el Proceso.
   * La diferencia esta en que Procesos es un objecto que 
   * contiene un proceso y el orden, mientras que proceso
   * es un objeto que no ordenamos y contiene toda la informacion
   * de ingenieria. 
   * 
   *
   * @returns {Procesos[]}
   * @memberof OrdenadorVisualService
   */
  obtenerProcesos( ): Procesos[] {
    this.reordenarProcesos();
    const proc: Procesos[] = [];
    for (const b in this.arreglosDrop) {
      if (this.arreglosDrop.hasOwnProperty(b)) {
        const a = this.arreglosDrop[b];
          // Obtiene solo los procesos que se modifica. 
          a.arreglo.forEach(x => {
            if ( x.dragEnable ) { proc.push(x); } 
          });
        
      }
    }
    
    return proc;
  }

  /**
   * Limpia los datos del ordenador.
   *
   * @memberof OrdenadorVisualService
   */
  limpiar( ) {
    this.arreglosDrop = {};
    this.modeloCompleto = null;
    this.procesosNormales = null;
    // this.procesosEspeciales = null;
    this.generarComponente = false;
  }

  cargarParaModifcarLinea(fl: FolioLinea): any {
    // Buscamos el modelo completo. 
    this.cargarProcesos();
    this.modeloCompleto = fl.modeloCompleto;
    this.generar();

  //   // Acomodamos cada proceso especial que
  //   // tiene el folio linea dentro de su correspondiente
  //   // arreglo. 
  //   for (const b in this.arreglosDrop) {
  //     if (this.arreglosDrop.hasOwnProperty(b)) {
  //       const a = this.arreglosDrop[b];
  //       fl.procesos.forEach(proc => {
  //       });
        
  //     }
  //   }

    fl.procesos.forEach((proc:Procesos) => {
      this.ordenarProcesosConSusPadres(proc);
    });

  }

  /**
   * Busca el padre de cada procesos segun el numero que le corresponde al Procesos.orden.
   * El valor que se toma en cuenta es el entero y el decimal lo convierte en hijo. 
   *
   * @private
   * @param {Procesos} proc El Procesos que contiene el orden.  
   * @param {boolean} [dragEnable=true] En caso de que queramos que no se pueda arrastrar. 
   * @memberof OrdenadorVisualService
   */
  private ordenarProcesosConSusPadres(proc:Procesos , dragEnable: boolean = true) {
    // El proceso padre. 
    const ordPadre: number =  +proc.orden.toString().split('.')[0];
    // Buscamos al padre. 
    // TODO: Cuando se modifique el guardado de proceos y que almacene el id del padre hay que modificar aquí tambien???
    let padre = null;
    // TODO: Debe buscar por id que esta almacenado en el Proceso. 
    for (const b in this.arreglosDrop) {
      if (this.arreglosDrop.hasOwnProperty(b)) {
        const a = this.arreglosDrop[b];
        if ( a.proc.orden === ordPadre ) {
          padre = a;
          break;
        }
      }
    }

  
    if ( padre ) {
      // Debe existir el array.
      padre.arreglo.push(proc);
      proc.dragEnable = dragEnable;
    }
  }



}
