import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Articulo } from '../../../../models/almacenDeMateriaPrimaYHerramientas/articulo.modelo'
import { SalidaArticulo } from '../../../../models/almacenDeMateriaPrimaYHerramientas/salidaArticulo.model'
import { iSalidasUltimosDias, ReporteFaltantesAlmacenProduccion } from 'src/app/models/reportes/almacenProduccion/reporte.faltantes.almacenProduccion';
import { Requisicion } from '../../../../models/requisiciones/requisicion.model'

@Component({
  selector: 'app-r-personalizado-almacen-produccion-imprimible',
  templateUrl: './r-personalizado-almacen-produccion-imprimible.component.html',
  styleUrls: ['./r-personalizado-almacen-produccion-imprimible.component.css']
})
export class RPersonalizadoAlmacenProduccionImprimibleComponent implements OnInit {


  @Input() articulos:Articulo [] = []

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
    this.articulos.sort((a, b) =>
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

  sumaEnTransito (enTransito:any[]){

    return enTransito.reduce((a,b)=> a+b.cantidad - b.cantidadEntregadaALaFecha, 0)

  }

}
