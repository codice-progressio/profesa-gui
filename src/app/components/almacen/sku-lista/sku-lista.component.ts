import { Component, OnInit, EventEmitter, Output } from '@angular/core'
import { SkuService } from '../../../services/sku/sku.service'
import { SKU } from '../../../models/sku.model'

@Component({
  selector: 'app-sku-lista',
  templateUrl: './sku-lista.component.html',
  styleUrls: ['./sku-lista.component.css']
})
export class SkuListaComponent implements OnInit {
  @Output() cargando = new EventEmitter<boolean>()
  skus: SKU[] = []

  constructor(private skuService: SkuService) {}

  ngOnInit(): void {
    this.cargar()
  }

  cargar() {
    this.cargando.emit(true)
    this.skuService.leerTodo().subscribe(
      skus => {
        this.skus = skus
        this.cargando.emit(false)
      },
      () => this.cargando.emit(false)
    )
  }
}
