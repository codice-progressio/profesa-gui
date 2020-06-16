import { Component, OnInit, Inject } from '@angular/core'
import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import { Generales_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/Generales_GUI_CRUD'
import { Modelo } from 'src/app/models/modelo.models'
import { ModelosCrearModificarComponent } from './modelos-crear-modificar.component'
import { ModeloService } from 'src/app/services/modelo/modelo.service'
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service'
import { Paginacion } from 'src/app/utils/paginacion.util'
import { Router } from '@angular/router'
import { iPaginadorData } from 'src/app/shared/paginador/paginador.component'

@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  styles: [],
  providers: [
    { provide: 'paginadorServiceModelos', useClass: PaginadorService }
  ]
})
export class ModelosComponent implements OnInit {
  cargando: {} = {}

  totalDeElementos: number
  modelos: Modelo[] = []
  paginacion = new Paginacion(5, 0, 1, 'modelo')
  termino: string
  detalle: Modelo = null
  reporteModificar: Modelo

  modeloDetalle: Modelo
  mostrarCrear = false

  keys = Object.keys

  cbObservable = termino => {
    this.termino = termino
    this.cargando['termino'] = `Buscando modelos que coincidan con '${termino}'`
    return this.modelosService.findByTerm(termino, this.paginacion)
  }

  constructor(public modelosService: ModeloService, private router: Router) {}

  ngOnInit() {
    this.cargar()
  }

  resultadoDeBusqueda(datos) {
    delete this.cargando['termino']
    this.modelos = datos
    this.totalDeElementos = this.modelosService.total
  }

  cargar() {
    this.cargando['cargar'] = 'Cargando elementos'
    this.modelosService.findAll(this.paginacion).subscribe(p => {
      this.modelos = p
      this.totalDeElementos = this.modelosService.total
      delete this.cargando['cargar']
    })
  }

  error() {
    this.cargar()
  }

  actualizarConsulta(data: iPaginadorData = null) {

    this.cargando['actualizarConsulta'] = 'Actualizando datos de consulta'
    this.paginacion = data ? data.paginacion : this.paginacion

    const cb = modelos => {
      this.modelos = modelos
      delete this.cargando['actualizarConsulta']
    }
    const cancelado = () => delete this.cargando['actualizarConsulta']

    if (this.termino) {
      this.modelosService
        .findByTerm(this.termino, this.paginacion)
        .subscribe(cb, cancelado)
    } else {
      this.modelosService.findAll(data.paginacion).subscribe(cb, cancelado)
    }
  }

  crear() {
    this.router.navigate(['modelo', 'crear'])
  }

  modificar(id) {
    this.router.navigate(['modelo', 'modificar', id])
  }

  cancelado() {
    this.termino = ''
    this.cargar()
  }

  eliminar(id: string) {
    this.cargando['eliminar'] = 'Eliminando el elemento'
    this.modelosService.delete(id).subscribe(
      () => {
        delete this.cargando['eliminar']
        this.cargar()
      },
      () => delete this.cargando['eliminar']
    )
  }
}
