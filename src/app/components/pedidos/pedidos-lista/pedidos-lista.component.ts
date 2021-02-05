import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Pedido } from '../../../models/pedido.model'
import { PedidoService } from '../../../services/pedido.service'
import { ManejoDeMensajesService } from '../../../services/utilidades/manejo-de-mensajes.service'

@Component({
  selector: 'app-pedidos-lista',
  templateUrl: './pedidos-lista.component.html',
  styleUrls: ['./pedidos-lista.component.css']
})
export class PedidosListaComponent implements OnInit {
  constructor(
    private notiService: ManejoDeMensajesService,
    private pedidoService: PedidoService
  ) {}

  @Input() pedidos: Pedido[] = []
  @Output('editar') editarEmit = new EventEmitter<Pedido>()
  @Output('detalle') detalleEmit = new EventEmitter<Pedido>()

  ngOnInit(): void {}

  editar(pedido: Pedido) {
    this.editarEmit.emit(pedido)
  }
  detalle(pedido: Pedido) {
    this.detalleEmit.emit(pedido)
  }

  eliminando = {}
  eliminar(pedido: Pedido) {
    if (this.eliminando[pedido._id + '']) return

    this.notiService.confirmacionDeEliminacion(
      'Esta acción solo la puede deshacer el administrador',
      () => {
        this.eliminando[pedido._id + ''] = true
        this.pedidoService.eliminar(pedido._id).subscribe(
          () => {
            this.pedidos = this.pedidos.filter(x => x._id === pedido._id)
            this.eliminando[pedido._id + ''] = false
          },
          () => {
            this.eliminando[pedido._id + ''] = false
          }
        )
      }
    )
  }
}
