import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Pedido } from 'src/app/models/pedido.model'

@Component({
  selector: 'app-pedido-global-card',
  templateUrl: './pedido-global-card.component.html',
  styleUrls: ['./pedido-global-card.component.css']
})
export class PedidoGlobalCardComponent implements OnInit, OnDestroy {
  @Input() pedidos: Pedido[] = []
  @Input() esModoOffline = true

  @Input() cargando = false
  cargando_behavior = new BehaviorSubject(false)

  @Output('detalle') _detalle = new EventEmitter<Pedido>()
  @Output('editar') _editar = new EventEmitter<Pedido>()
  @Output('eliminar') _eliminar = new EventEmitter<Pedido>()
  @Output('compartir') _compartir = new EventEmitter<Pedido>()
  @Output('subirNube') _subirNube = new EventEmitter<DatosNube>()

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.actualizarCargandoBuscador(false, true)
    this.cargando_behavior.complete()
  }
  constructor() {}

  ngOnInit(): void {
    this.cargando_behavior.subscribe(valor => (this.cargando = valor))
  }
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
      this._subirNube.emit({
        pedido: p,
        cargando: this.cargando_behavior
      })
    }
  }

  // ------------------------------------
  // --------------BUSQUEDA--------------
  // ------------------------------------

  // Obtenemos el termino de busqueda
  // para filtrar los pedidos existentes.
  private _terminoDeBusqueda = ''
  public get terminoDeBusqueda() {
    return this._terminoDeBusqueda
  }
  @Input()
  public set terminoDeBusqueda(value) {
    // Al obtener el termino ejecutamos la accion de filrar
    this._terminoDeBusqueda = value
    this.filtrar(value)
  }

  terminoSku: string = ''

  /**
   *La subscripcion al buscador
   *
   * @type {BehaviorSubject<boolean>}
   * @memberof PedidoGlobalCardComponent
   */
  @Input() cargandoBuscador: BehaviorSubject<boolean>
  @Output() articulosQueNoSeMuestran = new EventEmitter<number>()
  indiceBusqueda: IndiceBusqueda[] = []
  todosLosPedidos = []

  filtrar(termino: string) {
    let termLimpio = termino.trim()
    if (!termLimpio) {
      this.pedidos = this.todosLosPedidos
      this.todosLosPedidos = []
      this.articulosQueNoSeMuestran.emit(0)
      this.actualizarCargandoBuscador(false)
      this.terminoSku = termLimpio
      return
    }

    this.todosLosPedidos = this.pedidos

    this.pedidos = this.indiceBusqueda
      .filter(ib => ib.cadena.includes(termLimpio))
      .map(x => x.indice)
      .map(x => this.pedidos[x])
  }


  actualizarCargandoBuscador(estado:boolean, completar:boolean = false) {
    if (this.cargandoBuscador !== undefined){
       
      if (!completar)
        this.cargandoBuscador.next(estado)
      else
        this.cargandoBuscador.complete()

    }


  }
}

interface IndiceBusqueda {
  cadena: string
  indice: number
}

/**
 *Agrupa la carga y el pedido para enviarlos en un solo paquete
 al componente pare. 
 *
 * @interface DatosNube
 */
export interface DatosNube {
  cargando: BehaviorSubject<boolean>
  pedido: Pedido
}
