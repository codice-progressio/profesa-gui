import { Component, OnInit, Input } from '@angular/core'
import { ReporteFaltantesProductoTerminado } from '../../../../models/reportes/productoTerminado/reporte.faltantes.productoTerminado'
import { isNumber } from 'util'

@Component({
  selector: 'app-reporte-de-faltantes-producto-terminado-base-imprimible',
  templateUrl:
    './reporte-de-faltantes-producto-terminado-base-imprimible.component.html',
  styleUrls: [
    './reporte-de-faltantes-producto-terminado-base-imprimible.component.css'
  ]
})
export class ReporteDeFaltantesProductoTerminadoBaseImprimibleComponent
  implements OnInit {
  constructor() {}

  @Input() reportes: ReporteFaltantesProductoTerminado[] = null

  ngOnInit() {}

  ns = {
    0: 'nombreCompleto',
    1: 'stockMinimo',
    2: 'stockMaximo',
    3: 'existencia',
    4: 'pedir',
    5: 'enTransito'
  }

  estado = -1
  sort(n) {
    this.estado *= -1
    this.reportes.sort((a, b) => {
      return a[this.ns[n]] > b[this.ns[n]] ? -1 * this.estado : 1 * this.estado
    })
  }
}
