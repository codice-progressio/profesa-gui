import { Component, OnInit } from '@angular/core';
import { Detalles_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/Detalles_GUI_CRUD';
import { Modelo } from 'src/app/models/modelo.models';

@Component({
  selector: 'app-modelos-detalle',
  templateUrl: './modelos-detalle.component.html',
  styles: []
})
export class ModelosDetalleComponent extends Detalles_GUI_CRUD<Modelo> implements OnInit {

  constructor() {
    super()
  }

  ngOnInit() {
  }

}
