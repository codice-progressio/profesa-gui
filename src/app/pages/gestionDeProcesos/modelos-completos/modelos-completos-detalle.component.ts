import { Component, OnInit } from '@angular/core';
import { Detalles_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/Detalles_GUI_CRUD';
import { ModeloCompleto } from 'src/app/models/modeloCompleto.modelo';

@Component({
  selector: 'app-modelos-completos-detalle',
  templateUrl: './modelos-completos-detalle.component.html',
  styles: []
})
export class ModelosCompletosDetalleComponent extends Detalles_GUI_CRUD<ModeloCompleto> implements OnInit {

  constructor() {
    super()
  }

  ngOnInit() {
  }

}
