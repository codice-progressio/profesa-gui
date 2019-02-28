import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color.models';
import { Detalles_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/Detalles_GUI_CRUD';

@Component({
  selector: 'app-colores-detalle',
  templateUrl: './colores-detalle.component.html',
  styles: []
})
export class ColoresDetalleComponent extends Detalles_GUI_CRUD<Color> implements OnInit {

  constructor() {
    super()
  }

  ngOnInit() {
  }

}
