import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core'
import { SKU } from '../../../models/sku.model'
import { SkuService } from '../../../services/sku/sku.service'
import { ManejoDeMensajesService } from '../../../services/utilidades/manejo-de-mensajes.service'
import { SkuLote, SkuLoteMovimiento } from '../../../models/lote.model'
import { __String } from 'typescript'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-sku-entrada',
  templateUrl: './sku-entrada.component.html',
  styleUrls: ['./sku-entrada.component.css']
})
export class SkuEntradaComponent implements OnInit {
  @ViewChild('input') input: ElementRef

  entrada = new FormControl()
  observaciones = new FormControl()

  private _cargando = false
  public get cargando() {
    return this._cargando
  }
  public set cargando(value) {
    this._cargando = value
    this.estado(value)
  }

  @Input() sku: SKU
  constructor(
    private skuService: SkuService,
    private notiService: ManejoDeMensajesService
  ) {}

  ngOnInit(): void {
    this.entrada.disable()
    this.observaciones.disable()
  }

  private _loteSeleccionado: SkuLote
  public get loteSeleccionado(): SkuLote {
    return this._loteSeleccionado
  }
  public set loteSeleccionado(value: SkuLote) {
    this._loteSeleccionado = value
    this.observaciones.enable()
    this.entrada.enable()
    this.input.nativeElement.focus()
  }

  guardar() {
    let movimiento = {
      cantidad: this.entrada.value,
      esEntrada: true,
      observaciones: this.observaciones.value
    }

    this.cargando = true
    this.skuService.lote.movimiento
      .agregar(this.sku._id, this.loteSeleccionado._id, movimiento)
      .subscribe(
        sku => {
          this.sku = sku
          this.cargando = false
          this.loteSeleccionado.existencia += this.entrada.value * 1
          this.entrada.setValue(0)
          this.observaciones.setValue('')
          this.input.nativeElement.focus()
        },
        () => {
          this.cargando = false
          this.input.nativeElement.focus()
        }
      )
  }

  private estado(disable: boolean) {
    let e = [this.entrada, this.observaciones]
    e.forEach(x => (disable ? x.disable() : x.enable()))
  }
}
