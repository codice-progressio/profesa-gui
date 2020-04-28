import { Component, OnInit, Input } from '@angular/core'
import { Articulo } from 'src/app/models/almacenDeMateriaPrimaYHerramientas/articulo.modelo'
import { Location } from '@angular/common'
import { ArticuloService } from '../../../services/articulo/articulo.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-articulo-detalle',
  templateUrl: './articulo-detalle.component.html',
  styles: []
})
export class ArticuloDetalleComponent implements OnInit {
  cargando = {}
  keys = Object.keys

  detalle: Articulo = null

  @Input() mostrarBtnRegresar = true
  _id: string
  @Input() set id(id: string) {
    if (!id) return
    this.cargando['detalle'] = 'Buscando articulo para detalle'
    this.buscar(id)
    this._id = id
    this.mostrarBtnRegresar = false
  }

  get id() {
    return this._id
  }

  constructor(
    public location: Location,
    public articuloService: ArticuloService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    this.cargando['detalle'] = 'Buscando articulo para detalle'
    if (this.id) {
      this.buscar(this.id)
    }
  }

  buscar(id) {
    this.articuloService.findById(id).subscribe(
      art => {
        this.detalle = art
        delete this.cargando['detalle']
      },
      () => delete this.cargando['detalle']
    )
  }

  existenciaEnKg(a: Articulo): number {
    return a.existencia * a.kgPorUnidad
  }
}
