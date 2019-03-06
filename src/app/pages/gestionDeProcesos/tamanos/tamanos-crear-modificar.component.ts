import { Component, OnInit } from '@angular/core';
import { TamanoService } from '../../../services/modelo/tamano.service';
import { CrearModificar_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/CrearModificar_GUI_CRUD';
import { Tamano } from 'src/app/models/tamano.models';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ValidacionesService } from 'src/app/services/service.index';

@Component({
  selector: 'app-tamanos-crear-modificar',
  templateUrl: './tamanos-crear-modificar.component.html',
  styles: []
})
export class TamanosCrearModificarComponent  extends CrearModificar_GUI_CRUD<Tamano, TamanoService > implements OnInit {

  constructor(
    public _elementoService: TamanoService,
    public formBuilder: FormBuilder,
    public _validacionesService: ValidacionesService,) { 
      super( _elementoService,
        formBuilder,
        _validacionesService)
      
      this.cbDatosParaEditar = (tamano: Tamano)=>{
        this.cargarDatosParaEditar( tamano )
      } 
  
      this.cbCrearFormulario = ()=>{
        this.crearFormulario()
      }
  
      this.configurar();
  
    }

  ngOnInit() {
  }

  cargarDatosParaEditar( tamano: Tamano) {
    this.tamano_FB.setValue( tamano.tamano )
    this.estandar_FB.setValue( tamano.estandar )
  }

  /**
   *Crea el formulario de registro. 
   *
   * @memberof MaquinasCrearModificarComponent
   */
  crearFormulario( ){
    this.formulario = this.formBuilder.group({
      tamano: ['', [
        Validators.required
      ]],
      estandar: ['', [
        Validators.required,
        this._validacionesService.onlyIntegers,
        Validators.min(1)
      ]],

    });
  }

  public get tamano_FB(): AbstractControl {
    return this.formulario.get('tamano')
  }
  public get estandar_FB(): AbstractControl {
    return this.formulario.get('estandar')
  }


}
