import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pedido } from 'src/app/models/pedido.model';

@Component({
  selector: 'app-pedido-nube-lista',
  templateUrl: './pedido-nube-lista.component.html',
  styleUrls: ['./pedido-nube-lista.component.css']
})
export class PedidoNubeListaComponent implements OnInit {
  constructor() {}

  cargando = false
  termino = ''
  estaCargandoBuscador: BehaviorSubject<boolean> = undefined

  pedidos: Pedido[] = []

  ngOnInit(): void {}

  modificar(pedido: Pedido) {
    console.log('modificar')
  }

  verDetalle(pedido: Pedido) {}

  eliminar(pedido: Pedido) {}
}
