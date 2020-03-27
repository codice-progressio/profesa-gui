import { Component, OnInit } from '@angular/core'
import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import { Tamano } from 'src/app/models/tamano.models'
import { Paginacion } from 'src/app/utils/paginacion.util'
import { TamanoService } from 'src/app/services/modelo/tamano.service'
import { Router } from '@angular/router'
import { iPaginadorData } from 'src/app/shared/paginador/paginador.component'

@Component({
  selector: 'app-tamanos',
  templateUrl: './tamanos.component.html',
  styles: [],
})
export class TamanosComponent implements OnInit {
  cargando: {} = {}

  totalDeElementos: number
  tamanos: Tamano[] = []
  paginacion = new Paginacion(5, 0, 1, 'tamano')
  termino: string
  detalle: Tamano = null
  reporteModificar: Tamano

  tamanoDetalle: Tamano
  mostrarCrear = false

  keys = Object.keys

  cbObservable = termino => {
    this.termino = termino
    this.cargando['termino'] = `Buscando tamanos que coincidan con '${termino}'`
    return this.tamanosService.findByTerm(termino, this.paginacion)
  }

  constructor(public tamanosService: TamanoService, private router: Router) {}

  ngOnInit() {
    this.cargar()
  }

  resultadoDeBusqueda(datos) {
    delete this.cargando['termino']
    this.tamanos = datos
    this.totalDeElementos = this.tamanosService.total
  }

  cargar() {
    this.cargando['cargar'] = 'Cargando elementos'
    this.tamanosService.findAll(this.paginacion).subscribe(p => {
      this.tamanos = p
      this.totalDeElementos = this.tamanosService.total
      delete this.cargando['cargar']
    })
  }

  error() {
    this.cargar()
  }

  actualizarConsulta(data: iPaginadorData = null) {
    this.cargando['actualizarConsulta'] = 'Actualizando datos de consulta'
    this.paginacion = data ? data.paginacion : this.paginacion

    const cb = tamanos => {
      this.tamanos = tamanos
      delete this.cargando['actualizarConsulta']
    }
    const cancelado = () => delete this.cargando['actualizarConsulta']

    if (this.termino) {
      this.tamanosService
        .findByTerm(this.termino, this.paginacion)
        .subscribe(cb, cancelado)
    } else {
      this.tamanosService.findAll(data.paginacion).subscribe(cb, cancelado)
    }
  }

  crear() {
    this.router.navigate(['tamano', 'crear'])
  }

  modificar(id) {
    this.router.navigate(['tamano', 'modificar', id])
  }

  cancelado() {
    this.termino = ''
    this.cargar()
  }

  eliminar(id: string) {
    this.cargando['eliminar'] = 'Eliminando el elemento'
    this.tamanosService.delete(id).subscribe(
      () => {
        delete this.cargando['eliminar']
        this.cargar()
      },
      () => delete this.cargando['eliminar']
    )
  }
}
