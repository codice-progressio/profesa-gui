import { Component, OnInit } from '@angular/core'
import { ModeloCompletoService, ModeloCompletoLigero } from '../../../services/modelo/modelo-completo.service'
import { ModeloCompleto } from 'src/app/models/modeloCompleto.modelo'
import { Paginacion } from 'src/app/utils/paginacion.util'
import { Router } from '@angular/router'
import { iPaginadorData } from 'src/app/shared/paginador/paginador.component'

@Component({
  selector: 'app-modelos-completos',
  templateUrl: './modelos-completos.component.html',
  styles: []
})
export class ModelosCompletosComponent implements OnInit {
  cargando: {} = {}

  totalDeElementos: number
  modelosCompletos: ModeloCompletoLigero[] = []
  paginacion = new Paginacion(5, 0, 1, 'nombreCompleto')
  termino: string
  detalle: ModeloCompleto = null
  reporteModificar: ModeloCompleto

  mostrarCrear = false

  keys = Object.keys

  cbObservable = termino => {
    this.termino = termino
    this.cargando[
      'termino'
    ] = `Buscando SKU's que coincidan con '${termino}'`
    return this.modeloCompletosService.findByTerm(termino, this.paginacion)
  }

  constructor(
    public modeloCompletosService: ModeloCompletoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargar()
  }

  resultadoDeBusqueda(datos) {
    delete this.cargando['termino']
    this.modelosCompletos = datos
    this.totalDeElementos = this.modeloCompletosService.total
  }

  cargar() {
    this.cargando['cargar'] = 'Cargando elementos'
    this.modeloCompletosService.findAll(this.paginacion).subscribe(p => {
      this.modelosCompletos = p
      this.totalDeElementos = this.modeloCompletosService.total
      delete this.cargando['cargar']
    })
  }

  error() {
    this.cargar()
  }

  actualizarConsulta(data: iPaginadorData = null) {
    this.cargando['actualizarConsulta'] = 'Actualizando datos de consulta'
    this.paginacion = data ? data.paginacion : this.paginacion

    const cb = modelosCompletos => {
      this.modelosCompletos = modelosCompletos
      delete this.cargando['actualizarConsulta']
    }
    const cancelado = () => delete this.cargando['actualizarConsulta']

    if (this.termino) {
      this.modeloCompletosService
        .findByTerm(this.termino, this.paginacion)
        .subscribe(cb, cancelado)
    } else {
      this.modeloCompletosService
        .findAll(data.paginacion)
        .subscribe(cb, cancelado)
    }
  }

  crear() {
    this.router.navigate(['sku', 'crear'])
  }

  modificar(id) {
    this.router.navigate(['sku', 'modificar', id])
  }

  cancelado() {
    this.termino = ''
    this.cargar()
  }

  eliminar(id: string) {
    this.cargando['eliminar'] = 'Eliminando el elemento'
    this.modeloCompletosService.delete(id).subscribe(
      () => {
        delete this.cargando['eliminar']
        this.cargar()
      },
      () => delete this.cargando['eliminar']
    )
  }

  cargarDetalle(id: string) {
    this.detalle = null
    this.modeloCompletosService
      .findById(id)
      .subscribe(detalle => (this.detalle = detalle))
  }
}
