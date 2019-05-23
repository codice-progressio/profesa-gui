import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModeloCompletoService } from '../../../services/modelo/modelo-completo.service';
import { ModeloCompleto } from '../../../models/modeloCompleto.modelo';
import { FamiliaDeProcesos } from '../../../models/familiaDeProcesos.model';
import { Proceso } from 'src/app/models/proceso.model';
import { CrearModificar_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/CrearModificar_GUI_CRUD';
import { FormBuilder, Validators, FormArray, AbstractControl, FormGroup } from '@angular/forms';
import { ProcesoService } from '../../../services/proceso/proceso.service';
import { FamiliaDeProcesosService } from '../../../services/proceso/familia-de-procesos.service';
import { ModeloService } from '../../../services/modelo/modelo.service';
import { TamanoService } from '../../../services/modelo/tamano.service';
import { ColorService } from '../../../services/modelo/color.service';
import { TerminadoService } from '../../../services/modelo/terminado.service';
import { Color } from '../../../models/color.models';
import { Terminado } from '../../../models/terminado.models';
import { Modelo } from 'src/app/models/modelo.models';
import { Tamano } from 'src/app/models/tamano.models';
import { OrganizadorDragAndDropService } from '../../../components/organizador-drag-and-drop/organizador-drag-and-drop.service';
import { DndObject } from 'src/app/components/organizador-drag-and-drop/models/dndObject.model';
import { Procesos } from 'src/app/models/procesos.model';
import { ValidacionesService } from 'src/app/services/utilidades/validaciones.service';

@Component({
  selector: 'app-modelos-completos-crear-modificar',
  templateUrl: './modelos-completos-crear-modificar.component.html',
  styles: []
})
export class ModelosCompletosCrearModificarComponent extends  CrearModificar_GUI_CRUD<ModeloCompleto, ModeloCompletoService > implements OnInit {

  familias: FamiliaDeProcesos[]
  procesos: Proceso[]
  modelos: Modelo[]
  tamanos: Tamano[]
  colores: Color[]
  terminados: Terminado[]


  constructor(
    public _elementoService: ModeloCompletoService,
    public formBuilder: FormBuilder,
    public _validacionesService: ValidacionesService,
    public _procesosService: ProcesoService,
    public _familiaService: FamiliaDeProcesosService,
    public _procesoService: ProcesoService,
    public _modeloService: ModeloService,
    public _tamanoService: TamanoService,
    public _colorService: ColorService,
    public _terminadoService: TerminadoService,
    public _dndService: OrganizadorDragAndDropService<Proceso>
  ) {
    super( _elementoService,
      formBuilder,
      _validacionesService)
    
    this.cbDatosParaEditar = (elemento: ModeloCompleto )=>{
      this.cargarDatosParaEditar( elemento )
      this.cargarProcesos()
    } 

    this.cbCrearFormulario = ()=>{

      this.crearFormulario()
      this.limpiarModelo()
    }

    this.configurar();

  }
  

  ngOnInit() {
    this.cargarProcesos()
    this.cargarFamilias()
    this.cargarLoDemas()
  }


  cargarFamilias( ) {
    this._familiaService.listarTodo = true;
    this._familiaService.todo().subscribe( familias =>{
      this.familias = familias;
    })
  }
  cargarProcesos( ) {
    this._procesoService.listarTodo = true;
    this._procesoService.todo().subscribe( elemento =>{
      this.procesos = elemento;
    })
  }

  cargarLoDemas() {

    this._tamanoService.listarTodo = true
    this._tamanoService.todo().subscribe( (elementos)=>{
      this.tamanos = elementos
    }  )
    this._colorService.listarTodo = true
    this._colorService.todo().subscribe( (elementos)=>{
      this.colores = elementos
    }  )
    this._terminadoService.listarTodo = true
    this._terminadoService.todo().subscribe( (elementos)=>{
      this.terminados = elementos
    }  )

  }

  cargarDatosParaEditar( modeloCompleto: ModeloCompleto){
    
    this.modelo_FB.setValue(modeloCompleto.modelo._id)
    this.setearModelo( modeloCompleto.modelo)
    this.tamano_FB.setValue(modeloCompleto.tamano._id)
    this.color_FB.setValue(modeloCompleto.color._id)
    this.terminado_FB.setValue(modeloCompleto.terminado._id)
    this.laserAlmacen_FB.get('laser').setValue(modeloCompleto.laserAlmacen.laser)
    this.versionModelo_FB.setValue(modeloCompleto.versionModelo)
    this.medias_FB.setValue(modeloCompleto.medias)
    this.esBaston_FB.setValue(modeloCompleto.esBaston)
    this.familiaDeProcesos_FB.setValue(modeloCompleto.familiaDeProcesos._id)
    this.cargarProcesos()
    this.crearListasdnd( modeloCompleto.familiaDeProcesos)

    this.cargarDatosDeFamilia(modeloCompleto)
    

     


  }


  /**
   *Crea el formulario de registro. 
   *
   * @memberof ModelosCompletosCrearModificarComponent

   */
  crearFormulario( ){
    this.formulario = this.formBuilder.group({
      modelo: ['', [
        Validators.required
      ]],
      tamano: ['', [
        Validators.required
      ]],
      color: ['', [
        Validators.required
      ]],
      terminado: ['', [
        Validators.required
      ]],
      laserAlmacen: this.formBuilder.group({
        laser:['', []]
      }),
      versionModelo: ['', [
      ]],
      familiaDeProcesos: ['', [
        Validators.required
      ]],

      procesosEspeciales: new FormArray([] ),
      
           
      medias: [false, [
      ]],
      esBaston: [false, [
      ]],



    });
  }


  public get modelo_FB(): AbstractControl {
    return this.formulario.get('modelo')
  }
  public get tamano_FB(): AbstractControl {
    return this.formulario.get('tamano')
  }
  public get color_FB(): AbstractControl {
    return this.formulario.get('color')
  }
  public get terminado_FB(): AbstractControl {
    return this.formulario.get('terminado')
  }
  public get laserAlmacen_FB(): AbstractControl {
    return this.formulario.get('laserAlmacen')
  }
  public get versionModelo_FB(): AbstractControl {
    return this.formulario.get('versionModelo')
  }
  public get medias_FB(): AbstractControl {
    return this.formulario.get('medias')
  }
  public get esBaston_FB(): AbstractControl {
    return this.formulario.get('esBaston')
  }
  public get familiaDeProcesos_FB(): AbstractControl {
    return this.formulario.get('familiaDeProcesos')
  }


  public get procesosEspeciales_FB(): FormArray {
    return <FormArray> this.formulario.get('procesosEspeciales')
  }

  


  buscar( termino: string ){
    if( termino!== '' ){
      this.limpiarModelo()
      this._modeloService.listarTodo = true;
      this._modeloService.buscar( termino ).subscribe( (modelos)=>{
        this.modelos = modelos;
      } )
    }else{
      this.limpiarModelo()
    }

  }

  /**
   *El modelo que se selecciona desde la lista. 
   *
   * @type {Modelo}
   * @memberof ModelosCompletosCrearModificarComponent

   */
  modelo: Modelo = null;


  setearModelo( modelo: Modelo ) {
    this.modelo_FB.setValue( modelo._id )
    this.modelo = modelo;
    this.modelos = []
    this.esconderBuscador = true;

  }

  limpiarModelo( ){
    this.modelo = null
    this.modelo_FB.setValue('')
    this.modelos = []
    this.esconderBuscador = false;


  }

  /**
   *Esconde el input de busqueda. 
   *
   * @type {string}
   * @memberof ModelosCompletosCrearModificarComponent

   */
  esconderBuscador: boolean = false;

  @ViewChild('inputBusqueda') inputBusqueda: ElementRef

  reiniciarBusqueda( ){
    this.esconderBuscador = false;
    this.inputBusqueda.nativeElement.focus();
    this.inputBusqueda.nativeElement.value = this.modelo.modelo;
    this.modelo = null;
    
  }


cargarDatosDeFamilia( modeloCompleto: ModeloCompleto = null ) {
  this._dndService.limpiar();
  this._dndService.limpiarListaDeElementos();

  console.log( 'cargando datos ')
    this.procesos.forEach(proceso => {
      let dnd: DndObject<Proceso> = new DndObject();
      dnd.setEliminable(true);
      dnd.setLeyenda(proceso.nombre);
      dnd.setLeyendaOptativa(proceso.departamento.nombre);
      dnd.setObjeto(proceso);
      this._dndService.listaDeElementos.push(dnd);
  } )

  this._familiaService.buscarPorId( this.familiaDeProcesos_FB.value )
  .subscribe((familia)=>{
    this.crearListasdnd(familia)
   
    this.cargarProcesosEspecialesDeEdicion( modeloCompleto );

  } )

}

/**
 *Carga los proceos especiales para editarse a sus respectivos
 padres despues de que la familia se termina de cargar. 
 *
 * @param {ModeloCompleto} modeloCompleto
 * @memberof ModelosCompletosCrearModificarComponent
 */
cargarProcesosEspecialesDeEdicion( modeloCompleto: ModeloCompleto ){
  if( modeloCompleto ){
     
    modeloCompleto.procesosEspeciales.forEach((procesos: Procesos) => {
      this._dndService
      .obtenerObjetoPadre(procesos.orden.toString().split('.')[0])
      .hijos
        .addOrdenable()
          .setEliminable( true )
          .setLeyenda( procesos.proceso.nombre )
          .setLeyendaOptativa( procesos.proceso.departamento.nombre )
          .setObjeto( procesos.proceso )
          .setOrden(procesos.orden)

    });
  }
}

crearListasdnd(familia: FamiliaDeProcesos = null) {

  this._dndService.leyendaListaSeleccionable =
  "Arrastra procesos de la lista para agregarlos.";
  familia.procesos.forEach(procesos => {
    let keyArea = procesos.orden.toString().split('.')[0]
    let dndOBjecto: DndObject<Proceso> = this._dndService
      .nuevaArea(keyArea)
      .setPadre()
        .setEliminable(false)
        .setLeyenda(procesos.proceso.nombre + ' '+ keyArea) 
        .setLeyendaOptativa(procesos.proceso.departamento.nombre)
        .setOrden(procesos.orden)
        .setObjeto(procesos.proceso);
    });
    this._dndService.actualizarPropiedadOrden();
    // this.actualizarIds(true);
  }

   /**
   *Crea y agrega un nuevo formGroup al control departamentos_FB
   *
   * @param {string} id El id del departamento que se va a gregar.
   * @memberof ModelosCompletosCrearModificarComponent

   */
  agregarElemento(orden: string, proceso: Proceso, procesoPadre: Proceso) {
    let a: FormGroup = this.crearNuevoFormGroupElemento();
    a.controls["orden"].setValue(orden);
    a.controls["proceso"].setValue(proceso);
    a.controls["procesoPadre"].setValue(procesoPadre);
    this.procesosEspeciales_FB.push(a);
  }

  /**
   *Retorna un nuevo grupo para agregar un id.
   *
   * @returns {FormGroup}
   * @memberof ModelosCompletosCrearModificarComponent

   */
  crearNuevoFormGroupElemento(): FormGroup {
    return this.formBuilder.group({
      orden: [""],
      proceso: [""],
      procesoPadre: [""],
    });
  }



  ejecutarActualizadonIds: boolean = true;
   /**
   *Actualiza la lista de objetos id. Se ejecuta con el emiter.
   *
   * @memberof ModelosCompletosCrearModificarComponent

   */
  actualizarIds() {
    if (this.ejecutarActualizadonIds) {
      this.ejecutarActualizadonIds = false;
      setTimeout(() => {
        this.clearFormArray(this.procesosEspeciales_FB);
        console.log('actualizando ids')
        this._dndService.obtenerHijosOrdenables().forEach(dndProceso => {
          this.agregarElemento(dndProceso.orden, dndProceso.objeto, dndProceso.objetoPadre);
        });
        this.ejecutarActualizadonIds = true ;

      }, 400);
    }
  }

   /**
   *Elimina los elementos dentro del formArray de manera
   recursiva. No se puede hacer de otra manera sin que pierda
   la relacion. 
   *
   * @memberof FamiliaDeProcesosCrearModificarComponent
   */
  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  };


  
}