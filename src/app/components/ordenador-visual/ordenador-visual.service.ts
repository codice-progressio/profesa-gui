import { Injectable } from '@angular/core';
import { ModeloCompleto } from 'src/app/models/modeloCompleto.modelo';
import { Procesos } from 'src/app/models/familiaDeProcesos.model';
// import { ProcesoService, ModeloService, ManejoDeMensajesService } from 'src/app/services/service.index';
import { Proceso } from 'src/app/models/proceso.model';
import swal from 'sweetalert2';
import { FolioLinea } from 'src/app/models/folioLinea.models';
import { ProcesoService } from 'src/app/services/proceso/proceso.service';
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service';
import { ModeloCompletoService } from '../../services/modelo/modelo-completo.service';


@Injectable({
  providedIn: 'root'
})
export class OrdenadorVisualService {
  
  generarComponente: boolean = false;

  modeloCompleto: ModeloCompleto;

  // arreglosDrop:
  // Almacena la información de los procesos para reoganizar y asignar el
  // orden conforme al proceso que sigue. Este arreglo tiene esta estructura. 
  //     [
  //       ID del proceso (TODO: Definir por que asi?)
  //       5bce49092cb2a81894899c5b: {arreglo: Array(0), proc: {…}},
  //       5bce49092cb2a81894899c5c: {arreglo: Array(1), proc: {…}},
  //       5bd22a38b37775377c0776e1: {arreglo: Array(0), proc: {…}},
  //       5bd22a38b37775377c0776e2: {arreglo: Array(0), proc: {…}},
  //     ]
  // En arreglo:Array() se almacena los Procesos para el órde y proc se utiza para 
  // alacenar los datos que el ordenador-visual va utilizar para generar las areas de dnd.
  arreglosDrop: any = {};

  procesosNormales: Proceso[];
  // procesosEspeciales: Proceso;

  constructor(
    public _procesosService: ProcesoService,
    public _modeloService: ModeloCompletoService,
    public _msjService: ManejoDeMensajesService
    
  ) { 

  }

  cargarProcesos( ) {
    this._procesosService.todo().subscribe(procesos => {
      // this.familiaDeProcesos = resp.familiaDeProcesos;  
      // this.procesosEspeciales = resp.procesosEspeciales;
      this.procesosNormales = procesos;
    });
  }

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

  agregarProceso( proceso: Proceso ) {

    for (const x in this.arreglosDrop) {
      if (this.arreglosDrop.hasOwnProperty(x)) {
        const element = this.arreglosDrop[x];
        
        const proc = new Procesos();
        proc.proceso = proceso;
        proc.orden = 0;
        proc.dragEnable = true;
        element.arreglo.push( proc );
        this.reordenarProcesos();
        this._msjService.correcto('Se agrego un proceso temporal a este pedido.');
        return;
      }
    }
  }

  eliminarProceso( arreglo: any, index: number ) {
    // Eliminamos el proceso. 
    arreglo.splice(index, 1);
    // Reordenamos lo que quede. 
    this.reordenarProcesos();
  }

  // Obtiene solo los Procesos y no el Proceso.
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

    // Acomodamos cada proceso especial que
    // tiene el folio linea dentro de su correspondiente
    // arreglo. 
    for (const b in this.arreglosDrop) {
      if (this.arreglosDrop.hasOwnProperty(b)) {
        const a = this.arreglosDrop[b];
        fl.procesos.forEach(proc => {
        });
        
      }
    }

    fl.procesos.forEach(proc => {
      this.ordenarProcesosConSusPadres(proc);
    });

  }

  private ordenarProcesosConSusPadres(proc , dragEnable: boolean = true) {
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
