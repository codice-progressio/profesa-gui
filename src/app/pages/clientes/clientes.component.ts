import { Component, OnInit } from '@angular/core'
import { Cliente } from 'src/app/models/cliente.models'
import { ClienteService } from '../../services/cliente/cliente.service'
import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import { ClientesCrearModificarComponent } from './clientes-crear-modificar.component'
import { ManejoDeMensajesService } from '../../services/utilidades/manejo-de-mensajes.service'
import { Paginacion } from 'src/app/utils/paginacion.util'
import { Router } from '@angular/router'
import { iPaginadorData } from 'src/app/shared/paginador/paginador.component'

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: []
})
export class ClientesComponent implements OnInit {
  cargando: {} = {}

  totalDeElementos: number
  clientes: Cliente[] = []
  paginacion = new Paginacion(5, 0, 1, 'cliente')
  termino: string
  detalle: Cliente = null
  reporteModificar: Cliente

  clienteDetalle: Cliente
  mostrarCrear = false

  keys = Object.keys

  cbObservable = termino => {
    this.termino = termino
    this.cargando[
      'termino'
    ] = `Buscando clientes que coincidan con '${termino}'`
    return this.clientesService.findByTerm(termino, this.paginacion)
  }

  constructor(
    public clientesService: ClienteService,
    private router: Router,
    private msjService: ManejoDeMensajesService
  ) {}

  ngOnInit() {
    this.cargar()
  }

  resultadoDeBusqueda(datos) {
    delete this.cargando['termino']
    this.clientes = datos
    this.totalDeElementos = this.clientesService.total
  }

  cargar() {
    this.cargando['cargar'] = 'Cargando elementos'
    this.clientesService.findAll(this.paginacion).subscribe(p => {
      this.clientes = p
      this.totalDeElementos = this.clientesService.total
      delete this.cargando['cargar']
    })
  }

  error() {
    this.cargar()
  }

  actualizarConsulta(data: iPaginadorData = null) {
    this.cargando['actualizarConsulta'] = 'Actualizando datos de consulta'
    this.paginacion = data ? data.paginacion : this.paginacion

    const cb = clientes => {
      this.clientes = clientes
      delete this.cargando['actualizarConsulta']
    }
    const cancelado = () => delete this.cargando['actualizarConsulta']

    if (this.termino) {
      this.clientesService
        .findByTerm(this.termino, this.paginacion)
        .subscribe(cb, cancelado)
    } else {
      this.clientesService.findAll(data.paginacion).subscribe(cb, cancelado)
    }
  }

  crear() {
    this.router.navigate(['cliente', 'crear'])
  }

  modificar(id) {
    this.router.navigate(['cliente', 'modificar', id])
  }

  cancelado() {
    this.termino = ''
    this.cargar()
  }

  eliminar(id: string) {
    this.msjService.confirmacionDeEliminacion(
      'Esta accion no se puede deshacer y eliminara tambien todos los folios e informacion relacionada con este elemento. Aun asi quieres continuar?',
      () => {
        this.cargando['eliminar'] = 'Eliminando el elemento'
        this.clientesService.delete(id).subscribe(
          () => {
            delete this.cargando['eliminar']
            this.cargar()
          },
          () => delete this.cargando['eliminar']
        )
      }
    )
  }
}
