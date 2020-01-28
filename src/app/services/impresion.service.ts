import { Injectable } from '@angular/core'
import { ReporteFaltantesProductoTerminado } from '../models/reportes/productoTerminado/reporte.faltantes.productoTerminado'

@Injectable({
  providedIn: 'root'
})
export class ImpresionService {
  reportesProductoTerminadoFaltante: ReporteFaltantesProductoTerminado[] = null
  titulo='Reporte sin titulo'
  fecha= new Date()
  private operacionDeLimpieza: Function = null
  constructor() {}

  productoTerminadoFaltantes(
    reportes: ReporteFaltantesProductoTerminado[]
  ): this {
    this.titulo = 'Reporte de faltantes. Producto terminado'
    this.reportesProductoTerminadoFaltante = reportes
    this.operacionDeLimpieza = this.productoTerminadoFaltantesLimpiar
    return this
  }

  private productoTerminadoFaltantesLimpiar() {
    this.reportesProductoTerminadoFaltante = null
  }

  imprimir() {
    this.fecha = new Date()
    setTimeout(() => {
      window.print()
      console.log('termino imp')
      this.operacionDeLimpieza()
      this.operacionDeLimpieza = null
    }, 300)
  }
}
