import { Component, Input, OnInit } from '@angular/core'
import { SKU } from '../../../models/sku.model'
import { Imagen } from "../../../models/Imagen"
import { SkuService } from '../../../services/sku/sku.service'
import { ActivatedRoute } from '@angular/router'
import { CargaDeImagenesTransporte } from '../../../shared/carga-de-imagenes/carga-de-imagenes-transporte'
import { ImagenesGestionRapidaComponent } from '../../imagenes-gestion-rapida/imagenes-gestion-rapida.component'
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-sku-imagenes',
  templateUrl: './sku-imagenes.component.html',
  styleUrls: ['./sku-imagenes.component.css']
})
export class SkuImagenesComponent implements OnInit {
  cargando = false
  sku: SKU
  imagenesGestionRapidaComponent: ImagenesGestionRapidaComponent

  private _imagenesParaSubir: CargaDeImagenesTransporte[] = []
  public get imagenesParaSubir(): CargaDeImagenesTransporte[] {
    return this._imagenesParaSubir
  }
  public set imagenesParaSubir(value: CargaDeImagenesTransporte[]) {
    this._imagenesParaSubir = value
    this.subirImagenes(value)
  }

  constructor(
    private skuService: SkuService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(routes => {
      this.cargando = true
      let id = routes.get('id')
      this.cargarSKU(id)
    })
  }

  cargarSKU(id: string) {
    this.skuService.buscarId(id).subscribe(
      x => {
        this.cargando = false
        this.sku = x
      },
      () => (this.cargando = false)
    )
  }

  subirImagenes(files: CargaDeImagenesTransporte[]) {
    files.forEach(file => {
      this.skuService.imagen
        .agregar(this.sku._id, file.file)
        .subscribe((imagen: Imagen) => {
          this.sku.imagenes.unshift(imagen)
          this.imagenesGestionRapidaComponent.files = this.imagenesGestionRapidaComponent.files.filter(
            localFile => localFile.file !== file.file
          )
        })
    })
  }

  eliminando: string[] = []
  eliminarImagen(img: Imagen) {
    this.eliminando.push(img._id)
    this.skuService.imagen.elimiar(this.sku._id, img._id).subscribe(sku => {
      this.sku.imagenes = this.sku.imagenes.filter(x => x._id !== img._id)
    })
  }
}
