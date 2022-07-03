import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Pedido } from 'src/app/models/pedido.model'

@Component({
  selector: 'app-pedido-global-card',
  templateUrl: './pedido-global-card.component.html',
  styleUrls: ['./pedido-global-card.component.css']
})
export class PedidoGlobalCardComponent implements OnInit, OnDestroy {
  pedidos: Pedido[] = []
  private _todosLosPedidos: Pedido[] = []
  public get todosLosPedidos(): Pedido[]
  {
    return this._todosLosPedidos
  }
  @Input()
  public set todosLosPedidos(pedidos: Pedido[])
  {
    this._todosLosPedidos = pedidos
    this.pedidos = pedidos
    this.generarIndiceDeBusqueda(pedidos)
  }

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

  private generarIndiceDeBusqueda(pedidos: Pedido[]) {
    console.log({ pedidos })
    this.indiceBusqueda = pedidos.map((pedido, indice) => {
      console.log({ pedido })
      let nombreContacto = pedido.contacto.nombre ?? ''
      let razonSocial = pedido.contacto.razonSocial ?? ''
      let observaciones = pedido.observaciones ?? ''
      let folio = pedido.folio ?? ''
      let cadena = `${nombreContacto} ${razonSocial} ${observaciones} ${folio}`
      cadena = cadena
        .split(' ')
        .map(x => x.toLowerCase().trim())
        .filter(x => x)
        .join(' ')
      return {
        cadena,
        indice
      }
    })

    console.log('indice', this.indiceBusqueda)
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
    console.log('terminoDeBusqueda', value)
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
  @Input() buscadorExterno: BehaviorSubject<boolean>
  @Output() articulosQueNoSeMuestran = new EventEmitter<number>()

  /**
   *Facilita la busqueda de datos manteniendo una cadena 
   cons los datos necesarios para buscar. 
   *
   * @type {IndiceBusqueda[]}
   * @memberof PedidoGlobalCardComponent
   */
  indiceBusqueda: IndiceBusqueda[] = []

  filtrar(termino: string) {
    let termLimpio = termino.trim().toLowerCase()
    console.log('filtrar=> 0 termLimpio', !termLimpio)
    console.log('filtrar=> 1 todosLosPedidos', this.todosLosPedidos)
    this.pedidos = this.todosLosPedidos.slice()
    console.log('filtrar=> 2 this.pedidos', this.pedidos)
    
    
    
    if (!termLimpio) {
      console.log(`filtrar=> 3 no hay termino '${termLimpio}'`)
      console.log('this.todosLosPedidos', this.todosLosPedidos)
      this.articulosQueNoSeMuestran.emit(0)
      this.actualizarCargandoBuscador(false)
      this.terminoSku = termLimpio
      return
    }
    console.log('filtrar=> 4 indiceBusqueda', this.indiceBusqueda)

    this.pedidos = this.indiceBusqueda
      .filter(ib => ib.cadena.includes(termLimpio))
      .map(x => x.indice)
      .map(x => this.todosLosPedidos.slice(x, x+1).pop())

    console.log('filtrar=> 5 this.todosLosPedidos', this.todosLosPedidos)


    this.actualizarCargandoBuscador(false)
  }

  actualizarCargandoBuscador(estado: boolean, completar: boolean = false) {
    console.log(
      'this.cargandoBuscador !== undefined',
      this.buscadorExterno !== undefined
    )
    if (this.buscadorExterno !== undefined) {
      console.log({completar, estado})
      if (!completar) this.buscadorExterno.next(estado)
      else this.buscadorExterno.complete()
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
