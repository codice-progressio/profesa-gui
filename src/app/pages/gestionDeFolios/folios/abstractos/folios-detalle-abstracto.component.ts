import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Folio } from 'src/app/models/folio.models'
import { ColoresTenidos } from 'src/app/models/ColoresTenidos'
import { FolioLinea } from 'src/app/models/folioLinea.models'

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
  @Input() folio: Folio = null

  Date = Date

  @Output() pedido = new EventEmitter<FolioLinea>()

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
    coloresTenidos.map((color) => {
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
  }
}
