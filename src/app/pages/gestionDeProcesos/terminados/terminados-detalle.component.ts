import { Component, OnInit } from '@angular/core';
import { Terminado } from '../../../models/terminado.models';
import { Detalles_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/Detalles_GUI_CRUD';

@Component({
  selector: 'app-terminados-detalle',
  templateUrl: './terminados-detalle.component.html',
  styles: []
})
export class TerminadosDetalleComponent extends Detalles_GUI_CRUD<Terminado> implements OnInit {

  constructor() {
    super()
  }

  ngOnInit() {
  }

}
