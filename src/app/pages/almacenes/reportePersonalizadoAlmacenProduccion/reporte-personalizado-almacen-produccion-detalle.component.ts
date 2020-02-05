import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { ReportePersonalizadoAlmacenProduccion } from '../../../models/reportePersonalizadoAlmacenProduccion/reportePersonalizadoAlmacenProduccion.model'

@Component({
  selector: 'app-reporte-personalizado-almacen-produccion-detalle',
  templateUrl:
    './reporte-personalizado-almacen-produccion-detalle.component.html',
  styleUrls: [
    './reporte-personalizado-almacen-produccion-detalle.component.css'
  ]
})
export class ReportePersonalizadoAlmacenProduccionDetalleComponent
  implements OnInit {
  @Input() reporte: ReportePersonalizadoAlmacenProduccion = null
  @Output() verDetalleArticullo = new EventEmitter<string>()

  constructor() {}

  ngOnInit() {}

  detalleArticulo(id: string) {
    this.verDetalleArticullo.emit(id)
  }
}
