import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ManejoDeMensajesService } from '../../../services/utilidades/manejo-de-mensajes.service'
import { SkuService } from '../../../services/sku/sku.service'
import { SKU } from '../../../models/sku.model'
import { Location } from '@angular/common'

@Component({
  selector: 'app-sku-detalle',
  templateUrl: './sku-detalle.component.html',
  styleUrls: ['./sku-detalle.component.css']
})
export class SkuDetalleComponent implements OnInit {
  sku: SKU
  cargando = false
  constructor(
    private activatedRoute: ActivatedRoute,
    private notiService: ManejoDeMensajesService,
    private skuService: SkuService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.obtenerSku()
  }

  obtenerSku() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.cargando = true
      let id = params.get('id')
      this.skuService.buscarId(id).subscribe(
        sku => {
          this.sku = sku
          this.cargando = false
        },
        () => {
          this.cargando = false
          this.notiService.toast.warning('No existe el sku', 'titulo', {
            timeOut: 2000
          })
          this.location.back()
        }
      )
    })
  }

  obtenerImagenes(sku: SKU) {
    return sku.imagenes.map(x => x.path)
  }
}
