import { Component, OnInit } from '@angular/core';
import { ModeloCompleto } from 'src/app/models/modeloCompleto.modelo';
import swal from 'sweetalert2';
import { 
  ModeloService, 
  UtilidadesService, 
  ProcesoService, 
  ManejoDeMensajesService, 
  CalculosDeCostosService } from 'src/app/services/service.index';
import { Modelo } from 'src/app/models/modelo.models';
import { Tamano } from 'src/app/models/tamano.models';
import { Color } from 'src/app/models/color.models';
import { Terminado } from 'src/app/models/terminado.models';
import { Laser } from 'src/app/models/laser.models';
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service';
import { Subscriber } from 'rxjs';
import { mcall } from 'q';
import { FamiliaDeProcesos, Procesos } from '../../../models/familiaDeProcesos.model';
import { Proceso } from 'src/app/models/proceso.model';
import { Orden } from 'src/app/models/orden.models';

@Component({
  selector: 'app-procesos-en-modelo',
  templateUrl: './procesos-en-modelo.component.html',
  styles: []
})
export class ProcesosEnModeloComponent implements OnInit {

  
  creandoModelo: boolean = false;
  modelosCompletos: ModeloCompleto[] = [];

  modeloCompletoCostos: ModeloCompleto = null;

  modelo: string = '';
  tamano: string = '';
  color: string = '';
  terminado: string = '';
  laserAlmacen: string = '';
  versionModelo: string = '';
  familiaDeProceso: FamiliaDeProcesos = null;
  procesosEspecialesModelo: Procesos[] = [];

  procesosTemporales: Proceso[] = [];

  modelos: Modelo [] = [];
  tamanos: Tamano [] = [];
  colores: Color [] = [];
  terminados: Terminado [] = [];
  marcasLaser: Laser [] = [];

  familiaDeProcesos: FamiliaDeProcesos[] = [];
  procesosNormales: Proceso[] = [];
  procesosEspeciales: Proceso[] = [];

  arreglosDrop: any = {};


  // Estamos editando para que todo sea más facil. Un array de objetos para limpiar??? etc. 
  visorDeCambios = {
      modelo: {
        editandose: null,
        modificar: ( a ) => {this._modeloService.modificarModelo( a ).subscribe(m => { this.modificadoGeneral( a ); }); }},
      tamano: {
        editandose: null,
        modificar: ( a ) => {this._modeloService.modificarTamano( a ).subscribe(m => { this.modificadoGeneral( a ); }); }},
      color: {
        editandose: null,
        modificar: ( a ) => {this._modeloService.modificarColor( a ).subscribe(m => { this.modificadoGeneral( a ); }); }},
      terminado: {
        editandose: null,
        modificar: ( a ) => {this._modeloService.modificarTerminado( a ).subscribe(m => { this.modificadoGeneral( a ); }); }},
      
  };

  constructor(
    public _modeloService: ModeloService,
    public _utilidadesService: UtilidadesService,
    public _preloaderService: PreLoaderService,
    public _procesos: ProcesoService,
    public _manejoDeMensajesService: ManejoDeMensajesService,
    public _calculosService: CalculosDeCostosService
    ) { 
      
      _preloaderService.cargando = true;
      this.cargarTodosLosDatos();
    }
    ngOnInit() {

  }

  cargarTodosLosDatos( ) {
    Promise.all([
      this.cargarModelosCompletos(),
      this._modeloService.cargarModelos().subscribe( 
        modelos => {
          this.modelos = Modelo.fromJSON_Array( modelos );
          // this._utilidadesService.ordenarArreglo( this.modelos, 'modelo');
          this.modelos.map( x => x.cb_Modificar = this.visorDeCambios.modelo.modificar);
        }),
      this._modeloService.cargarTamanos().subscribe( 
        tamanos => {
          this.tamanos = Tamano.fromJSON_Array( tamanos );
          // this._utilidadesService.ordenarArreglo( this.tamanos, 'tamano');
          this.tamanos.map(x => x.cb_Modificar = this.visorDeCambios.tamano.modificar);
        }),
      this._modeloService.cargarColores().subscribe( 
        colores => {
          
          this.colores = Color.fromJSON_Array( colores );
          // this._utilidadesService.ordenarArreglo( this.colores, 'color');
          this.colores.map(x => x.cb_Modificar = this.visorDeCambios.color.modificar);
        }),
      this._modeloService.cargarTerminados().subscribe( 
        terminado => {
          this.terminados = Terminado.fromJSON_Array( terminado );
          // this._utilidadesService.ordenarArreglo( this.terminados, 'terminado');
          this.terminados.map(x => x.cb_Modificar = this.visorDeCambios.terminado.modificar);
        }),
      
     
        this._procesos.obtenerTodosLosProcesos().subscribe(resp => {
          this.familiaDeProcesos = resp.familiaDeProcesos;  
          this.procesosEspeciales = resp.procesosEspeciales;
          this.procesosNormales = resp.procesosNormales;
        }),
    ]).then(() => {
       this._preloaderService.cargando = false;
    }).catch( err => {
      console.log(err);
    });
  }

  modificadoGeneral( a: any ) {
    a.editado = false;
    this.dejarDeEditar();
    this.cargarModelosCompletos();
  }

  cargarModelosCompletos( ) {
    this._modeloService.cargarModelosCompletosParaCostos( ).subscribe( (mC) => {
      if ( mC ) {
        this.modelosCompletos = ModeloCompleto.fromJSON_Array( mC );
        this.modelosCompletos.map(x => x.nombreCompleto = ModeloCompleto.nombreCom(x));
        this._utilidadesService.ordenarArreglo( this.modelosCompletos, 'nombreCompleto');
      }
    });
  }

  editando( ): boolean {
    for (const key in this.visorDeCambios) {
      if (this.visorDeCambios.hasOwnProperty(key)) {
        const element = this.visorDeCambios[key];
        if ( element.editandose ) {
          return true;
        }
      }
    }
    return this.creandoModelo || this.modeloCompletoCostos !== null ;
  }
  
  guardarNuevoModelo ( ) {
    this._preloaderService.cargando = true;
    if ( !this.familiaDeProceso ) {
      this._manejoDeMensajesService.invalido( 'Es necesario que definas la familia de procesos.');
      return;
    }
    
    // Reordenamos los procesos por si hubo algún fallo en el drop.
    this.reordenarProcesos();
    // Obtenemos todos los procesos especiales para guardarlos. 
    for (const x in this.arreglosDrop) {
      if (this.arreglosDrop.hasOwnProperty(x)) {
        const element = this.arreglosDrop[x];
        for (let i = 0; i < element.arreglo.length; i++) {
          const proc = element.arreglo[i];
          this.procesosEspecialesModelo.push( proc );
        }
      }
    }
    const datos: any = { 
         modelo : this.modelo,
         tamano : this.tamano,
         color : this.color,
         terminado : this.terminado,
         laserAlmacen : this.laserAlmacen,
         versionModelo : this.versionModelo,
         familiaDeProcesos : this.familiaDeProceso,
         procesosEspeciales : this.procesosEspecialesModelo
    };
    this._modeloService.guardar( datos ).subscribe( (resp: ModeloCompleto) => {
        // this.modelosCompletos.push( resp );
        this.limpiarModeloCompleto();
        this._utilidadesService.ordenarArreglo(this.modelosCompletos, 'nombreCompleto');
        this.cargarTodosLosDatos();
    });

  }

  limpiarModeloCompleto( ) {
    this.creandoModelo = false;
    this.modelo = '';
    this.tamano = '';
    this.color = '';
    this.terminado = '';
    this.laserAlmacen = '';
    this.versionModelo = '';

    this.familiaDeProceso = null;
    this.procesosEspecialesModelo = [];
    this.procesosTemporales  = [];
    this.arreglosDrop = {};
  }

  dejarDeEditar( ) {
    for (const key in this.visorDeCambios) {
      if (this.visorDeCambios.hasOwnProperty(key)) {
        const element = this.visorDeCambios[key];
        if ( element.editandose ) {
          element.editandose = null;
          return;
        }
      }
    }
  }

  guardarEdiciones( ) {
    for (const key in this.visorDeCambios) {
      if (this.visorDeCambios.hasOwnProperty(key)) {
        const element = this.visorDeCambios[key];
        if ( element.editandose ) {
          element.modificar( element.editandose );
        }
      }
    }
  }
  
  crearNuevoModelo( ) {
    this.creandoModelo = true;
  }
  
  agregarFamiliaDeProceso( familia: FamiliaDeProcesos) {
    // Agregamos la familia.
    this.familiaDeProceso = familia;

    // Creamos arreglos según la cantidad de procesos que existen para las zonas.
    for (let i = 0; i < this.familiaDeProceso.procesos.length; i++) {
      const proc = this.familiaDeProceso.procesos[i]._id;
      const arreglo: Procesos[] = [];
      this.arreglosDrop[proc] = {
        arreglo: arreglo,
        proc: this.familiaDeProceso.procesos[i]
      };
    }
    
  }
  agregarProceso( proceso: Proceso ) {
    for (const x in this.arreglosDrop) {
      if (this.arreglosDrop.hasOwnProperty(x)) {
        const element = this.arreglosDrop[x];
        
        const proc = new Procesos();
        // TODO: Guardar el id del padre aquí. Viene en X ???
        proc.proceso = proceso;
        proc.orden = 0;
        element.arreglo.push( proc );
        this.reordenarProcesos();
        
        return;
      }
    }
  }

  reordenarProcesos( ) {
   for (const x in this.arreglosDrop) {
     if (this.arreglosDrop.hasOwnProperty(x)) {
       const element = this.arreglosDrop[x];
      //  TODO: Modificar aqui tambien el id del pradre del proceso. (Ver notas relacionadas en TODO.)
       for (let i = 0; i < element.arreglo.length; i++) {
        const pro = element.arreglo[i];
        pro.orden = (( i + 1) / 10) + element.proc.orden ;
       }
     }
   }
  }

  eliminarFamiliaDeProceso( ) {
    this.familiaDeProceso = null;
    this.arreglosDrop = {};
  }

  eliminarModeloCompleto( mc: ModeloCompleto ) {
    const msj = 'Vas a eliminar un modelo completo. Esta acción afectara a '
    + 'todas las órdenes existentes, estadíscas y costos relacionados' +
    ' a este modelo. ¿Aun así quieres seguir?';
    this._manejoDeMensajesService.confirmacionDeEliminacion( 
      msj, () => {
        this._manejoDeMensajesService.confirmacionDeEliminacion( 'De verdad no te puedes arrepentir, ¿Aun así lo vas a eliminar?', () => {
          this._modeloService.eliminarModeloCompleto( mc ).subscribe( mce => {
            this.cargarModelosCompletos();
          });
        });
      });
  }

  editarModeloCompleto( mc: ModeloCompleto ) {
    this.modeloCompletoCostos = mc;
    this.modeloCompletoCostos.editado = true;

    // Revisamos que las máquinas tengan los espacios necesarios para la máquina. 

    // this.modeloCompletoCostos.familiaDeProcesos.procesos.forEach(proc => {
    //   proc.proceso.maquinas.forEach(maq => {
    //     maq.crearPropiedad(this.modeloCompletoCostos._id);
    //   });
    // });
    
  }

  guardarCambiosDeModeloCompleto( mc: ModeloCompleto) {
    swal( 'Sin implementar' );
    mc.editado = false;
  }

  cancelarCambiosDeModeloCompleto( mc: ModeloCompleto ) {
    this.modeloCompletoCostos = null;
    mc.editado = true;
  }

  id( ...id): string {
    return this._calculosService.id(id);
  }




  





}
