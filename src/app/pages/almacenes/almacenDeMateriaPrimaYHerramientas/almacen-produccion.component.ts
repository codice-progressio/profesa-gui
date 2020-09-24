import { Component, OnInit } from '@angular/core'
import { ArticuloService } from '../../../services/articulo/articulo.service'
import { Paginacion } from 'src/app/utils/paginacion.util'
import { Router } from '@angular/router'
import { iPaginadorData } from 'src/app/shared/paginador/paginador.component'
import { Articulo } from 'src/app/models/almacenDeMateriaPrimaYHerramientas/articulo.modelo'
import { ExcelService } from '../../../services/excel.service'

@Component({
  selector: 'app-almacen-produccion',
  templateUrl: './almacen-produccion.component.html',
  styles: []
})
export class AlamacenProduccion implements OnInit {
  cargando: {} = {}

  totalDeElementos: number
  articulos: Articulo[] = []
  paginacion = new Paginacion(5, 0, 1, 'nombre')
  termino: string
  detalle: Articulo = null
  reporteModificar: Articulo

  articuloDetalle: Articulo
  mostrarCrear = false

  keys = Object.keys

  cbObservable = termino => {
    this.termino = termino
    this.cargando[
      'termino'
    ] = `Buscando articulos que coincidan con '${termino}'`
    this.paginacion = new Paginacion(
      this.paginacion.limite,
      0,

      this.paginacion.orden,
      this.paginacion.campoDeOrdenamiento
    )
    return this.articulosService.findByTerm(termino, this.paginacion)
  }

  constructor(
    public excelService: ExcelService,
    public articulosService: ArticuloService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargar()
  }

  resultadoDeBusqueda(datos) {
    delete this.cargando['termino']
    this.articulos = datos
    this.totalDeElementos = this.articulosService.total
  }

  cargar() {
    this.cargando['cargar'] = 'Cargando elementos'
    this.articulosService.findAll(this.paginacion).subscribe(p => {
      this.articulos = p
      this.totalDeElementos = this.articulosService.total
      delete this.cargando['cargar']
    })
  }

  error() {
    this.cargar()
  }

  actualizarConsulta(data: iPaginadorData = null) {
    this.cargando['actualizarConsulta'] = 'Actualizando datos de consulta'
    this.paginacion = data ? data.paginacion : this.paginacion

    const cb = articulos => {
      this.articulos = articulos
      delete this.cargando['actualizarConsulta']
    }
    const cancelado = () => delete this.cargando['actualizarConsulta']

    if (this.termino) {
      this.articulosService
        .findByTerm(this.termino, this.paginacion)
        .subscribe(cb, cancelado)
    } else {
      this.articulosService.findAll(data.paginacion).subscribe(cb, cancelado)
    }
  }

  cancelado() {
    this.termino = ''
    this.cargar()
  }

  eliminar(id: string) {
    this.cargando['eliminar'] = 'Eliminando el elemento'
    this.articulosService.delete(id).subscribe(
      () => {
        delete this.cargando['eliminar']
        this.cargar()
      },
      () => delete this.cargando['eliminar']
    )
  }

  generandoReporte = false
  reporteDeExistencias() {
    this.generandoReporte = true
    this.articulosService.existencias().subscribe(
      datos => {
        this.excelService.exportAsExcelFile(
          datos,
          'ALMACEN_PRODUCCION_EXISTENCIAS'
        )

        this.generandoReporte = false
      },
      _ => (this.generandoReporte = false)
    )
  }
}
