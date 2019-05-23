import { Component, OnInit } from '@angular/core';
import { Detalles_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/Detalles_GUI_CRUD';
import { Proceso } from 'src/app/models/proceso.model';

@Component({
  selector: 'app-procesos-detalle',
  templateUrl: './procesos-detalle.component.html',
  styles: []
})
export class ProcesosDetalleComponent extends Detalles_GUI_CRUD<Proceso> implements OnInit {

  constructor() {
    super()
   }

  ngOnInit() {
  }

}
