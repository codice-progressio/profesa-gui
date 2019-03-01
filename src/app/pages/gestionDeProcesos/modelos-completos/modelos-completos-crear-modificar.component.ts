import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModeloCompletoService } from '../../../services/modelo/modelo-completo.service';
import { ModeloCompleto } from '../../../models/modeloCompleto.modelo';
import { FamiliaDeProcesos } from '../../../models/familiaDeProcesos.model';
import { Proceso } from 'src/app/models/proceso.model';
import { CrearModificar_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/CrearModificar_GUI_CRUD';
import { FormBuilder, Validators, FormArray, AbstractControl, FormGroup } from '@angular/forms';
import { ValidacionesService, DepartamentoService, MaquinaService } from 'src/app/services/service.index';
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
  ) {
    super( _elementoService,
      formBuilder,
      _validacionesService)
    
    this.cbDatosParaEditar = (elemento: ModeloCompleto )=>{
      this.cargarDatosParaEditar( elemento )
    } 

    this.cbCrearFormulario = ()=>{
      this.crearFormulario()
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

  cargarDatosParaEditar( proceso: ModeloCompleto){
    this.nombre_FB.setValue( proceso.nombre )
    this.departamento_FB.setValue( proceso.departamento._id )

    this.requiereProduccion_FB.setValue( proceso.requiereProduccion )

    proceso.maquinas.forEach(d => {
      this.agregarMaquina(d._id)
    });


    this.observaciones_FB.setValue( proceso.observaciones )
  }


  /**
   *Crea el formulario de registro. 
   *
   * @memberof MaquinasCrearModificarComponent
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
      laserAlmacen: ['', [
      ]],
      versionModelo: ['', [
      ]],
      familiaDeProcesos: ['', [
        Validators.required
      ]],

      procesosEspeciales: new FormArray([], this._validacionesService.minSelectedCheckboxes()),
      
           
      medias: [false, [
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





  // /**
  //  *Crea y agrega un nuevo formGroup al control departamentos_FB
  //  *
  //  * @param {string} id El id del departamento que se va a gregar. 
  //  * @memberof MaquinasCrearModificarComponent
  //  */
  // agregarMaquina( id: string ){
  //   let a: FormGroup =  this.crearNuevoFormGroupMaquina();
  //   a.controls['_id'].setValue( id );
  //   this.maquinas_FB.push( a )
  // }
  



  // /**
  //  *Retorna un nuevo grupo para agregar un id. 
  //  *
  //  * @returns {FormGroup}
  //  * @memberof MaquinasCrearModificarComponent
  //  */
  // crearNuevoFormGroupMaquina( ): FormGroup {
  //   return this.formBuilder.group(
  //     {
  //       _id:['',
  //       ]
  //     }
  //    )
  // }

  //  /**
  //  *Comprueba si el id que se le pase como paramentro esta agregado. (Osea que 
  //   se encuentra dentro del arreglo de id del formulario.)
  //  *
  //  * @param {string} id El id que se va a comprobar. 
  //  * @returns {boolean} El resultado de la comparacion. 
  //  * @memberof MaquinasCrearModificarComponent
  //  */
  // estaAgregado( id:string ): boolean {
  //   let a =  this.maquinas_FB.controls.filter( (d)=>{
  //     return d.value._id === id;
  //   } )
  //   return a.length >0;
  // }

  // /**
  //  *Agrega un nuevo valor id al arreglo del forumlario de departamentos. 
  //  *
  //  * @param {string} id El id del elemento. 
  //  * @param {*} select El checkbox. 
  //  * @memberof ProcesosCrearModificarComponent
  //  */
  // agregarQuitarId ( id: string, select ) {
    
  //   let checked: boolean = select.srcElement.checked;
  //   if( checked ) {
  //       if( !this.estaAgregado( id ) ){
  //        this.agregarMaquina( id )
  //       }
  //   } else{
  //     this.eliminarMaquina( id ) 
  //   }
  // }

  // /**
  //  * Elimina una maquina. Es importante senalar que si borramos la 
  //  * maquina filtrando con el get (maquinas_FB.controls.filter) 
  //  * las validaciones no se disparan. 
  //  * Tenemos que buscar el array desde this.formulario.controns['maquinas']
  //  * para luego usar removeAt(i). El i lo encontramos recorriendo this.maquinas_FB.
  //  *
  //  * @param {string} id
  //  * @returns
  //  * @memberof ProcesosCrearModificarComponent
  //  */
  // eliminarMaquina( id: string ){
  //   /**
  //    * El arreglo de donde vamos a eliminar los datos para que se pueda 
  //    * disparar la validacion. 
  //    */
  //   const arrayControl = <FormArray> this.formulario.controls['maquinas'];
  //   // Obtenemos el id buscando y comparando a lo rudo por que nos interesa su
  //   // indice. 
  //   for (let i = 0; i < this.maquinas_FB.controls.length; i++) {
  //     const control = this.maquinas_FB.controls[i];
  //     // Comparamos si es el id que nos interesa. 
  //     if( control.value._id === id ){
  //       // Eliminamos
  //       arrayControl.removeAt(i);
  //       // No necesitamos hacer nada mas. 
  //       return;
  //     }
  //   }
  // }

   

}