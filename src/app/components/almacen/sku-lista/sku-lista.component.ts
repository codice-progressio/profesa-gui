import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core'
import { SkuService } from '../../../services/sku/sku.service'
import { SKU } from '../../../models/sku.model'
import { Imagen } from '../../../models/Imagen'
import { ActivatedRoute, Router } from '@angular/router'
import { ModalService } from '../../codice-modal/modal.service'
import { ManejoDeMensajesService } from '../../../services/utilidades/manejo-de-mensajes.service'
import { UtilidadesService } from '../../../services/utilidades.service'

@Component({
  selector: 'app-sku-lista',
  templateUrl: './sku-lista.component.html',
  styleUrls: ['./sku-lista.component.css']
})
export class SkuListaComponent implements OnInit {
  @Output() estaCargando = new EventEmitter<boolean>()

  @Input()
  public set termino(value: string) {
    // Cuando recibimos el termino disparamos la
    // busqueda
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

  skuTraslado: SKU

  @Output() etiquetasFiltrandose = new EventEmitter<string[]>()
  @Input()
  public set etiquetasParaFiltrarse(value: string[]) {
    // Cada vez que en un componente externo modificamos
    // las etiquetas de filtrado y las recibimos aqui,
    // ejecutamos la acción de filtrado correspondiente
    // Unicamente si los valores son diferentes

    if (value.join('') !== this._etiquetasParaFiltrarse.join('')) {
      this._etiquetasParaFiltrarse = value

      if (value.length > 0) {
        if (this._termino)
          this.notiService.toast.info(
            'Se ignoro el termino de busqueda: ' + this._termino
          )
        // Solo ejecutamos el filtrado si hay valores.
        this.buscarEtiquetas(value)
      } else {
        this._termino ? this.buscar(this._termino) : this.cargar()
      }
    }
  }
  private _etiquetasParaFiltrarse: string[] = []
  public get etiquetasParaFiltrarse(): string[] {
    return this._etiquetasParaFiltrarse
  }

  constructor(
    private utilidadesService: UtilidadesService,
    public modalService: ModalService,
    private skuService: SkuService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notiService: ManejoDeMensajesService
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

  verDetalle(sku: SKU) {
    this.router.navigate(
      [
        './detalle',
        this.utilidadesService.niceUrl(sku.nombreCompleto),
        sku._id
      ],
      { relativeTo: this.activatedRoute.parent }
    )
  }

  gestionarImagenes(sku: SKU) {
    this.router.navigate(
      [
        './imagenes',
        this.utilidadesService.niceUrl(sku.nombreCompleto),
        sku._id
      ],
      { relativeTo: this.activatedRoute.parent }
    )
  }

  modificar(sku: SKU) {
    this.router.navigate(
      [
        './modificar',
        this.utilidadesService.niceUrl(sku.nombreCompleto),
        sku._id
      ],
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

  filtrarPorEtiquetas(etiquetas) {
    return () => {
      // Comprobamos que las etiquetas no esten repetidas
      this.etiquetasParaFiltrarse = Array.from(
        new Set(this.etiquetasParaFiltrarse).add(etiquetas)
      )
      // emitimos las etiquetas para que otro componente se
      // encargue de filtrarlos

      this.etiquetasFiltrandose.emit(this.etiquetasParaFiltrarse)
    }
  }

  buscarEtiquetas(value: string[]) {
    this.estadoCarga(true)
    this.skuService.etiqueta.buscar(value).subscribe(
      skus => {
        this.skus = skus
        this.estadoCarga(false)
      },
      () => this.estadoCarga(false)
    )
  }

  obtenerIconoDeEtiqueta(tag: string): string[] {
    let base = ['fas', 'mr-1']
    let sinFiltrar = base.concat('fa-tag')
    let filtrando = base.concat(...['fa-filter', 'text-warning'])

    return this.etiquetasParaFiltrarse.includes(tag) ? filtrando : sinFiltrar
  }

  idModEtiquetas = 'modalEtiquetas'
  idModSalidas = 'modalSalidas'
  idModEntrada = 'modalEntrada'
  idModStock = 'modalStock'

  abrirModal(sku: SKU, id: string) {
    this.skuTraslado = sku
    this.modalService.open(id)
  }
}
