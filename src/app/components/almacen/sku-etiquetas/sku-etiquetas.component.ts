import { Component, Input, OnInit } from '@angular/core'
import { SKU } from '../../../models/sku.model'
import { SkuService } from '../../../services/sku/sku.service'
import { ParametrosService } from '../../../services/parametros.service'
import { EtiquetaTransporte } from '../../etiquetas-editor/etiquetas-editor.component'

@Component({
  selector: 'app-sku-etiquetas',
  templateUrl: './sku-etiquetas.component.html',
  styleUrls: ['./sku-etiquetas.component.css']
})
export class SkuEtiquetasComponent implements OnInit {
  @Input('sku') skuTraslado: SKU
  cargando = false

  etiquetas: string[] = []

  @Input()
  private _offline = false
  public get offline() {
    return this._offline
  }
  public set offline(value) {
    this._offline = value
    if (!value) this.cargarEtiquetas()
  }

  constructor(
    private parametrosService: ParametrosService,
    private skuService: SkuService
  ) {}

  ngOnInit(): void {}

  etiquetaEliminar(sku: SKU, payload: EtiquetaTransporte) {
    payload.cargando.next(true)
    this.skuService.etiqueta.eliminar(sku._id, payload.etiqueta).subscribe(
      s => {
        sku.etiquetas = sku.etiquetas.filter(x => x !== payload.etiqueta)
        payload.cargando.next(false)
      },
      () => payload.cargando.next(false)
    )
  }

  etiquetaGuardar(sku: SKU, payload: EtiquetaTransporte) {
    payload.cargando.next(true)
    this.skuService.etiqueta.agregar(sku._id, payload.etiqueta).subscribe(
      s => {
        // Eliminamos de manera dierecta sobre el objeto
        sku.etiquetas.push(payload.etiqueta)
        payload.input.value = ''
        setTimeout(() => {
          payload.input.focus()
        }, 100)
        payload.cargando.next(false)
        this.cargarEtiquetas()
      },
      () => payload.cargando.next(false)
    )
  }

  cargarEtiquetas() {
    this.parametrosService.etiquetas.obtenerTodo().subscribe(etiquetas => {
      this.etiquetas = etiquetas
    })
  }
}
