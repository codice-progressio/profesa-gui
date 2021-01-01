import { Component, OnInit, EventEmitter, Output } from '@angular/core'
import { SkuService } from '../../../services/sku/sku.service'
import { SKU } from '../../../models/sku.model'
import { Router } from '@angular/router'

@Component({
  selector: 'app-sku-lista',
  templateUrl: './sku-lista.component.html',
  styleUrls: ['./sku-lista.component.css']
})
export class SkuListaComponent implements OnInit {
  @Output() estaCargando = new EventEmitter<boolean>()
  cargando = false
  skus: SKU[] = []

  constructor(private skuService: SkuService, private router: Router) {}

  ngOnInit(): void {
    this.cargar()
  }

  cargar() {
    this.estadoCarga(true)
    this.skuService.leerTodo().subscribe(
      skus => {
        this.skus = skus
        this.estadoCarga(false)
      },
      () => this.estadoCarga(false)
    )
  }

  estadoCarga(estado: boolean) {
    this.estaCargando.emit(estado)
    this.cargando = estado
  }

  verDetalle(sku: SKU) {
    // Quitamos los espacios para que se vea mas
    // mejor.

    let n = sku.nombreCompleto
      .split(' ')
      .map(x => x.trim())
      .join('_')
    this.router.navigate(['/almacen/detalle', n, sku._id])
  }
}
