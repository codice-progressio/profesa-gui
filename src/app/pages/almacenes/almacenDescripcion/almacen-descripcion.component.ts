import { Component, OnInit } from '@angular/core'
import { AlmacenDescripcion } from '../../../models/almacenDeMateriaPrimaYHerramientas/almacen-descripcion.model'
import { AlmacenDescripcionService } from '../../../services/almacenDeMateriaPrimaYHerramientas/almacen-descripcion.service'
import { Paginacion } from 'src/app/utils/paginacion.util'
import { Router } from '@angular/router'
import { iPaginadorData } from 'src/app/shared/paginador/paginador.component'

@Component({
  selector: 'app-almacen-descripcion',
  templateUrl: './almacen-descripcion.component.html',
  styles: []
})
export class AlmacenDescripcionComponent implements OnInit {
  cargando: {} = {}

  totalDeElementos: number
  almacenesDescripcion: AlmacenDescripcion[] = []
  paginacion = new Paginacion(5, 0, 1, 'nombre')
  termino: string
  detalle: AlmacenDescripcion = null
  reporteModificar: AlmacenDescripcion

  almacenDescripcionDetalle: AlmacenDescripcion
  mostrarCrear = false

  keys = Object.keys

  cbObservable = termino => {
    this.termino = termino
    this.cargando[
      'termino'
    ] = `Buscando almacenes que coincidan con '${termino}'`
    return this.almacenDescripcionService.findByTerm(termino, this.paginacion)
  }

  constructor(
    public almacenDescripcionService: AlmacenDescripcionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargar()
  }

  resultadoDeBusqueda(datos) {
    delete this.cargando['termino']
    this.almacenesDescripcion = datos
    this.totalDeElementos = this.almacenDescripcionService.total
  }

  cargar() {
    this.cargando['cargar'] = 'Cargando elementos'
    this.almacenDescripcionService.findAll(this.paginacion).subscribe(p => {
      this.almacenesDescripcion = p
      this.totalDeElementos = this.almacenDescripcionService.total
      delete this.cargando['cargar']
    })
  }

  error() {
    this.cargar()
  }

  actualizarConsulta(data: iPaginadorData = null) {
    this.cargando['actualizarConsulta'] = 'Actualizando datos de consulta'
    this.paginacion = data ? data.paginacion : this.paginacion

    const cb = almacendescripcions => {
      this.almacenesDescripcion = almacendescripcions
      delete this.cargando['actualizarConsulta']
    }
    const cancelado = () => delete this.cargando['actualizarConsulta']

    if (this.termino) {
      this.almacenDescripcionService
        .findByTerm(this.termino, this.paginacion)
        .subscribe(cb, cancelado)
    } else {
      this.almacenDescripcionService
        .findAll(data.paginacion)
        .subscribe(cb, cancelado)
    }
  }

  crear() {
    this.router.navigate(['almacenDescripcion', 'crear'])
  }

  modificar(id) {
    this.router.navigate(['almacenDescripcion', 'modificar', id])
  }

  cancelado() {
    this.termino = ''
    this.cargar()
  }

  eliminar(id: string) {
    this.cargando['eliminar'] = 'Eliminando el elemento'
    this.almacenDescripcionService.delete(id).subscribe(
      () => {
        delete this.cargando['eliminar']
        this.cargar()
      },
      () => delete this.cargando['eliminar']
    )
  }
}
