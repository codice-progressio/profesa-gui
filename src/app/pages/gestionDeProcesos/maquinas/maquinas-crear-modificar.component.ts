import { Component, OnInit, Input } from '@angular/core';
import { MaquinaService } from 'src/app/services/maquina/maquina.service';
import { MaquinasComponent } from './maquinas.component';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { Maquina } from 'src/app/models/maquina.model';
import { ValidacionesService, DepartamentoService } from 'src/app/services/service.index';
import { Departamento } from 'src/app/models/departamento.models';

@Component({
  selector: 'app-maquinas-crear-modificar',
  templateUrl: './maquinas-crear-modificar.component.html',
  styles: []
})
export class MaquinasCrearModificarComponent implements OnInit {

  /**
   *El componente padre de donde obtenemos algunos valores generales. 
   *
   * @type {MaquinasComponent}
   * @memberof MaquinasCrearModificarComponent
   */
  @Input() maquinasComponent: MaquinasComponent

  /**
   *El formulario para modificar los datos. 
   *
   * @type {FormGroup}
   * @memberof MaquinasCrearModificarComponent
   */
  formulario: FormGroup;

  departamentos: Departamento[] = null;



  constructor(
    public _maquinaService: MaquinaService,
    public formBuilder: FormBuilder,
    public _validacionesService: ValidacionesService,
    public _departamentoService: DepartamentoService,
  ) {
   
  }

  ngOnInit() {
    this._departamentoService.listarTodo = true;
    this._departamentoService.todo().subscribe( departamentos =>{
      this.departamentos = departamentos;
    })

    if( this.maquinasComponent.idModificar ) {
      console.log( 'se modifica')
    }

    this.crearFormulario();

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
      clave: ['', [
        Validators.required
      ]],
      anio: ['', [
        Validators.required,
        Validators.min(1950),
        Validators.max(new Date().getFullYear()+2)
        
      ]],

      departamentos: new FormArray([], this._validacionesService.minSelectedCheckboxes()),

      numeroDeSerie: ['', [
        Validators.required
        
      ]],
      observaciones: ['', [
      ]],

    });
  }

  /**
   *Retorna un nuevo grupo para agregar un id. 
   *
   * @returns {FormGroup}
   * @memberof MaquinasCrearModificarComponent
   */
  agregarDepartamento( ): FormGroup {
    return this.formBuilder.group(
      {
        _id:['',
        ]
      }
     )
  }

public get nombre_FB(): AbstractControl {
  return this.formulario.get('nombre')
}
public get clave_FB(): AbstractControl {
  return this.formulario.get('clave')
}
public get anio_FB(): AbstractControl {
  return this.formulario.get('anio')
}
public get departamentos_FB(): FormArray {
  return <FormArray> this.formulario.get('departamentos')
}
public get observaciones_FB(): AbstractControl {
  return this.formulario.get('observaciones')
}
public get numeroDeSerie_FB(): AbstractControl {
  return this.formulario.get('numeroDeSerie')
}

/**
 *Prepara y envia los datos del formulario. 
 *
 * @param {Maquina} model El modelo que obtendremos desde el formulario
 * @param {boolean} isValid Comprueba si el formulario es valido. 
 * @param {*} e El evento por default para prevenir el default.
 * @memberof MaquinasCrearModificarComponent
 */
onSubmit(model:Maquina, isValid: boolean, e ){
  e.preventDefault();
  console.log('Enviar')

  if( !isValid ) return false;

  console.log('se envia')
}


  /**
   *Cancela la modificacion o el guardado.\
   *
   * @memberof MaquinasCrearModificarComponent
   */
  cancelar(){
    this.maquinasComponent.animar();
    this.limpiar();
  }

  /**
   *Limpia los datos despues de cancelar, guardar o modifcar. 
   *
   * @memberof MaquinasCrearModificarComponent
   */
  limpiar(){
    console.log( 'todavia no modificar')
  };


  /**
   *Comprueba si el id que se le pase como paramentro esta agregado. (Osea que 
    se encuentra dentro del arreglo de id del formulario.)
   *
   * @param {string} id El id que se va a comprobar. 
   * @returns {boolean} El resultado de la comparacion. 
   * @memberof MaquinasCrearModificarComponent
   */
  estaAgregado( id:string ): boolean {

    let a =  this.departamentos_FB.controls.filter( (d)=>{
      return d.value._id.toString() === id;
    } )
    return a.length >0;


  }

  /**
   *Agrega un nuevo valor id al arreglo del forumlario de departamentos. 
   *
   * @param {string} id
   * @memberof MaquinasCrearModificarComponent
   */
  agregarQuitarId ( id: string, select ) {
    
    let checked: boolean = select.srcElement.checked;
    if( checked ) {
        if( !this.estaAgregado( id ) ){
          let a: FormGroup =  this.agregarDepartamento();

          a.controls['_id'].setValue( id );
          this.departamentos_FB.push( a )
        }
    } else{
      this.eliminarDepartamento( id ) 
    }
  }

  /**
   * Elimina un departamento. Es importante senalar que si borramos el 
   * departamento filtrando con el get (departamentos_FB.controls.filter) 
   * las validaciones no se disparan. 
   * Tenemos que buscar el array desde this.formulario.controns['departamentos]
   * para luego usar removeAt(i). El i lo encontramos recorriendo this.departamentos_FB.
   *
   * @param {string} id
   * @returns
   * @memberof MaquinasCrearModificarComponent
   */
  eliminarDepartamento( id: string ){
    /**
     * El arreglo de donde vamos a eliminar los datos para que se pueda 
     * disparar la validacion. 
     */
    const arrayControl = <FormArray> this.formulario.controls['departamentos'];
    // Obtenemos el id buscando y comparando a lo rudo por que nos interesa su
    // indice. 
    for (let i = 0; i < this.departamentos_FB.controls.length; i++) {
      const control = this.departamentos_FB.controls[i];
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
