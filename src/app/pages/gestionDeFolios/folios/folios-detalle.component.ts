import { Component, OnInit } from '@angular/core';
import { Detalles_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/Detalles_GUI_CRUD';
import { Folio } from 'src/app/models/folio.models';
import { ColoresTenidos } from '../../../models/ColoresTenidos';

@Component({
  selector: 'app-folios-detalle',
  templateUrl: './folios-detalle.component.html',
  styles: []
})
export class FoliosDetalleComponent extends Detalles_GUI_CRUD<Folio> implements OnInit {

  constructor() { super()}

  ngOnInit() {
  }


  sumarTenidos( col: ColoresTenidos [] ): number {
    let total = 0
    col.map((c)=>{
      total+= c.cantidad
    } )
    return total
  }

}
