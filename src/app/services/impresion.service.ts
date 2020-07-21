import { Injectable } from '@angular/core'
import { ReporteFaltantesProductoTerminado } from '../models/reportes/productoTerminado/reporte.faltantes.productoTerminado'
import { ReporteFaltantesAlmacenProduccion } from '../models/reportes/almacenProduccion/reporte.faltantes.almacenProduccion'
import { Maquina } from '../models/maquina.model'
import { Folio } from '../models/folio.models'
import { Orden } from '../models/orden.models'
import { OrdenImpresion } from './folio/folio-new.service'

@Injectable({
  providedIn: 'root'
})
export class ImpresionService {
  reportesProductoTerminadoFaltante: ReporteFaltantesProductoTerminado[] = null
  reportesAlmacenProduccionFaltante: ReporteFaltantesAlmacenProduccion[] = null
  reportesAlmacenPrdouccionPersonalizado: any[] = null
  reportesProgramacionTransformacion: Maquina[] = null

  folio: Folio
  ordenesAImprimir: string[] = []
  mostrarEncabezado = true

  titulo = 'Reporte sin titulo'
  fecha = new Date()
  private operacionDeLimpieza: Function = null
  constructor() {}

  productoTerminadoFaltantes(
    reportes: ReporteFaltantesProductoTerminado[]
  ): this {
    this.titulo = 'Reporte de faltantes. Producto terminado'
    this.reportesProductoTerminadoFaltante = reportes

    return this
  }

  private limpiar() {
    this.reportesProductoTerminadoFaltante = null
    this.reportesAlmacenProduccionFaltante = null
    this.reportesAlmacenPrdouccionPersonalizado = null
    this.reportesProgramacionTransformacion = null
    this.folio = null
  }

  almacenProduccionFaltantes(
    reportes: ReporteFaltantesAlmacenProduccion[]
  ): this {
    this.mostrarEncabezado = true
    this.titulo = 'Reporte de faltantes. Almacen de produccion'
    this.reportesAlmacenProduccionFaltante = reportes
    this.operacionDeLimpieza
    return this
  }

  almacenProduccionPersonalizado(reportes: any[], nombreReporte: string): this {
    this.mostrarEncabezado = true
    this.titulo = nombreReporte + ' Almacen de produccion'
    this.reportesAlmacenPrdouccionPersonalizado = reportes
    this.operacionDeLimpieza
    return this
  }
  programacionTransformacion(reportes: Maquina[], nombreReporte: string): this {
    this.mostrarEncabezado = true
    this.titulo = nombreReporte + ' Control de produccion'
    this.reportesProgramacionTransformacion = reportes
    this.operacionDeLimpieza
    return this
  }

  ordenes(ordenes: string[]): this {
    this.mostrarEncabezado = false
    this.ordenesAImprimir = ordenes
    return this
  }


  ordenesAImprimirIntegras: OrdenImpresion[] = []
  ordenesVariosPedidos(ordenes: OrdenImpresion[]){
    this.mostrarEncabezado = false
    this.ordenesAImprimirIntegras = ordenes
    return this
  }

  seleccionarFolio(folio: Folio) {
    this.folio = folio
    return this
  }

  imprimir() {
    this.fecha = new Date()
    setTimeout(() => {
      window.print()
      this.limpiar()
    }, 300)
  }
}
