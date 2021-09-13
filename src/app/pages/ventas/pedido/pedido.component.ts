import { Component, OnInit } from '@angular/core'
import { Pedido } from '../../../models/pedido.model'
import { PedidoService } from '../../../services/pedido.service'
import { ActivatedRoute, Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import { ContactoService } from '../../../services/contacto.service'
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service'

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  constructor(
    private notiService: ManejoDeMensajesService,
    private pedidoService: PedidoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  pedidos: Pedido[] = []

  private _cargando = false
  public get cargando() {
    return this._cargando
  }
  public set cargando(value) {
    this._cargando = value
    this.estaCargandoBuscador?.next(value)
  }

  estaCargandoBuscador: BehaviorSubject<boolean>
  private _termino: string
  public get termino(): string {
    return this._termino
  }

  public set termino(value: string) {
    this._termino = value
    this.buscar(value)
  }

  ngOnInit(): void {
    this.cargar()
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

  cargar() {
    this.cargando = true
    this.pedidoService.buscarUsuario().subscribe(
      pedidos => {
        this.pedidos = pedidos
        this.cargando = false
      },
      () => (this.cargando = false)
    )
  }

  buscar(termino: string) {
    this.cargando = true
    this.pedidoService.buscarTermino(termino).subscribe(
      pedidos => {
        this.cargando = false
        this.pedidos = pedidos
      },
      () => (this.cargando = false)
    )
  }

  editar(pedido: Pedido) {
    this.router.navigate(['modificar', pedido._id], {
      relativeTo: this.activatedRoute
    })
  }

  detalle(pedido: Pedido) {
    this.router.navigate(['detalle', pedido._id], {
      relativeTo: this.activatedRoute
    })
  }
}
