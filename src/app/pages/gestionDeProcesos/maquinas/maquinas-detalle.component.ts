import { Component, OnInit, Input } from '@angular/core';
import { Maquina } from 'src/app/models/maquina.model';
import { Detalles_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/Detalles_GUI_CRUD';

@Component({
  selector: 'app-maquinas-detalle',
  templateUrl: './maquinas-detalle.component.html',
  styles: []
})
export class MaquinasDetalleComponent extends Detalles_GUI_CRUD<Maquina> implements OnInit {


  constructor() {
    super();
  }

  ngOnInit() {
  }

}
