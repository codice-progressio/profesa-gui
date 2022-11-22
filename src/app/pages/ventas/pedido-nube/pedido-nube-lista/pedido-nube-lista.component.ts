import { Component, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Pedido } from 'src/app/models/pedido.model'
import { PedidoNubeService } from 'src/app/services/pedido-nube.service'

@Component({
  selector: 'app-pedido-nube-lista',
  templateUrl: './pedido-nube-lista.component.html',
  styleUrls: ['./pedido-nube-lista.component.css']
})
export class PedidoNubeListaComponent implements OnInit {
  constructor(private pedidoNubeService: PedidoNubeService) {}

  cargando = false
  termino = ''
  estaCargandoBuscador: BehaviorSubject<boolean> = undefined

  pedidos: Pedido[] = []

  ngOnInit(): void {
    this.cargarPedidos()
  }

  cargarPedidos() {
    if (this.cargando) return
    this.cargando = true
    this.pedidoNubeService.todo().subscribe(
      resp => {
        this.pedidos = resp.pedidos.map(p => this.obtenerFolioUsuario(p))
        this.cargando = false
      },
      err => (this.cargando = false)
    )
  }

  obtenerFolioUsuario(p: Pedido): Pedido {
    // Obtenemos el folio de pedidos offline
    const folio = p.folio.split('-').pop().padStart(3, '0')
    p.folio_usuario = folio
    return p
  }

  modificar(pedido: Pedido) {
    console.log('modificar')
  }

  verDetalle(pedido: Pedido) {}

  eliminar(pedido: Pedido) {}
}
