import { Component, OnInit } from '@angular/core';
import { Terminado } from '../../../models/terminado.models';
import { CrearModificar_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/CrearModificar_GUI_CRUD';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { TerminadoService } from 'src/app/services/modelo/terminado.service';
import { ValidacionesService } from 'src/app/services/utilidades/validaciones.service';

@Component({
  selector: 'app-terminados-crear-modificar',
  templateUrl: './terminados-crear-modificar.component.html',
  styles: []
})
export class TerminadosCrearModificarComponent  extends CrearModificar_GUI_CRUD<Terminado, TerminadoService > implements OnInit {

  constructor(
    public _elementoService: TerminadoService,
    public formBuilder: FormBuilder,
    public _validacionesService: ValidacionesService,) { 
      super( _elementoService,
        formBuilder,
        _validacionesService)
      
      this.cbDatosParaEditar = (terminado: Terminado )=>{
        this.cargarDatosParaEditar( terminado )
      } 
  
      this.cbCrearFormulario = ()=>{
        this.crearFormulario()
      }
  
      this.configurar();
  
    }

  ngOnInit() {
  }

  cargarDatosParaEditar( terminado: Terminado){
    this.terminado_FB.setValue( terminado.terminado )
  }

  /**
   *Crea el formulario de registro. 
   *
   * @memberof MaquinasCrearModificarComponent
   */
  crearFormulario( ){
    this.formulario = this.formBuilder.group({
      terminado: ['', [
        Validators.required
      ]],

    });
  }

  public get terminado_FB(): AbstractControl {
    return this.formulario.get('terminado')
  }


}
