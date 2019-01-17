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
  TamanoService, 
  ValidacionesService} from 'src/app/services/service.index';
import { Modelo } from 'src/app/models/modelo.models';
import { Tamano } from 'src/app/models/tamano.models';
import { Color } from 'src/app/models/color.models';
import { Terminado } from 'src/app/models/terminado.models';
import { Laser } from 'src/app/models/laser.models';
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service';
import { FamiliaDeProcesos } from '../../../models/familiaDeProcesos.model';
import { Procesos } from "../../../models/procesos.model";
import { Proceso } from 'src/app/models/proceso.model';
import { PaginadorService } from 'src/app/components/paginador/paginador.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModeloCompletoPipe } from 'src/app/pipes/modelo-completo.pipe';
import { OrganizadorDragAndDrop } from '../../../components/organizador-drag-and-drop/models/organizador-drag-and-drop.model';
import { OrganizadorDragAndDropService } from 'src/app/components/organizador-drag-and-drop/organizador-drag-and-drop.service';


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

  
  /**
   * Define cuando se esta creando o modificando un modelo completo. 
   *
   * @type {boolean}
   * @memberof ProcesosEnModeloComponent
   */
  creandoModelo: boolean = false;

  /**
   * El id del modelo completo que se esta editando. 
   * Lo guardamos para despues saber si estamos guardando un 
   * modelo completo o queremos modificar uno existente.
   *
   * @type {string}
   * @memberof ProcesosEnModeloComponent
   */
  idModeloCompletoEditando: string = null;



  modelosCompletos: ModeloCompleto[] = [];

  modeloCompletoCostos: ModeloCompleto = null;

  // modelo: string = '';
  // tamano: string = '';
  // color: string = '';
  // terminado: string = '';
  // laserAlmacen: string = '';
  // versionModelo: string = '';
  // mediasOrdenes: boolean = false;
  familiaDeProceso: FamiliaDeProcesos = null;
  // procesosEspecialesModelo: Procesos[] = [];

  // ReactiveForms


  procesosTemporales: Proceso[] = [];

  modelos: Modelo [] = [];
  tamanos: Tamano [] = [];
  colores: Color [] = [];
  terminados: Terminado [] = [];
  marcasLaser: Laser [] = [];

  familiaDeProcesos: FamiliaDeProcesos[] = [];
  procesosNormales: Proceso[] = [];
  procesosEspeciales: Proceso[] = [];

  
  /**
   *Alamcena los datos de la lista ordenable bajo la siguiente estructura:

     arreglosDrop = { 
       'idKeyPadre': {
          arreglo: Procesos[],
          proc: Procesos, => Este es un procesos y viene siendo el padre.
       }
     } 
   *
   * @type {*}
   * @memberof ProcesosEnModeloComponent
   */
  arreglosDrop: any = {};



  private msjEliminacion: string = `Eliminar esto siginifica que tambien toda la informacion 
  relacionada como modelos autorizados de clientes, 
  pedidos en transito y pendientes de ordenes asi 
  como los modelos completos se eliminaran. 
  No podras recuperar esta informacion.`


  // Estamos editando para que todo sea más facil. Un array de objetos para limpiar??? etc. 
  visorDeCambios = {
      modelo: {
        editandose: null,
        modificar: ( a ) => {
          if( a._id){
            this._modeloService.modificar( a ).subscribe(() => { this.modificadoGeneral( a ); }); 
            this.cargarModelos();
          }else{
            this._modeloService.guardar( a ).subscribe(() => { 
              this.modificadoGeneral( a ); 
              this.cargarModelos();
            }); 

          }
        }
        ,eliminar: ( id: string ) => {
          this._manejoDeMensajesService.confirmacionDeEliminacion(this.msjEliminacion, ()=>{
            this._modeloService.eliminar( id ).subscribe(() => {
              this.cargarTodosLosDatos();
            });
          });
        }
      },
      tamano: {
        editandose: null,
        modificar: ( a ) => {
          if( a._id){
            this._tamanoService.modificar( a ).subscribe(() => { 
              this.modificadoGeneral( a );
              this.cargarTamano();
            }); 
          }else{
            this._tamanoService.guardar( a ).subscribe(() => { 
              this.cargarTamano();
              this.modificadoGeneral( a );
          }); 
            
          }
        },eliminar: ( id: string ) => {
          this._manejoDeMensajesService.confirmacionDeEliminacion(this.msjEliminacion, ()=>{
            this._tamanoService.eliminar( id ).subscribe(() => {
              this.cargarTodosLosDatos();
            });
          });
        }},
        
      color: {
        editandose: null,
        modificar: ( a ) => {
          if( a._id){
            this._colorService.modificar( a ).subscribe(() => { 
              this.modificadoGeneral( a );
              this.cargarColor();

             }); 
          }else{
            this._colorService.guardar( a ).subscribe(() => { 
              this.modificadoGeneral( a );
              this.cargarColor();
              

             }); 
            this._colorService.todo().subscribe( resp=>{
              this.colores = resp;
            })
          }
        },eliminar: ( id: string ) => {
          this._manejoDeMensajesService.confirmacionDeEliminacion(this.msjEliminacion, ()=>{
            this._colorService.eliminar( id ).subscribe(() => {
              this.cargarTodosLosDatos();
            });
          });
        }},
      terminado: {
        editandose: null,
        modificar: ( a ) => {
          if( a._id){
            this._terminadoService.modificar( a ).subscribe(() => { 
              this.modificadoGeneral( a );
              this.cargarTerminado();


             }); 
          }else{
            this._terminadoService.guardar( a ).subscribe(() => { 
              this.modificadoGeneral( a );
              this.cargarTerminado();



             }); 
            this._terminadoService.todo().subscribe( resp=>{
              this.terminados = resp;
            })
          }
        },eliminar: ( id: string ) => {
          this._manejoDeMensajesService.confirmacionDeEliminacion(this.msjEliminacion, ()=>{
            this._terminadoService.eliminar( id ).subscribe(() => {
              this.cargarTodosLosDatos();
            });
          });
        }},
      
  };

  modeloCompletoForm: FormGroup;


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
    private formBuilder: FormBuilder,
    public _validacionesService: ValidacionesService,
    private modeloCompletoPipe: ModeloCompletoPipe,

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

    // ReactForm de modeloCompleto.
    this.modeloCompletoForm = this.formBuilder.group({
      modelo :['', [
        Validators.required,
        Validators.min(0.01),
      ]],
      tamano :['', [
        Validators.required
        
      ]],
      color :['', [
        Validators.required
        
      ]],
      terminado :['', [
        Validators.required
        
      ]],
      laserAlmacen :['', [
        
      ]],
      versionModelo :['', [
        
      ]],
      medias :['', [
        
      ]],
      familiaDeProcesos :['', [
        Validators.required

      ]],
    });


    this.cargarTodosLosDatos();

    this._PSModeloCompleto.callback = ( ) =>{
      this.cargarModelosCompletos();
    }
    this._PSModelos.callback = ( ) =>{
      this.cargarModelos()
    }
    this._PSTamano.callback = ( ) =>{
      this.cargarTamano()
    }
    this._PSColor.callback = ( ) =>{
      this.cargarColor()
    }
    this._PSTerminado.callback = ( ) =>{
      this.cargarTerminado()
    }
    this._PSProceso.callback = ( ) =>{
      this.cargarProcesos()
    }
    this._PSFamiliaDeProcesos.callback = ( ) =>{
      this.cargarFamiliasDeProcesos()
    }
    
  }

  getModelo_FB( ){
    return this.modeloCompletoForm.get('modelo') 
  } 
  getTamano_FB( ){
    return this.modeloCompletoForm.get('tamano') 
  } 
  getColor_FB( ){
    return this.modeloCompletoForm.get('color') 
  } 
  getTerminado_FB( ){
    return this.modeloCompletoForm.get('terminado') 
  } 
  getLaserAlmacen_FB( ){
    return this.modeloCompletoForm.get('laserAlmacen') 
  } 
  getVersionModelo_FB( ){
    return this.modeloCompletoForm.get('versionModelo') 
  } 
  getMedias_FB( ){
    return this.modeloCompletoForm.get('medias') 
  } 
  getFamiliaDeProcesos_FB( ){
    return this.modeloCompletoForm.get('familiaDeProcesos') 
  } 
  

  /**
   *Guarda y modifica el modelo completo desde el formulario. 
   *
   * @param {ModeloCompleto} modelo El modelo que se genero en modeloCompletoForm
   * @param {boolean} isValid Si el formulario es valido. 
   * @param {*} e El evento para prevenir default.  
   * @returns
   * @memberof ProcesosEnModeloComponent
   */
  onSubmitModeloCompleto( modelo: ModeloCompleto, isValid: boolean, e ) {
    e.preventDefault();
   
    if( !isValid ) return;
    
    // Reordenamos los procesos por si hubo algún fallo en el drop.
    this.reordenarProcesos();
    const datos: ModeloCompleto = modelo;
    

    let laser: Laser = new Laser();
    laser.laser = <string> <any> modelo.laserAlmacen;
    datos.laserAlmacen = laser;

    datos.medias = !!modelo.medias
    datos.familiaDeProcesos = this.familiaDeProceso;

    // Obtenemos los procesos especiales. 
    let pe: Procesos[] = [];
    
    datos.procesosEspeciales = pe;
    for (const key in this.arreglosDrop) {
      if (this.arreglosDrop.hasOwnProperty(key)) {
        const element = this.arreglosDrop[key];
        let arregloProcesos: Procesos[] = element.arreglo;
        arregloProcesos.map( x =>{ 
          // El proceso padre tiene que se el id del proceso y
          // el id del Procesos. Hay una gran diferencia.
          x.procesoPadre = element.proc.proceso;
          datos.procesosEspeciales.push( x) ;
        });

      }
    }


    datos.nombreCompleto = this.modeloCompletoPipe.transform(datos);

    // El callback para ambas operaciones. 

    const call: any = ()=>{
          // this.modelosCompletos.push( resp );
          this.limpiarModeloCompleto();
          this._utilidadesService.ordenarArreglo(this.modelosCompletos, 'nombreCompleto');
          this.cargarTodosLosDatos();
    }
    

    if( this.idModeloCompletoEditando ){
      datos._id = this.idModeloCompletoEditando;
      this._modeloCompletoService.modificar( datos ).subscribe( call );
    } else {
      this._modeloCompletoService.guardar( datos ).subscribe( call );
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
      throw err;
      
    });
  }

  modificadoGeneral( a: any ) {
    a.editado = false;
    this.dejarDeEditar();
    this.cargarModelosCompletos();
  }

  cargarModelos(  ) {
    this._modeloService.todo(this._PSModelos).subscribe( 
      modelos => {
        this.modelos = Modelo.fromJSON_Array( modelos );
        this.modelos.map( x => x.cb_Modificar = this.visorDeCambios.modelo.modificar);
      })
  }
  cargarTamano(  ) {
    this._tamanoService.todo(this._PSTamano).subscribe( 
      tamanos => {
        this.tamanos = Tamano.fromJSON_Array( tamanos );
        this.tamanos.map(x => x.cb_Modificar = this.visorDeCambios.tamano.modificar);
      })
  }
  cargarColor(  ) {
    this._colorService.todo(this._PSColor).subscribe( 
      colores => {
        
        this.colores = Color.fromJSON_Array( colores );
        this.colores.map(x => x.cb_Modificar = this.visorDeCambios.color.modificar);
      })
  }
  cargarTerminado(  ) {
    this._terminadoService.todo(this._PSTerminado).subscribe( 
      terminado => {
        this.terminados = Terminado.fromJSON_Array( terminado );
        this.terminados.map(x => x.cb_Modificar = this.visorDeCambios.terminado.modificar);
      })
  }

  cargarProcesos(  ) {
    this._procesosService.todo(this._PSProceso).subscribe(resp => {
      this.procesosNormales = resp;
    })

  }
  cargarFamiliasDeProcesos(  ) {
    this._familiaDeProcesosService.todo(this._PSFamiliaDeProcesos).subscribe(resp=>{
      this.familiaDeProcesos = resp;
    })
  }

  cargarModelosCompletos(  ) {
    this._modeloCompletoService.todo( this._PSModeloCompleto ).subscribe( (mC:ModeloCompleto[]) => {
      if ( mC ) {
        this.modelosCompletos = mC;
        
        // this.modelosCompletos = ModeloCompleto.fromJSON_Array( mC );
        this.modelosCompletos.map(x => x.nombreCompleto = ModeloCompleto.nombreCom(x));
        // this._utilidadesService.ordenarArreglo( this.modelosCompletos, 'nombreCompleto');
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
  
  // guardarNuevoModelo ( ) {
   
  // }

  limpiarModeloCompleto( ) {
    this.creandoModelo = false;
    // this.modelo = '';
    // this.tamano = '';
    // this.color = '';
    // this.terminado = '';
    // this.laserAlmacen = '';
    // this.versionModelo = '';

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
    this.modeloCompletoForm.reset(this.reiniciarFormularioModeloCompleto(true, null));
    this.familiaDeProceso = null;
    this.creandoModelo = true;
    this.idModeloCompletoEditando = null;
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

  /**
   *Reordena los procesos seleccionados para agregar
   el numero en Procesos.orden. Tambien asiganmos el id del padre. 
   *
   * @memberof ProcesosEnModeloComponent
   */
  reordenarProcesos( ) {
   for (const key in this.arreglosDrop) {
     if (this.arreglosDrop.hasOwnProperty(key)) {
       const element = this.arreglosDrop[key];
       for (let i = 0; i < element.arreglo.length; i++) {
        const pro:Procesos = element.arreglo[i];
        pro.orden = (( i + 1) / 10) + element.proc.orden ;
        pro.procesoPadre._id = key
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
          this._modeloCompletoService.eliminar( mc._id ).subscribe( () => {
            this.cargarModelosCompletos();
          });
        });
      });
  }

  /**
   * Edita los datos de un modeloCompleto.
   *
   * @param {ModeloCompleto} mc El modelo completo del que se van a editar los datos. 
   * @memberof ProcesosEnModeloComponent
   */
  editarModeloCompleto( mc: ModeloCompleto ){

    this.modeloCompletoForm.reset(this.reiniciarFormularioModeloCompleto(false, mc));
    
    this.creandoModelo = true;
    this.agregarFamiliaDeProceso( mc.familiaDeProcesos );
    this.idModeloCompletoEditando = mc._id;

  }

  /**
   * El objeto para reiniciar el formulario. 
   *
   * @param {boolean} reiniciarORellenar true cuando se quiera reiniciar y false cuando se quiera llenar. 
   * @param {ModeloCompleto} mc El modelo completo de donde se sacaran los datos. 
   * @returns {*}
   * @memberof ProcesosEnModeloComponent
   */
  reiniciarFormularioModeloCompleto( reiniciarORellenar: boolean, mc: ModeloCompleto ): any{
    return {
      modelo: {value: reiniciarORellenar? '' :  mc.modelo._id, disabled: !reiniciarORellenar},
      tamano: {value: reiniciarORellenar? '' :  mc.tamano._id, disabled: !reiniciarORellenar},
      color: {value: reiniciarORellenar? '' :  mc.color._id, disabled: !reiniciarORellenar},
      terminado: {value: reiniciarORellenar? '' :  mc.terminado._id, disabled: !reiniciarORellenar},
      laserAlmacen: {value: reiniciarORellenar? '' :  mc.laserAlmacen.laser, disabled: !reiniciarORellenar},
      versionModelo: {value: reiniciarORellenar? '' :  mc.versionModelo, disabled: !reiniciarORellenar},
      medias: reiniciarORellenar? '' :  mc.medias,
      familiaDeProcesos: {value: reiniciarORellenar? '' :  mc.familiaDeProcesos._id, disabled: !reiniciarORellenar}
    }
  }

  editarCostosModeloCompleto( mc: ModeloCompleto ) {
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
    this.visorDeCambios.tamano.editandose = new Modelo();
    
    
  }
  nuevoColor(){
    this.visorDeCambios.color.editandose = new Modelo();
    
  }
  nuevoTerminado(){
    this.visorDeCambios.terminado.editandose = new Modelo();

  }




  





}
