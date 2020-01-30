import { Component, OnInit, EventEmitter } from '@angular/core'
import { ReportesProduccionService } from 'src/app/services/reportes/reportes-produccion.service'
import { ImpresionService } from 'src/app/services/impresion.service'
import { ReporteFaltantesProductoTerminado } from 'src/app/models/reportes/productoTerminado/reporte.faltantes.productoTerminado'
import { ReporteFaltantesAlmacenProduccion } from '../../../models/reportes/almacenProduccion/reporte.faltantes.almacenProduccion'
import {
  ReporteFaltantesAlmacenProduccion,
  iSalidasUltimosDias
} from 'src/app/models/reportes/almacenProduccion/reporte.faltantes.almacenProduccion'

@Component({
  selector: 'app-reporte-de-faltantes-almacen-de-produccion',
  templateUrl: './reporte-de-faltantes-almacen-de-produccion.component.html',
  styleUrls: ['./reporte-de-faltantes-almacen-de-produccion.component.css']
})
export class ReporteDeFaltantesAlmacenDeProduccionComponent implements OnInit {
  cargando: boolean = false
  actualizacion: Date = new Date()
  reportes: ReporteFaltantesAlmacenProduccion[]

  detalleSalida: {
    salidas: iSalidasUltimosDias[]
    dias: number
    reporte: ReporteFaltantesAlmacenProduccion
  } = null

  constructor(
    private reporteService: ReportesProduccionService,
    private impresionService: ImpresionService
  ) {}

  ngOnInit() {
    this.cargarReporte()
  }

  cargarReporte() {
    this.cargando = true
    this.reporteService.almacenProduccionFaltante().subscribe(reportes => {
      this.reportes = reportes
      this.actualizacion = new Date()
      this.cargando = false
    })
  }

  imprimir(reportes: ReporteFaltantesAlmacenProduccion[]) {
    this.impresionService.almacenProduccionFaltantes(reportes).imprimir()
  }


}
