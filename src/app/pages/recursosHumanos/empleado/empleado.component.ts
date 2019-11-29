import { Component, OnInit } from '@angular/core'
import { Empleado } from '../../../models/recursosHumanos/empleados/empleado.model'
import { EmpleadoService } from '../../../services/recursosHumanos/empleado.service'
import { PaginadorService } from '../../../components/paginador/paginador.service'
import { EmpleadoFiltros } from 'src/app/services/utilidades/filtrosParaConsultas/empleado.filtros'
import { EmpleadoFiltrosComponent } from './empleado-filtros/empleado-filtros.component'
import { EmpleadoCrearModificarComponent } from './empleado-crear-modificar.component'
import { Puesto } from '../../../models/recursosHumanos/puestos/puesto.model'
import { ManejoDeMensajesService } from '../../../services/utilidades/manejo-de-mensajes.service'
import { PuestoService } from '../../../services/recursosHumanos/puesto.service'

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styles: []
})
export class EmpleadoComponent implements OnInit {
  empleadoDetalle: Empleado
  puestoDetalle: Puesto
  empleados: Empleado[] = []
  empleadoModificar: Empleado = null
  buscando: boolean = false

  empleadoFiltrosComponent: EmpleadoFiltrosComponent
  componenteCrearModificar: EmpleadoCrearModificarComponent

  cbObservable = termino => {
    this.empleadoFiltrosComponent.limpiar()
    this.cargarEmpleados(termino)
  }

  constructor(
    private _empleadoService: EmpleadoService,
    public _paginadorService: PaginadorService,
    public _msjService: ManejoDeMensajesService,
    public _puestoService: PuestoService
  ) {}

  ngOnInit() {
    this.cargarEmpleados()
  }

  cargarEmpleados(termino: string = null) {
    this.buscando = false

    this.aplicarFiltros(
      this._empleadoService.filtros(new EmpleadoFiltros(this._empleadoService)),
      this.empleadoFiltrosComponent
    )
      .setDesde(this._paginadorService.desde)
      .setLimite(this._paginadorService.limite)
      .servicio.todo()
      .subscribe(empleados => {
        this.empleados = empleados
      })
  }

  private aplicarFiltros(
    filtros: EmpleadoFiltros<EmpleadoService>,
    c: EmpleadoFiltrosComponent
  ): EmpleadoFiltros<EmpleadoService> {
    if (!c) return filtros

    filtros.set_activo(c.activo).set_puestoActual(c.puestoActual._id)

    return filtros
  }

  guardar() {
    this.cargarEmpleados()
  }

  crear() {
    this.componenteCrearModificar.crear()
  }

  modificar(empleado: Empleado) {
    this.componenteCrearModificar.crear(empleado)
  }

  resultadoDeBusqueda(datos: Empleado[]) {
    this.empleados = datos
  }

  cancelado() {
    console.log('Busqueda por termino cancelada.')
    this.cargarEmpleados()
  }

  error(err: any) {
    throw err
  }
  asiganarDetalleDePuesto(puesto: Puesto) {
    this._puestoService.autoPopulate([puesto])
    this.puestoDetalle = puesto
  }

  eliminar(empleado: Empleado) {
    let msj1 =
      'Esta accion no se puede deshacer. Siempre es mejor dar de baja al empleado.'

    let msj2 =
      'Si estas completamente seguro de lo que haces continua, de lo contrario cancela.'

    this._msjService.confirmacionDeEliminacion(msj1, dato => {
      this._msjService.confirmacionDeEliminacion(msj2, () => {
        this._empleadoService.eliminar(empleado._id).subscribe(() => {
          this.cargarEmpleados()
        })
      })
    })
  }
}
