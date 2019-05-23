import { Component, OnInit } from '@angular/core';
import { CrearModificar_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/CrearModificar_GUI_CRUD';
import { Maquina } from 'src/app/models/maquina.model';
import { Proceso } from 'src/app/models/proceso.model';
import { ProcesoService } from '../../../services/proceso/proceso.service';
import { FormBuilder, Validators, FormArray, FormGroup, AbstractControl } from '@angular/forms';
import { Departamento } from '../../../models/departamento.models';
import { ValidacionesService } from 'src/app/services/utilidades/validaciones.service';
import { DepartamentoService } from 'src/app/services/departamento/departamento.service';
import { MaquinaService } from 'src/app/services/maquina/maquina.service';

@Component({
  selector: 'app-procesos-crear-modificar',
  templateUrl: './procesos-crear-modificar.component.html',
  styles: []
})
export class ProcesosCrearModificarComponent extends  CrearModificar_GUI_CRUD<Proceso, ProcesoService > implements OnInit {

  departamentos: Departamento [];
  maquinas: Maquina[]

  constructor(
    public _elementoService: ProcesoService,
    public formBuilder: FormBuilder,
    public _validacionesService: ValidacionesService,
    public _departamentoService: DepartamentoService,
    public _maquinasService: MaquinaService
  ) {
    super( _elementoService,
      formBuilder,
      _validacionesService)
    
    this.cbDatosParaEditar = (elemento: Proceso )=>{
      this.cargarDatosParaEditar( elemento )
    } 

    this.cbCrearFormulario = ()=>{
      this.crearFormulario()
    }

    this.configurar();

  }
  

  ngOnInit() {
    this.cargarDepartamentos()
    this.cargarMaquinas()
  }

  cargarDepartamentos( ) {
    this._departamentoService.listarTodo = true;
    this._departamentoService.todo().subscribe( departamentos =>{
      this.departamentos = departamentos;
    })
  }

  cargarMaquinas( ) {
    this._maquinasService.listarTodo = true;
    this._maquinasService.todo().subscribe( maquinas =>{
      this.maquinas = maquinas;
    })
  }

  cargarDatosParaEditar( proceso: Proceso){
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
      nombre: ['', [
        Validators.required
      ]],
      requiereProduccion: [false, [
      ]],
     
      departamento: ['', [
        Validators.required
      ]],
      maquinas: new FormArray([], this._validacionesService.minSelectedCheckboxes()),

     
      observaciones: ['', [
      ]],

    });
  }


  public get nombre_FB(): AbstractControl {
    return this.formulario.get('nombre')
  }
  public get requiereProduccion_FB(): AbstractControl {
    return this.formulario.get('requiereProduccion')
  }
  public get departamento_FB(): AbstractControl {
    return this.formulario.get('departamento')
  }
  public get observaciones_FB(): AbstractControl {
    return this.formulario.get('observaciones')
  }

  public get maquinas_FB(): FormArray {
    return <FormArray> this.formulario.get('maquinas')
  }




  /**
   *Crea y agrega un nuevo formGroup al control departamentos_FB
   *
   * @param {string} id El id del departamento que se va a gregar. 
   * @memberof MaquinasCrearModificarComponent
   */
  agregarMaquina( id: string ){
    let a: FormGroup =  this.crearNuevoFormGroupMaquina();
    a.controls['_id'].setValue( id );
    this.maquinas_FB.push( a )
  }
  



  /**
   *Retorna un nuevo grupo para agregar un id. 
   *
   * @returns {FormGroup}
   * @memberof MaquinasCrearModificarComponent
   */
  crearNuevoFormGroupMaquina( ): FormGroup {
    return this.formBuilder.group(
      {
        _id:['',
        ]
      }
     )
  }

   /**
   *Comprueba si el id que se le pase como paramentro esta agregado. (Osea que 
    se encuentra dentro del arreglo de id del formulario.)
   *
   * @param {string} id El id que se va a comprobar. 
   * @returns {boolean} El resultado de la comparacion. 
   * @memberof MaquinasCrearModificarComponent
   */
  estaAgregado( id:string ): boolean {
    let a =  this.maquinas_FB.controls.filter( (d)=>{
      return d.value._id === id;
    } )
    return a.length >0;
  }

  /**
   *Agrega un nuevo valor id al arreglo del forumlario de departamentos. 
   *
   * @param {string} id El id del elemento. 
   * @param {*} select El checkbox. 
   * @memberof ProcesosCrearModificarComponent
   */
  agregarQuitarId ( id: string, select ) {
    
    let checked: boolean = select.srcElement.checked;
    if( checked ) {
        if( !this.estaAgregado( id ) ){
         this.agregarMaquina( id )
        }
    } else{
      this.eliminarMaquina( id ) 
    }
  }

  /**
   * Elimina una maquina. Es importante senalar que si borramos la 
   * maquina filtrando con el get (maquinas_FB.controls.filter) 
   * las validaciones no se disparan. 
   * Tenemos que buscar el array desde this.formulario.controns['maquinas']
   * para luego usar removeAt(i). El i lo encontramos recorriendo this.maquinas_FB.
   *
   * @param {string} id
   * @returns
   * @memberof ProcesosCrearModificarComponent
   */
  eliminarMaquina( id: string ){
    /**
     * El arreglo de donde vamos a eliminar los datos para que se pueda 
     * disparar la validacion. 
     */
    const arrayControl = <FormArray> this.formulario.controls['maquinas'];
    // Obtenemos el id buscando y comparando a lo rudo por que nos interesa su
    // indice. 
    for (let i = 0; i < this.maquinas_FB.controls.length; i++) {
      const control = this.maquinas_FB.controls[i];
      // Comparamos si es el id que nos interesa. 
      if( control.value._id === id ){
        // Eliminamos
        arrayControl.removeAt(i);
        // No necesitamos hacer nada mas. 
        return;
      }
    }
  }

   

}
