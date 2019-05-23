import { Component, OnInit } from '@angular/core';
import { Detalles_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/Detalles_GUI_CRUD';
import { Tamano } from 'src/app/models/tamano.models';

@Component({
  selector: 'app-tamanos-detalle',
  templateUrl: './tamanos-detalle.component.html',
  styles: []
})
export class TamanosDetalleComponent extends Detalles_GUI_CRUD<Tamano> implements OnInit {

  constructor() {
    super()
  }

  ngOnInit() {
  }

}
