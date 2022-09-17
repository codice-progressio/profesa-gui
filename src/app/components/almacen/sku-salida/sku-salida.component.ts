import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { UntypedFormControl } from '@angular/forms'
import { SkuLote } from 'src/app/models/lote.model'
import { SkuService } from 'src/app/services/sku/sku.service'
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service'
import { SKU } from '../../../models/sku.model'

@Component({
  selector: 'app-sku-salida',
  templateUrl: './sku-salida.component.html',
  styleUrls: ['./sku-salida.component.css']
})
export class SkuSalidaComponent implements OnInit {
  @ViewChild('input') input: ElementRef

  salida = new UntypedFormControl()
  observaciones = new UntypedFormControl()

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
    this.salida.disable()
    this.observaciones.disable()
  }

  private _loteSeleccionado: SkuLote
  public get loteSeleccionado(): SkuLote {
    return this._loteSeleccionado
  }
  public set loteSeleccionado(value: SkuLote) {
    this._loteSeleccionado = value
    this.observaciones.enable()
    this.salida.enable()
    this.input.nativeElement.focus()
  }

  guardar() {
    let movimiento = {
      cantidad: this.salida.value,
      esEntrada: false,
      observaciones: this.observaciones.value
    }

    this.cargando = true
    this.skuService.lote.movimiento
      .agregar(this.sku._id, this.loteSeleccionado._id, movimiento)
      .subscribe(
        sku => {
          // this.sku = sku
          this.sku.existencia = sku.existencia
          this.cargando = false
          this.loteSeleccionado.existencia -= this.salida.value * 1
          this.salida.setValue('')
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
    let e = [this.salida, this.observaciones]
    e.forEach(x => (disable ? x.disable() : x.enable()))
  }
}
