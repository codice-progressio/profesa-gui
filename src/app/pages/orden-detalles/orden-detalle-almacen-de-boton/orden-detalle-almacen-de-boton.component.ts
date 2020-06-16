import { Component, OnInit, Input } from '@angular/core';
import { Trayecto } from '../../../models/trayecto.models'

@Component({
  selector: 'app-orden-detalle-almacen-de-boton',
  templateUrl: './orden-detalle-almacen-de-boton.component.html',
  styleUrls: ['./orden-detalle-almacen-de-boton.component.css']
})
export class OrdenDetalleAlmacenDeBotonComponent implements OnInit {
  
  @Input() trayecto: Trayecto = null

  
  constructor() { }

  ngOnInit(): void {
  }

}
