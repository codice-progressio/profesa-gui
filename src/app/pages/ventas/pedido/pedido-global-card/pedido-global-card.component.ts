import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Pedido } from 'src/app/models/pedido.model'

@Component({
  selector: 'app-pedido-global-card',
  templateUrl: './pedido-global-card.component.html',
  styleUrls: ['./pedido-global-card.component.css']
})
export class PedidoGlobalCardComponent implements OnInit {
  @Input() pedidos: Pedido[] = []
  @Input() esModoOffline = true

  @Input() cargando = false

  @Output('detalle') _detalle = new EventEmitter<Pedido>()
  @Output('editar') _editar = new EventEmitter<Pedido>()
  @Output('eliminar') _eliminar = new EventEmitter<Pedido>()
  @Output('compartir') _compartir = new EventEmitter<Pedido>()
  @Output('subirNube') _subirNube = new EventEmitter<Pedido>()

  constructor() {}

  ngOnInit(): void {}
  detalle(p: Pedido) {
    this._detalle.emit(p)
  }
  editar(p: Pedido) {
    this._editar.emit(p)
  }
  eliminar(p: Pedido) {
    this._eliminar.emit(p)
  }
  compartir(p: Pedido) {
    this._compartir.emit(p)
  }

  subirNube(p: Pedido) {
    if (!this.cargando) {
      this.cargando = true
      this._subirNube.emit(p)
    }
  }
}
