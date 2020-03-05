import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Orden } from '../../../models/orden.models'
import { FolioLinea } from 'src/app/models/folioLinea.models'

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
  @Input() set  folio(f:string){
    console.log(`f`,f)
    this._folio = f
  }

  get folio():string{
    return this._folio
  }
  @Output() idFolio = new EventEmitter<string>()
  @Output() idPedido = new EventEmitter<string>()

  /**
   *La orden para mostrar el detalle.
   *
   * @memberof PedidosDetalleComponent
   */
  @Output() orden = new EventEmitter<Orden>()

  detalleAvanceOrden: Orden = null
  avanceOrden(orden: Orden) {
    this.detalleAvanceOrden = orden
  }

  constructor() {}

  ngOnInit() {}

  mostrarDetalleDeLaOrden(orden: Orden) {
    this.orden.emit(orden)
    this.idFolio.emit(this.folio)
    this.idPedido.emit(this.pedido._id)
  }
}
