import { Component, OnInit, Inject } from '@angular/core'
import { Proceso } from 'src/app/models/proceso.model'
import { ProcesosCrearModificarComponent } from './procesos-crear-modificar.component'
import { Generales_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/Generales_GUI_CRUD'
import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import { ProcesoService } from 'src/app/services/proceso/proceso.service'
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service'
import { Paginacion } from '../../../utils/paginacion.util'
import { iPaginadorData } from 'src/app/shared/paginador/paginador.component'
import { NgIf } from '@angular/common'
import { Router } from '@angular/router'

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styles: [],
  providers: [
    { provide: 'paginadorServiceProcesos', useClass: PaginadorService }
  ]
})
export class ProcesosComponent implements OnInit {
  cargando: {} = {}
  paginador: Paginacion

  totalDeElementos: number
  procesos: Proceso[] = []
  paginacion = new Paginacion(5, 0, 1, 'nombres')
  termino: string
  detalle: Proceso = null
  reporteModificar: Proceso

  crearModificarComponente: ProcesosCrearModificarComponent

  procesoDetalle: Proceso
  mostrarCrear = false

  keys = Object.keys

  cbObservable = termino => {
    this.cargando[
      'termino'
    ] = `Buscando procesos que coincidan con '${termino}'`
    return this.procesoService.find(termino, new Paginacion(5, 0, 1, 'nombre'))
  }

  constructor(public procesoService: ProcesoService, private router: Router) {}

  ngOnInit() {
    this.cargar()
  }

  resultadoDeBusqueda(datos) {
    delete this.cargando['termino']
    this.procesos = datos
    this.totalDeElementos = this.procesoService.total
  }

  cargar() {
    this.cargando['cargar'] = 'Cargando elementos'
    this.procesoService.findAll(this.paginacion).subscribe(p => {
      this.procesos = p
      this.totalDeElementos = this.procesoService.total
      delete this.cargando['cargar']
    })
  }

  error(evento) {
    this.cargar()
  }

  actualizarConsulta(data: iPaginadorData = null) {
    this.cargando['actualizarConsulta'] = 'Actualizando datos de consulta'
    this.paginacion = data ? data.paginacion : this.paginacion

    const cb = procesos => {
      this.procesos = procesos
      delete this.cargando['actualizarConsulta']
    }
    const cancelado = err => delete this.cargando['actualizarConsulta']

    if (this.termino) {
      this.procesoService
        .find(this.termino, this.paginacion)
        .subscribe(cb, cancelado)
    } else {
      this.procesoService.findAll(data.paginacion).subscribe(cb, cancelado)
    }
  }

  crear() {
    this.router.navigate(['proceso', 'crear'])
  }

  modificar(id) {
    this.router.navigate(['proceso', 'modificar', id])
  }

  cancelado() {
    this.cargar()
  }

  eliminar(id: string) {
    this.cargando['eliminar'] = 'Eliminando el elemento'
    this.procesoService.delete(id).subscribe(
      Dato => {
        delete this.cargando['eliminar']
        this.cargar()
      },
      err => delete this.cargando['eliminar']
    )
  }
}
