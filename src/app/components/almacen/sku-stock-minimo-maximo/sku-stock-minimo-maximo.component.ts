import { Component, Input, OnInit } from '@angular/core'
import { SKU } from '../../../models/sku.model'
import { SkuService } from '../../../services/sku/sku.service'
import { ManejoDeMensajesService } from '../../../services/utilidades/manejo-de-mensajes.service'

@Component({
  selector: 'app-sku-stock-minimo-maximo',
  templateUrl: './sku-stock-minimo-maximo.component.html',
  styleUrls: ['./sku-stock-minimo-maximo.component.css']
})
export class SkuStockMinimoMaximoComponent implements OnInit {
  private _sku: SKU
  public get sku(): SKU {
    return this._sku
  }
  @Input()
  public set sku(value: SKU) {
    this._sku = value
    this.minimo = value?.stockMinimo
    this.maximo = value?.stockMaximo
  }

  minimo: number = 0
  maximo: number = 0
  cargando = false
  constructor(
    private skuService: SkuService,
    private notiService: ManejoDeMensajesService
  ) {}

  ngOnInit(): void {}

  guardar() {
    this.cargando = true
    this.skuService
      .modificarStock(this.sku._id, {
        stockMaximo: this.maximo,
        stockMinimo: this.minimo
      })
      .subscribe(
        resultado => {
          this.cargando = false

          this.sku.stockMaximo = resultado.stockMaximo
          this.sku.stockMinimo = resultado.stockMinimo

          this.notiService.toastCorrecto('Se modifico el stock')
        },
        () => (this.cargando = false)
      )
  }
}
