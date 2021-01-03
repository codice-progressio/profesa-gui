import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core'
import { SkuService } from '../../../services/sku/sku.service'
import { SKU, SkuImagen } from '../../../models/sku.model'
import { ActivatedRoute, Router } from '@angular/router'
import { ModalService } from '../../codice-modal/modal.service'

@Component({
  selector: 'app-sku-lista',
  templateUrl: './sku-lista.component.html',
  styleUrls: ['./sku-lista.component.css']
})
export class SkuListaComponent implements OnInit {
  @Output() estaCargando = new EventEmitter<boolean>()

  @Input()
  public set termino(value: string) {
    this._termino = value
    if (value) this.buscar(value)
    else this.cargar()
  }
  private _termino: string = ''
  public get termino(): string {
    return this._termino
  }

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

  buscar(termino: string) {
    this.estadoCarga(true)
    this.skuService.buscarTermino(termino).subscribe(
      skus => {
        this.estadoCarga(false)
        this.skus = skus
      },
      () => this.estadoCarga(false)
    )
  }
}
