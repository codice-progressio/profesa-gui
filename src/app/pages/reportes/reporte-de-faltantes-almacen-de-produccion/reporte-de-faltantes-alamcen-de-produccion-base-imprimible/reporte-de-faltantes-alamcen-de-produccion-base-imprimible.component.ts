import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import {
  iSalidasUltimosDias,
  ReporteFaltantesAlmacenProduccion
} from 'src/app/models/reportes/almacenProduccion/reporte.faltantes.almacenProduccion'

@Component({
  selector: 'app-reporte-de-faltantes-alamcen-de-produccion-base-imprimible',
  templateUrl:
    './reporte-de-faltantes-alamcen-de-produccion-base-imprimible.component.html',
  styleUrls: [
    './reporte-de-faltantes-alamcen-de-produccion-base-imprimible.component.css'
  ]
})
export class ReporteDeFaltantesAlamcenDeProduccionBaseImprimibleComponent
  implements OnInit {
  @Input()
  reportes: ReporteDeFaltantesAlamcenDeProduccionBaseImprimibleComponent = null

  @Output() detalleSalida = new EventEmitter<{
    salidas: iSalidasUltimosDias[]
    dias: number
    reporte: ReporteFaltantesAlmacenProduccion
  }>()

  constructor() {}

  ngOnInit() {}

  orden = -1
  sort(val) {
    this.orden = this.orden * -1
    this.reportes.sort((a, b) =>
      a[val] > b[val] ? 1 * this.orden : -1 * this.orden
    )
  }

  sumSalida(salidas: iSalidasUltimosDias[]) {
    return salidas.reduce((a, b) => a + b.cantidad, 0)
  }

  detSal(
    salidas: iSalidasUltimosDias[],
    dias: number,
    reporte: ReporteFaltantesAlmacenProduccion
  ) {
    this.detalleSalida.emit({salidas, dias, reporte})
  }
}
