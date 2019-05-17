import { Component, OnInit } from '@angular/core';
import { ModeloService } from '../../../services/modelo/modelo.service';
import { CrearModificar_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/CrearModificar_GUI_CRUD';
import { Modelo } from 'src/app/models/modelo.models';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ValidacionesService } from 'src/app/services/utilidades/validaciones.service';

@Component({
  selector: 'app-modelos-crear-modificar',
  templateUrl: './modelos-crear-modificar.component.html',
  styles: []
})
export class ModelosCrearModificarComponent extends CrearModificar_GUI_CRUD<Modelo, ModeloService > implements OnInit {

  constructor(
    public _elementoService: ModeloService,
    public formBuilder: FormBuilder,
    public _validacionesService: ValidacionesService,) { 
      super( _elementoService,
        formBuilder,
        _validacionesService)
      
      this.cbDatosParaEditar = (modelo: Modelo )=>{
        this.cargarDatosParaEditar( modelo )
      } 
  
      this.cbCrearFormulario = ()=>{
        this.crearFormulario()
      }
  
      this.configurar();
  
    }

  ngOnInit() {
  }

  cargarDatosParaEditar( modelo: Modelo){
    this.modelo_FB.setValue( modelo.modelo )
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

    });
  }

  public get modelo_FB(): AbstractControl {
    return this.formulario.get('modelo')
  }


}