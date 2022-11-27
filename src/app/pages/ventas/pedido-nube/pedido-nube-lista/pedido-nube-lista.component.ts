import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import { Pedido } from 'src/app/models/pedido.model'
import { ImpresionService } from 'src/app/services/impresion.service';
import { PedidoNubeService } from 'src/app/services/pedido-nube.service'

@Component({
  selector: 'app-pedido-nube-lista',
  templateUrl: './pedido-nube-lista.component.html',
  styleUrls: ['./pedido-nube-lista.component.css']
})
export class PedidoNubeListaComponent implements OnInit {
  constructor(
    private pedidoNubeService: PedidoNubeService,
    private router: Router,
    private impresionService: ImpresionService
  ) {}

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
        this.pedidos = resp.pedidos
        this.cargando = false
      },
      err => (this.cargando = false)
    )
  }

  

  modificar(pedido: Pedido) {
    console.log('modificar')
  }

  verDetalle(pedido: Pedido) {}

  eliminar(pedido: Pedido) {}

  imprimir(pedido: Pedido) {
    this.impresionService.imprimirPedido(pedido)
  }
}
