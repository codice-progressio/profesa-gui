import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core'
import { Empleado } from '../../../models/recursosHumanos/empleados/empleado.model'
import { EmpleadoService } from '../../../services/recursosHumanos/empleado.service'
import { PaginadorService } from '../../../components/paginador/paginador.service'
import { EmpleadoFiltros } from 'src/app/services/utilidades/filtrosParaConsultas/empleado.filtros'
import { EmpleadoFiltrosComponent } from './empleado-filtros/empleado-filtros.component'
import { EmpleadoCrearModificarComponent } from './empleado-crear-modificar.component'
import { Puesto } from '../../../models/recursosHumanos/puestos/puesto.model'
import { ManejoDeMensajesService } from '../../../services/utilidades/manejo-de-mensajes.service'
import { PuestoService } from '../../../services/recursosHumanos/puesto.service'
import { EmpleadoEventosCrearModalComponent } from './empleado-eventos-crear/empleado-eventos-crear-modal/empleado-eventos-crear-modal.component'

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

  empleadoSeleccionado: Empleado

  cbObservable = termino => {
    if (this.empleadoFiltrosComponent) this.empleadoFiltrosComponent.limpiar()
    
    return this._empleadoService.search(termino, undefined, undefined, Empleado)
  }

  _idModal: string
  set idAgregarEventoModal(id) {
    this._idModal = id
  }

  get idAgregarEventoModal(): string {
    return '#' + this._idModal
  }

  _modalEv: EmpleadoEventosCrearModalComponent
  /**
   *Modal Eventos componente
   *
   * @type {EmpleadoEventosCrearModalComponent}
   * @memberof EmpleadoComponent
   */
  set mec(e) {
    this._modalEv = e
    this.idAgregarEventoModal = this._modalEv.idModal
  }
  get mec(): EmpleadoEventosCrearModalComponent {
    return this._modalEv
  }

  botonesEventos: {
    title: string
    class: string
    text: string
    cb: () => any
  }[] = [
    {
      title: 'Agregar curso',
      class: 'btn-outline-info',
      text: 'CURSO',
      cb: () => this.mec.curso()
    },
    {
      title: 'Agregar temporada de vacaciones',
      class: 'btn-warning',
      text: 'VACACIONES',
      cb: () => this.mec.vacaciones()
    },
    {
      title: 'Agregar cambio de sueldo',
      class: 'btn-primary',
      text: 'AUMENTO',
      cb: () => this.mec.cambiosDeSueldo()
    },
    {
      title: 'Modificar puesto',
      class: 'btn-info',
      text: 'PUESTO',
      cb: () => this.mec.puesto()
    },
    {
      title: 'Felicitaciones por escrito',
      class: 'btn-secondary',
      text: 'FELICITACION',
      cb: () => this.mec.felicitacionPorEscrito()
    },
    {
      title: 'Amonestacion por escrito',
      class: 'btn-danger text-white',
      text: 'AMONESTACION',
      cb: () => this.mec.amonestacionPorEscrito()
    },
    {
      title: 'Castigo',
      class: 'btn-dark text-white',
      text: 'CASTIGO',
      cb: () => this.mec.castigo()
    },
    {
      title: 'Permiso',
      class: 'btn-outline-success',
      text: 'PERMISO',
      cb: () => this.mec.permiso()
    },
    {
      title: 'Bono',
      class: 'btn-success',
      text: 'BONO',
      cb: () => this.mec.bono()
    },
    {
      title: 'Estatus laboral',
      class: 'btn-outline-primary',
      text: 'ESTATUS',
      cb: () => this.mec.estatusLaboral()
    }
  ]

  constructor(
    private _empleadoService: EmpleadoService,
    public _paginadorService: PaginadorService,
    public _msjService: ManejoDeMensajesService,
    public _puestoService: PuestoService,
    private _render: Renderer2
  ) {}

  ngOnInit() {
    this._paginadorService.activarPaginador(1)
    this.cargarEmpleados()
  }

  cargarEmpleados(termino: string = null) {
    this.buscando = true

    this.aplicarFiltros(
      this._empleadoService.filtros(new EmpleadoFiltros(this._empleadoService)),
      this.empleadoFiltrosComponent
    )
      .setDesde(this._paginadorService.desde)
      .setLimite(this._paginadorService.limite)
      .servicio.todo()
      .subscribe(
        empleados => {
          this.buscando = false
          this.empleados = empleados
          this._paginadorService.activarPaginador(this._empleadoService.total)
        },
        err => (this.buscando = false)
      )
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
