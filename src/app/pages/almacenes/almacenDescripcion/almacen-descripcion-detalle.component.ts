import { Component, OnInit, Input } from '@angular/core'
import { AlmacenDescripcion } from '../../../models/almacenDeMateriaPrimaYHerramientas/almacen-descripcion.model'

@Component({
  selector: 'app-almacen-descripcion-detalle',
  templateUrl: './almacen-descripcion-detalle.component.html',
  styles: []
})
export class AlmacenDescripcionDetalleComponent implements OnInit {

  @Input() detalle: AlmacenDescripcion
  
  constructor() { }

  ngOnInit() {
  }

}
