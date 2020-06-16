import { Component, OnInit } from '@angular/core'
import { Color } from 'src/app/models/color.models'
import { ColorService } from '../../../services/modelo/color.service'
import { Paginacion } from 'src/app/utils/paginacion.util'
import { Router } from '@angular/router'
import { iPaginadorData } from 'src/app/shared/paginador/paginador.component'

@Component({
  selector: 'app-colores',
  templateUrl: './colores.component.html',
  styles: []
})
export class ColoresComponent implements OnInit {
  cargando: {} = {}

  totalDeElementos: number
  colores: Color[] = []
  paginacion = new Paginacion(5, 0, 1, 'color')
  termino: string
  detalle: Color = null
  reporteModificar: Color

  colorDetalle: Color
  mostrarCrear = false

  keys = Object.keys

  cbObservable = termino => {
    this.cargando[
      'termino'
    ] = `Buscando colores que coincidan con '${termino}'`
    return this.coloresService.findByTerm(termino, new Paginacion(5, 0, 1, 'color'))
  }

  constructor(public coloresService: ColorService, private router: Router) {}

  ngOnInit() {
    this.cargar()
  }

  resultadoDeBusqueda(datos) {
    delete this.cargando['termino']
    this.colores = datos
    this.totalDeElementos = this.coloresService.total
  }

  cargar() {
    this.cargando['cargar'] = 'Cargando elementos'
    this.coloresService.findAll(this.paginacion).subscribe(p => {
      this.colores = p
      this.totalDeElementos = this.coloresService.total
      delete this.cargando['cargar']
    })
  }

  error() {
    this.cargar()
  }

  actualizarConsulta(data: iPaginadorData = null) {
    this.cargando['actualizarConsulta'] = 'Actualizando datos de consulta'
    this.paginacion = data ? data.paginacion : this.paginacion

    const cb = colores => {
      this.colores = colores
      delete this.cargando['actualizarConsulta']
    }
    const cancelado = () => delete this.cargando['actualizarConsulta']

    if (this.termino) {
      this.coloresService
        .findByTerm(this.termino, this.paginacion)
        .subscribe(cb, cancelado)
    } else {
      this.coloresService.findAll(data.paginacion).subscribe(cb, cancelado)
    }
  }

  crear() {
    this.router.navigate(['color', 'crear'])
  }

  modificar(id) {
    this.router.navigate(['color', 'modificar', id])
  }

  cancelado() {
    this.cargar()
  }

  eliminar(id: string) {
    this.cargando['eliminar'] = 'Eliminando el elemento'
    this.coloresService.delete(id).subscribe(
      () => {
        delete this.cargando['eliminar']
        this.cargar()
      },
      () => delete this.cargando['eliminar']
    )
  }
}
