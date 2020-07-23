import { Component, OnInit, Input } from '@angular/core'
import { OrdenImpresion } from '../../../../services/folio/folio-new.service'
import { ImpresionService } from '../../../../services/impresion.service'

@Component({
  selector: 'app-orden-detalle-imprimir',
  templateUrl: './orden-detalle-imprimir.component.html',
  styleUrls: ['./orden-detalle-imprimir.component.css']
})
export class OrdenDetalleImprimirComponent implements OnInit {
  @Input() datos: OrdenImpresion
  constructor(private impresionService: ImpresionService) {}

  ngOnInit(): void {}

  obtenerDatosParaOrden(): string {
    let datos = {}

    datos['idFolio'] = this.datos.idFolio
    datos['idPedido'] = this.datos.idPedido
    datos['idOrden'] = this.datos.idOrden
    datos['cliente'] = this.datos.cliente

    return JSON.stringify(datos)
  }

  imprimir() {
    this.impresionService.ordenesVariosPedidos([this.datos]).imprimir()
  }
}
