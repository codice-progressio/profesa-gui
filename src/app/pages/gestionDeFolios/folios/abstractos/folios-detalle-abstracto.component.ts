import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Folio } from 'src/app/models/folio.models'
import { ColoresTenidos } from 'src/app/models/ColoresTenidos'
import { FolioLinea } from 'src/app/models/folioLinea.models'
import { Orden } from 'src/app/models/orden.models'

@Component({
  selector: 'app-folios-detalle-abstracto',
  templateUrl: './folios-detalle-abstracto.component.html',
  styles: []
})
export class FoliosDetalleAbstractoComponent implements OnInit {
  /**
   *El folio que se usara para mostrar el detalle.
   *
   * @type {Folio}
   * @memberof FoliosDetalleAbstractoComponent
   */
  _folio: Folio
  @Input() set folio(f: Folio) {
    this.pedidoParaDetalle = null
    this.ordenParaDetalle = null
    this._folio = f
  }

  get folio(): Folio {
    return this._folio
  }

  Date = Date

  @Output() pedido = new EventEmitter<FolioLinea>()
  @Output() idFolio = new EventEmitter<string>()
  pedidoParaDetalle: FolioLinea = null
  ordenParaDetalle: Orden = null
  constructor() {}

  ngOnInit() {}

  horaDeConsulta(): Date {
    return new Date()
  }

  /**
   *Suma los colores tenidos.
   *
   * @param {ColoresTenidos []} coloresTenidos
   * @returns {number}
   * @memberof FoliosDetalleAbstractoComponent
   */
  sumarTenidos(coloresTenidos: ColoresTenidos[]): number {
    let total = 0
    coloresTenidos.map(color => {
      total += color.cantidad
    })
    return total
  }

  /**
   *Emite el pedido seleccionado para mostrar el detalle.
   *
   * @param {FolioLinea} pedido
   * @memberof FoliosDetalleAbstractoComponent
   */
  mostrarDetalleDePedido(pedido: FolioLinea) {
    this.pedido.emit(pedido)
    this.pedidoParaDetalle = pedido
    this.idFolio.emit(this.folio._id)
  }

  /**
   *Retorna la cantidad de ordenes segun el estandar. 
   Esta cantidad varia contra el contedo de ordenes del
   pedido por que las medias ordenes se contemplan como 
   una. Cuando se hace el calculo contra el estandar lo 
   que retorna enrealidad es la cantidad de ordenes 
   en laminas. Si son 
   *
   * @returns {number}
   * @memberof FolioLinea
   */
  ordenesSegunEstandar(pedido: FolioLinea): number {
    if (pedido.modeloCompleto) {
      let estandar = pedido.modeloCompleto.tamano.estandar
      let totalDePedido = pedido.cantidad

      return totalDePedido / estandar
    }
  }

  laserEnModeloOPedido(pedido: FolioLinea): string {
    if (pedido.laserCliente) return pedido.laserCliente.laser

    if (pedido.modeloCompleto.laserAlmacen)
      return pedido.modeloCompleto.laserAlmacen.laser

    return ''
  }
}
