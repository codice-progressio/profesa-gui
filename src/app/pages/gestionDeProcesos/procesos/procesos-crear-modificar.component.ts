import { Component, OnInit } from '@angular/core';
import { CrearModificar_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/CrearModificar_GUI_CRUD';
import { Maquina } from 'src/app/models/maquina.model';
import { Proceso } from 'src/app/models/proceso.model';
import { ProcesoService } from '../../../services/proceso/proceso.service';
import { FormBuilder } from '@angular/forms';
import { ValidacionesService, DepartamentoService } from 'src/app/services/service.index';

@Component({
  selector: 'app-procesos-crear-modificar',
  templateUrl: './procesos-crear-modificar.component.html',
  styles: []
})
export class ProcesosCrearModificarComponent extends  CrearModificar_GUI_CRUD<Proceso, ProcesoService > implements OnInit {

  constructor(
    public _elementoService: ProcesoService,
    public formBuilder: FormBuilder,
    public _validacionesService: ValidacionesService,
    public _departamentoService: DepartamentoService,
  ) {
    super( _elementoService,
      formBuilder,
      _validacionesService)
    
    this.cbDatosParaEditar = (maquina: Proceso )=>{
      // this.cargarDatosParaEditar( maquina )
    } 

    this.cbCrearFormulario = ()=>{
      // this.crearFormulario()
    }

    this.configurar();

  }
  

  ngOnInit() {
  }

}
