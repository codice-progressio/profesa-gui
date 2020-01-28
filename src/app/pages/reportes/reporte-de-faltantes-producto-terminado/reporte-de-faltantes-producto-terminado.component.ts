import { Component, OnInit } from '@angular/core'
import { ReportesProduccionService } from '../../../services/reportes/reportes-produccion.service'
import { ReporteFaltantesProductoTerminado } from '../../../models/reportes/productoTerminado/reporte.faltantes.productoTerminado'
import { ImpresionService } from '../../../services/impresion.service'

@Component({
  selector: 'app-reporte-de-faltantes-producto-terminado',
  templateUrl: './reporte-de-faltantes-producto-terminado.component.html',
  styleUrls: ['./reporte-de-faltantes-producto-terminado.component.css']
})
export class ReporteDeFaltantesProductoTerminadoComponent implements OnInit {
  reportes: ReporteFaltantesProductoTerminado[] = null
  actualizacion: Date = null
  cargando: boolean = false
  constructor(
    private reporteService: ReportesProduccionService,
    private impresionService: ImpresionService
  ) {}

  ngOnInit() {
    this.cargarReporte()
  }

  cargarReporte() {
    this.cargando = true
    this.reporteService.productoTerminadoFaltante().subscribe(reportes => {
      this.reportes = reportes
      this.actualizacion = new Date()
      this.cargando = false
    })
  }

  imprimir(reportes: ReporteFaltantesProductoTerminado[]) {
    this.impresionService
      .productoTerminadoFaltantes(reportes)
      .imprimir()
  }
}
