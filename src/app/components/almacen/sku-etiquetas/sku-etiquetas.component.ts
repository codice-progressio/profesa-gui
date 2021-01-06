import { Component, Input, OnInit } from '@angular/core'
import { SKU } from '../../../models/sku.model'
import { SkuService } from '../../../services/sku/sku.service'

@Component({
  selector: 'app-sku-etiquetas',
  templateUrl: './sku-etiquetas.component.html',
  styleUrls: ['./sku-etiquetas.component.css']
})
export class SkuEtiquetasComponent implements OnInit {
  @Input('sku') skuTraslado: SKU
  cargando = false

  constructor(private skuService: SkuService) {}

  ngOnInit(): void {}

  cargandoEtiqueta = false
  etiquetaEliminar(sku: SKU, tag: string) {
    return () => {
      this.cargandoEtiqueta = true
      this.skuService.etiqueta.eliminar(sku._id, tag).subscribe(
        s => {
          sku.etiquetas = sku.etiquetas.filter(x => x !== tag)

          this.cargandoEtiqueta = false
        },
        () => (this.cargandoEtiqueta = false)
      )
    }
  }

  etiquetaGuardar(sku: SKU, input: any) {
    let valor = input.value.trim()
    if (!valor) return

    this.cargandoEtiqueta = true
    this.skuService.etiqueta.agregar(sku._id, valor).subscribe(
      s => {
        // Eliminamos de manera dierecta sobre el objeto
        sku.etiquetas.push(valor)
        input.value = ''
        setTimeout(() => {
          input.focus()
        }, 100)
        this.cargandoEtiqueta = false
      },
      () => (this.cargandoEtiqueta = false)
    )
  }
}
