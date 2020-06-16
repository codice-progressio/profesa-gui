import { Component, OnInit } from '@angular/core'
import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import { Terminado } from 'src/app/models/terminado.models'
import { Paginacion } from 'src/app/utils/paginacion.util'
import { TerminadoService } from 'src/app/services/modelo/terminado.service'
import { Router } from '@angular/router'
import { iPaginadorData } from 'src/app/shared/paginador/paginador.component'

@Component({
  selector: 'app-terminados',
  templateUrl: './terminados.component.html',
  styles: [],
  providers: [
    { provide: 'paginadorServiceTerminados', useClass: PaginadorService }
  ]
})
export class TerminadosComponent implements OnInit {
  cargando: {} = {}

  totalDeElementos: number
  terminados: Terminado[] = []
  paginacion = new Paginacion(5, 0, 1, 'terminado')
  termino: string
  detalle: Terminado = null
  reporteModificar: Terminado

  terminadoDetalle: Terminado
  mostrarCrear = false

  keys = Object.keys

  cbObservable = termino => {
    this.termino = termino
    this.cargando['termino'] = `Buscando terminados que coincidan con '${termino}'`
    return this.terminadosService.findByTerm(termino, this.paginacion)
  }

  constructor(public terminadosService: TerminadoService, private router: Router) {}

  ngOnInit() {
    this.cargar()
  }

  resultadoDeBusqueda(datos) {
    delete this.cargando['termino']
    this.terminados = datos
    this.totalDeElementos = this.terminadosService.total
  }

  cargar() {
    this.cargando['cargar'] = 'Cargando elementos'
    this.terminadosService.findAll(this.paginacion).subscribe(p => {
      this.terminados = p
      this.totalDeElementos = this.terminadosService.total
      delete this.cargando['cargar']
    })
  }

  error() {
    this.cargar()
  }

  actualizarConsulta(data: iPaginadorData = null) {
    this.cargando['actualizarConsulta'] = 'Actualizando datos de consulta'
    this.paginacion = data ? data.paginacion : this.paginacion

    const cb = terminados => {
      this.terminados = terminados
      delete this.cargando['actualizarConsulta']
    }
    const cancelado = () => delete this.cargando['actualizarConsulta']

    if (this.termino) {
      this.terminadosService
        .findByTerm(this.termino, this.paginacion)
        .subscribe(cb, cancelado)
    } else {
      this.terminadosService.findAll(data.paginacion).subscribe(cb, cancelado)
    }
  }

  crear() {
    this.router.navigate(['terminado', 'crear'])
  }

  modificar(id) {
    this.router.navigate(['terminado', 'modificar', id])
  }

  cancelado() {
    this.termino = ''
    this.cargar()
  }

  eliminar(id: string) {
    this.cargando['eliminar'] = 'Eliminando el elemento'
    this.terminadosService.delete(id).subscribe(
      () => {
        delete this.cargando['eliminar']
        this.cargar()
      },
      () => delete this.cargando['eliminar']
    )
  }
}
