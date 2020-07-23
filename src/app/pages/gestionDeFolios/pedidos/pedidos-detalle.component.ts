import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Orden } from '../../../models/orden.models'
import { FolioLinea } from 'src/app/models/folioLinea.models'
import {
  OrdenImpresion,
  FolioNewService
} from '../../../services/folio/folio-new.service'

@Component({
  selector: 'app-pedidos-detalle',
  templateUrl: './pedidos-detalle.component.html',
  styles: []
})
export class PedidosDetalleComponent implements OnInit {
  /**
   *El pedido para mostrar el detalle.
   *
   * @type {FolioLinea}
   * @memberof PedidosDetalleComponent
   */
  @Input() pedido: FolioLinea = null
  _folio
  @Input() set folio(f: string) {
    this._folio = f
  }

  get folio(): string {
    return this._folio
  }
  @Output() idFolio = new EventEmitter<string>()
  @Output() idPedido = new EventEmitter<string>()

  /**
   *La orden para mostrar el detalle.
   *
   * @memberof PedidosDetalleComponent
   */
  @Output() orden = new EventEmitter<OrdenImpresion>()

  detalleAvanceOrden: Orden = null
  avanceOrden(orden: Orden) {
    this.detalleAvanceOrden = orden
  }

  constructor(public folioService: FolioNewService) {}

  ngOnInit() {}

  mostrarDetalleDeLaOrden(folio, pedido, orden) {
    this.folioService
      .findAllOrdenesDePedidos([{ folio, pedido }], [orden])
      .subscribe(ordenes => {
        this.orden.emit(ordenes.pop())
      })
  }
}
