import { Component, OnInit, Inject } from '@angular/core'
import { FamiliaDeProcesos } from '../../../models/familiaDeProcesos.model'
import { FamiliaDeProcesosService } from '../../../services/proceso/familia-de-procesos.service'
import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import { Generales_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/Generales_GUI_CRUD'
import { FamiliaDeProcesosCrearModificarComponent } from '../familiaDeProcesos/familia-de-procesos-crear-modificar.component'
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service'
import { Paginacion } from 'src/app/utils/paginacion.util'
import { Router } from '@angular/router'
import { iPaginadorData } from 'src/app/shared/paginador/paginador.component'

@Component({
  selector: 'app-familia-de-procesos',
  templateUrl: './familia-de-procesos.component.html',
  styles: []
})
export class FamiliaDeProcesosComponent implements OnInit {
  cargando: {} = {}

  totalDeElementos: number
  familiasDeProcesos: FamiliaDeProcesos[] = []
  paginacion = new Paginacion(5, 0, 1, 'nombre')
  termino: string
  detalle: FamiliaDeProcesos = null
  reporteModificar: FamiliaDeProcesos

  mostrarCrear = false

  keys = Object.keys

  cbObservable = termino => {
    this.termino = termino
    this.cargando[
      'termino'
    ] = `Buscando familiasDeProcesos que coincidan con '${termino}'`
    return this.familiaDeProcesossService.findByTerm(termino, this.paginacion)
  }

  constructor(
    public familiaDeProcesossService: FamiliaDeProcesosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargar()
  }

  resultadoDeBusqueda(datos) {
    delete this.cargando['termino']
    this.familiasDeProcesos = datos
    this.totalDeElementos = this.familiaDeProcesossService.total
  }

  cargar() {
    this.cargando['cargar'] = 'Cargando elementos'
    this.familiaDeProcesossService.findAll(this.paginacion).subscribe(p => {
      this.familiasDeProcesos = p
      this.totalDeElementos = this.familiaDeProcesossService.total
      delete this.cargando['cargar']
    })
  }

  error() {
    this.cargar()
  }

  actualizarConsulta(data: iPaginadorData = null) {
    this.cargando['actualizarConsulta'] = 'Actualizando datos de consulta'
    this.paginacion = data ? data.paginacion : this.paginacion

    const cb = familiaDeProcesoss => {
      this.familiasDeProcesos = familiaDeProcesoss
      delete this.cargando['actualizarConsulta']
    }
    const cancelado = () => delete this.cargando['actualizarConsulta']

    if (this.termino) {
      this.familiaDeProcesossService
        .findByTerm(this.termino, this.paginacion)
        .subscribe(cb, cancelado)
    } else {
      this.familiaDeProcesossService
        .findAll(data.paginacion)
        .subscribe(cb, cancelado)
    }
  }

  crear() {
    this.router.navigate(['familiaDeProcesos', 'crear'])
  }

  modificar(id) {
    this.router.navigate(['familiaDeProcesos', 'modificar', id])
  }

  cancelado() {
    this.termino = ''
    this.cargar()
  }

  eliminar(id: string) {
    this.cargando['eliminar'] = 'Eliminando el elemento'
    this.familiaDeProcesossService.delete(id).subscribe(
      () => {
        delete this.cargando['eliminar']
        this.cargar()
      },
      () => delete this.cargando['eliminar']
    )
  }

  cargarDetalle(id: string) {
    this.familiaDeProcesossService
      .findById(id)
      .subscribe(detalle => (this.detalle = detalle))
  }
}
