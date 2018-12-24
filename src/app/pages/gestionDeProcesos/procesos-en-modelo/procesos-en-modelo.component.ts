import { Component, OnInit, Inject } from '@angular/core';
import { ModeloCompleto } from 'src/app/models/modeloCompleto.modelo';
import swal from 'sweetalert2';
import { 
  ModeloCompletoService,
  UtilidadesService, 
  ProcesoService, 
  ManejoDeMensajesService, 
  CalculosDeCostosService, 
  FamiliaDeProcesosService,
  ColorService,
  TerminadoService,
  ModeloService,
  TamanoService } from 'src/app/services/service.index';
import { Modelo } from 'src/app/models/modelo.models';
import { Tamano } from 'src/app/models/tamano.models';
import { Color } from 'src/app/models/color.models';
import { Terminado } from 'src/app/models/terminado.models';
import { Laser } from 'src/app/models/laser.models';
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service';
import { FamiliaDeProcesos, Procesos } from '../../../models/familiaDeProcesos.model';
import { Proceso } from 'src/app/models/proceso.model';
import { PaginadorService } from 'src/app/components/paginador/paginador.service';


@Component({
  selector: 'app-procesos-en-modelo',
  templateUrl: './procesos-en-modelo.component.html',
  styles: [],
  providers: [
    { provide: 'PSModeloCompleto', useClass: PaginadorService },
    { provide: 'PSModelos', useClass: PaginadorService },
    { provide: 'PSTamano', useClass: PaginadorService },
    { provide: 'PSColor', useClass: PaginadorService },
    { provide: 'PSTerminado', useClass: PaginadorService },
    { provide: 'PSProceso', useClass: PaginadorService },
    { provide: 'PSFamiliaDeProcesos', useClass: PaginadorService },
]
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
  mediasOrdenes: boolean = false;
  familiaDeProceso: FamiliaDeProcesos = null;
  // procesosEspecialesModelo: Procesos[] = [];

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
        modificar: ( a ) => {
          if( a._id){
            this._modeloService.modificar( a ).subscribe(() => { this.modificadoGeneral( a ); }); 
          }else{
            this._modeloService.guardar( a ).subscribe(() => { this.modificadoGeneral( a ); }); 
            this._modeloService.todo().subscribe( resp=>{
              this.modelos = resp;
            })
          }
        }},
      tamano: {
        editandose: null,
        modificar: ( a ) => {
          if( a._id){
            this._tamanoService.modificar( a ).subscribe(() => { this.modificadoGeneral( a ); }); 
          }else{
            this._tamanoService.guardar( a ).subscribe(() => { this.modificadoGeneral( a ); }); 
            this._tamanoService.todo().subscribe( resp=>{
              this.tamanos = resp;
            })
          }
        }},
      color: {
        editandose: null,
        modificar: ( a ) => {
          if( a._id){
            this._colorService.modificar( a ).subscribe(() => { this.modificadoGeneral( a ); }); 
          }else{
            this._colorService.guardar( a ).subscribe(() => { this.modificadoGeneral( a ); }); 
            this._colorService.todo().subscribe( resp=>{
              this.colores = resp;
            })
          }
        }},
      terminado: {
        editandose: null,
        modificar: ( a ) => {
          if( a._id){
            this._terminadoService.modificar( a ).subscribe(() => { this.modificadoGeneral( a ); }); 
          }else{
            this._terminadoService.guardar( a ).subscribe(() => { this.modificadoGeneral( a ); }); 
            this._terminadoService.todo().subscribe( resp=>{
              this.terminados = resp;
            })
          }
        }},
      
  };

  constructor(
    public _modeloCompletoService: ModeloCompletoService,
    public _modeloService: ModeloService,
    public _tamanoService: TamanoService,
    public _colorService: ColorService,
    public _terminadoService: TerminadoService,
    public _utilidadesService: UtilidadesService,
    public _preLoaderService: PreLoaderService,
    public _procesosService: ProcesoService,
    public _familiaDeProcesosService: FamiliaDeProcesosService,
    public _manejoDeMensajesService: ManejoDeMensajesService,
    public _calculosService: CalculosDeCostosService,
    // public _paginadorService: PaginadorService,
    @Inject('PSModeloCompleto') public _PSModeloCompleto: PaginadorService,
    @Inject('PSModelos') public _PSModelos: PaginadorService,
    @Inject('PSTamano') public _PSTamano: PaginadorService,
    @Inject('PSColor') public _PSColor: PaginadorService,
    @Inject('PSTerminado') public _PSTerminado: PaginadorService,
    @Inject('PSProceso') public _PSProceso: PaginadorService,
    @Inject('PSFamiliaDeProcesos') public _PSFamiliaDeProcesos: PaginadorService,
  ) { 
    
    
    
  }
  
  
  
  ngOnInit() {
    this.cargarTodosLosDatos();

    this._PSModeloCompleto.callback = ( desde, limite) =>{
      this.cargarModelosCompletos(desde, limite);
    }
    this._PSModelos.callback = (desde, limite ) =>{
      this.cargarModelos(desde, limite)
    }
    this._PSTamano.callback = (desde, limite ) =>{
      this.cargarTamano(desde, limite)
    }
    this._PSColor.callback = (desde, limite ) =>{
      this.cargarColor(desde, limite)
    }
    this._PSTerminado.callback = (desde, limite ) =>{
      this.cargarTerminado(desde, limite)
    }
    this._PSProceso.callback = (desde, limite ) =>{
      this.cargarProcesos(desde, limite)
    }
    this._PSFamiliaDeProcesos.callback = (desde, limite ) =>{
      this.cargarFamiliasDeProcesos(desde, limite)
    }
    
  }

  cargarTodosLosDatos( ) {
    Promise.all([
      this.cargarModelosCompletos(),
      this.cargarModelos(),
      this.cargarTamano(),
      this.cargarColor(),
      this.cargarTerminado(),
      this.cargarProcesos(),
      this.cargarFamiliasDeProcesos()
            
    ]).then(() => {
    }).catch( err => {
      console.log(err);
    });
  }

  modificadoGeneral( a: any ) {
    a.editado = false;
    this.dejarDeEditar();
    this.cargarModelosCompletos();
  }

  cargarModelos(  desde: number =0, limite:number = 5 ) {
    this._modeloService.todo(desde, limite, this._PSModelos).subscribe( 
      modelos => {
        this.modelos = Modelo.fromJSON_Array( modelos );
        // this._utilidadesService.ordenarArreglo( this.modelos, 'modelo');
        this.modelos.map( x => x.cb_Modificar = this.visorDeCambios.modelo.modificar);
      })
  }
  cargarTamano(  desde: number =0, limite:number = 5 ) {
    this._tamanoService.todo(desde, limite, this._PSTamano).subscribe( 
      tamanos => {
        this.tamanos = Tamano.fromJSON_Array( tamanos );
        // this._utilidadesService.ordenarArreglo( this.tamanos, 'tamano');
        this.tamanos.map(x => x.cb_Modificar = this.visorDeCambios.tamano.modificar);
      })
  }
  cargarColor(  desde: number =0, limite:number = 5 ) {
    this._colorService.todo(desde, limite, this._PSColor).subscribe( 
      colores => {
        
        this.colores = Color.fromJSON_Array( colores );
        // this._utilidadesService.ordenarArreglo( this.colores, 'color');
        this.colores.map(x => x.cb_Modificar = this.visorDeCambios.color.modificar);
      })
  }
  cargarTerminado(  desde: number =0, limite:number = 5 ) {
    this._terminadoService.todo(desde, limite, this._PSTerminado).subscribe( 
      terminado => {
        this.terminados = Terminado.fromJSON_Array( terminado );
        // this._utilidadesService.ordenarArreglo( this.terminados, 'terminado');
        this.terminados.map(x => x.cb_Modificar = this.visorDeCambios.terminado.modificar);
      })
  }

  cargarProcesos(  desde: number =0, limite:number = 5 ) {
    this._procesosService.todo(desde, limite, this._PSProceso).subscribe(resp => {
      this.procesosNormales = resp;
    })

  }
  cargarFamiliasDeProcesos(  desde: number =0, limite:number = 5 ) {
    this._familiaDeProcesosService.todo(desde, limite, this._PSFamiliaDeProcesos).subscribe(resp=>{
      this.familiaDeProcesos = resp;
    })
  }

  cargarModelosCompletos(  desde: number =0, limite:number = 5 ) {
    this._modeloCompletoService.todoConCostos( desde, limite, this._PSModeloCompleto ).subscribe( (mC) => {
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
    if ( !this.familiaDeProceso ) {
      this._manejoDeMensajesService.invalido( 'Es necesario que definas la familia de procesos.');
      return;
    }
    
    // Reordenamos los procesos por si hubo algún fallo en el drop.
    this.reordenarProcesos();
    // Obtenemos todos los procesos especiales para guardarlos. 
    // for (const x in this.arreglosDrop) {
    //   if (this.arreglosDrop.hasOwnProperty(x)) {
    //     const element = this.arreglosDrop[x];
    //     for (let i = 0; i < element.arreglo.length; i++) {
    //       const proc = element.arreglo[i];
    //       // this.procesosEspecialesModelo.push( proc );
    //     }
    //   }
    // }
    const datos: any = { 
         modelo : this.modelo,
         tamano : this.tamano,
         color : this.color,
         terminado : this.terminado,
         laserAlmacen : this.laserAlmacen,
         versionModelo : this.versionModelo,
         familiaDeProcesos : this.familiaDeProceso,
        //  procesosEspeciales : this.procesosEspecialesModelo
    };
    this._modeloCompletoService.guardar( datos ).subscribe( () => {
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
    // this.procesosEspecialesModelo = [];
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
          this._modeloCompletoService.eliminar( mc ).subscribe( () => {
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


  nuevoModelo(){
    this.visorDeCambios.modelo.editandose = new Modelo();

  }
  nuevoTamano(){

  }
  nuevoColor(){

  }
  ColorTerminado(){

  }




  





}
