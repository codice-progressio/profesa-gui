import { Component, OnInit, Input } from '@angular/core'
import { VisorDeImagenesService } from './visor-de-imagenes.service'

/**
 *Las imagenes que le pasemos a este paginador
 ya deben de traer la estructura correcta. Dentro 
 no se hace ninguna afectacion a la url. 
 *
 * @export
 * @class VisorDeImagenesConPaginacionComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'codice-visor-de-imagenes',
  templateUrl: './visor-de-imagenes-con-paginacion.component.html',
  styleUrls: ['./visor-de-imagenes-con-paginacion.component.css']
})
export class VisorDeImagenesConPaginacionComponent implements OnInit {
  @Input() arregloDeImagenes: string[] = []

  indiceActual: number = 0
  imagenActual: string = null
  totalDeImagenes: number = 0
  mostrarPaginador: boolean = false

  constructor(public _visorDeImagenesService: VisorDeImagenesService) {}

  ngOnInit() {
    this.iniciarPaginador()
  }

  iniciarPaginador() {
    this.mostrarPaginador = this.arregloDeImagenes.length > 1
    this.totalDeImagenes = this.arregloDeImagenes.length - 1
    this.setImagenActual()
  }

  mostrarImagen(img: string) {
    if (img) this._visorDeImagenesService.mostrarImagen(img)
  }

  anterior() {
    if (this.indiceActual > 0) {
      this.indiceActual--
      this.setImagenActual()
    }
  }
  siguiente() {
    let tamanoDeArreglo = this.arregloDeImagenes.length - 1
    if (this.indiceActual < tamanoDeArreglo) {
      this.indiceActual++
      this.setImagenActual()
    }
  }

  setImagenActual() {
    this.imagenActual = this.arregloDeImagenes[this.indiceActual]
  }
}
