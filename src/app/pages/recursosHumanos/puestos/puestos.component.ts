import { Component, OnInit } from '@angular/core'
import { Puesto } from 'src/app/models/recursosHumanos/puestos/puesto.model'
import { PuestosCrearModificarComponent } from './puestos-crear-modificar.component'
import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import { PuestoService } from 'src/app/services/recursosHumanos/puesto.service'
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service'
import { PuestoFiltros } from 'src/app/services/utilidades/filtrosParaConsultas/puesto.filtros'
import { Empleado } from 'src/app/models/recursosHumanos/empleados/empleado.model'

@Component({
  selector: 'app-puestos',
  templateUrl: './puestos.component.html',
  styles: []
})
export class PuestosComponent implements OnInit {
  buscando: boolean = false
  puestos: Puesto[] = []
  puestoDetalle: Puesto = null
  puestoModificar: Puesto = null
  componenteCrearModificar: PuestosCrearModificarComponent
  detalleEmpleado: Empleado = null

  cbObserbable = termino =>
    this._puestoService.search(termino, undefined, undefined, Puesto)

  constructor(
    public _paginadorService: PaginadorService,
    public _puestoService: PuestoService,
    public _msjService: ManejoDeMensajesService
  ) {
    this._paginadorService.callback = () => this.cargarPuestos()
  }

  ngOnInit() {
    this._paginadorService.activarPaginador(1)
    this.cargarPuestos()
  }

  cargarPuestos() {
    this._puestoService
      .filtros(new PuestoFiltros(this._puestoService))
      .setDesde(this._paginadorService.desde)
      .setLimite(this._paginadorService.limite)
      .setSortCampos([['puesto', 1]])

      .servicio.todo()
      .subscribe(puestos => {
        this.puestos = puestos
        this._paginadorService.activarPaginador(this._puestoService.total)
        // this._puestoService.autoPopulate(this.puestos)
      })
  }

  resultadoBusqueda(puestos: Puesto[]) {
    this.puestos = puestos
  }

  cancelado() {
    this.buscando = false
    this.cargarPuestos()
  }

  error(error) {
    this._msjService.err(error)
    throw error
  }

  crear() {
    this.componenteCrearModificar.crear()
  }

  asignarDetalle(puesto: Puesto) {
    this.puestoDetalle = puesto
  }

  editar(puesto: Puesto) {
    this.puestoDetalle = puesto
    this.componenteCrearModificar.modificar(puesto)
  }

  eliminar(puesto: Puesto) {
    let msj = 'Esta accion no se puede deshacer.'

    this._msjService.confirmacionDeEliminacion(msj, () => {
      this._puestoService.eliminar(puesto._id).subscribe(() => {
        this.limpiar()
        this.cargarPuestos()
      })
    })
  }

  limpiar() {
    this.puestoDetalle = null
    this.puestoModificar = null
  }

  guardar() {
    this.limpiar()
    this.cargarPuestos()
  }
}
