import { Component, OnInit, EventEmitter, Output } from '@angular/core'
import { SkuService } from '../../../services/sku/sku.service'
import { SKU } from '../../../models/sku.model'
import { ActivatedRoute, Router } from '@angular/router'
import { ModalService } from '../../codice-modal/modal.service'

@Component({
  selector: 'app-sku-lista',
  templateUrl: './sku-lista.component.html',
  styleUrls: ['./sku-lista.component.css']
})
export class SkuListaComponent implements OnInit {
  @Output() estaCargando = new EventEmitter<boolean>()
  cargando = false
  skus: SKU[] = []

  constructor(
    public modalService: ModalService,
    private skuService: SkuService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

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

  private niceUrl(str: string): string {
    return str
      .split(' ')
      .map(x => x.trim())
      .join('_')
  }

  verDetalle(sku: SKU) {
    this.router.navigate(
      ['./detalle', this.niceUrl(sku.nombreCompleto), sku._id],
      { relativeTo: this.activatedRoute.parent }
    )
  }

  gestionarImagenes(sku: SKU) {
    this.router.navigate(
      ['./imagenes', this.niceUrl(sku.nombreCompleto), sku._id],
      { relativeTo: this.activatedRoute.parent }
    )
  }

  modificar(sku: SKU) {
    this.router.navigate(
      ['./modificar', this.niceUrl(sku.nombreCompleto), sku._id],
      { relativeTo: this.activatedRoute.parent }
    )
  }
}
