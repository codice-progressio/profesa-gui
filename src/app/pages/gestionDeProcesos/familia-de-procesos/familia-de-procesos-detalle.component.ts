import { Component, OnInit } from '@angular/core';
import { FamiliaDeProcesos } from '../../../models/familiaDeProcesos.model';
import { Detalles_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/Detalles_GUI_CRUD';

@Component({
  selector: 'app-familia-de-procesos-detalle',
  templateUrl: './familia-de-procesos-detalle.component.html',
  styles: []
})
export class FamiliaDeProcesosDetalleComponent  extends Detalles_GUI_CRUD<FamiliaDeProcesos> implements OnInit {


  constructor() {
    super();
  }

  ngOnInit() {
  }

}
