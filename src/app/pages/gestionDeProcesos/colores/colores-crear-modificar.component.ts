import { Component, OnInit } from '@angular/core';
import { CrearModificar_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/CrearModificar_GUI_CRUD';
import { Color } from 'src/app/models/color.models';
import { ColorService, ValidacionesService } from 'src/app/services/service.index';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-colores-crear-modificar',
  templateUrl: './colores-crear-modificar.component.html',
  styles: []
})
export class ColoresCrearModificarComponent extends CrearModificar_GUI_CRUD<Color, ColorService > implements OnInit {

  constructor(
    public _elementoService: ColorService,
    public formBuilder: FormBuilder,
    public _validacionesService: ValidacionesService,) { 
      super( _elementoService,
        formBuilder,
        _validacionesService)
      
      this.cbDatosParaEditar = (color: Color )=>{
        this.cargarDatosParaEditar( color )
      } 
  
      this.cbCrearFormulario = ()=>{
        this.crearFormulario()
      }
  
      this.configurar();
  
    }

  ngOnInit() {
  }

  cargarDatosParaEditar( color: Color){
    this.color_FB.setValue( color.color )
  }

  /**
   *Crea el formulario de registro. 
   *
   * @memberof MaquinasCrearModificarComponent
   */
  crearFormulario( ){
    this.formulario = this.formBuilder.group({
      color: ['', [
        Validators.required
      ]],

    });
  }

  public get color_FB(): AbstractControl {
    return this.formulario.get('color')
  }


}
