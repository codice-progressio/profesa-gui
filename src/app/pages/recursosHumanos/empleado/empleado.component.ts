import { Component, OnInit, Renderer2 } from '@angular/core'
import { Empleado } from '../../../models/recursosHumanos/empleados/empleado.model'
import { EmpleadoService } from '../../../services/recursosHumanos/empleado.service'
import { EmpleadoFiltrosComponent } from './empleado-filtros/empleado-filtros.component'
import { EmpleadoCrearModificarComponent } from './empleado-crear-modificar.component'
import { Puesto } from '../../../models/recursosHumanos/puestos/puesto.model'
import { ManejoDeMensajesService } from '../../../services/utilidades/manejo-de-mensajes.service'
import { PuestoService } from '../../../services/recursosHumanos/puesto.service'
import { EmpleadoEventosCrearModalComponent } from './empleado-eventos-crear/empleado-eventos-crear-modal/empleado-eventos-crear-modal.component'
import { Paginacion } from 'src/app/utils/paginacion.util'
import { iPaginadorData } from '../../../shared/paginador/paginador.component'
import { EmpleadoEventoEstatusLaboralComponent } from './empleado-eventos/empleado-evento-estatus-laboral.component'
import permisosKeysConfig from 'src/app/config/permisosKeys.config'


@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styles: []
})
export class EmpleadoComponent implements OnInit {
  empleadoDetalle: Empleado
  puestoDetalle: Empleado["puestoActualTexto"]
  empleados: Empleado[] = []
  empleadoModificar: Empleado = null
  buscando: boolean = false

  permisos = permisosKeysConfig

  empleadoFiltrosComponent: EmpleadoFiltrosComponent
  componenteCrearModificar: EmpleadoCrearModificarComponent

  empleadoSeleccionado: Empleado
  nuevaFechaIngresoEmpleado: Date
  empleadoSeleccionadoParaModificar: Empleado
  totalDeElementos: number
  cargando: boolean = false
  paginacion = new Paginacion(5, 0, 1, 'nombres')

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
    // xxTEMPORALMENTE EN DESUSOxx
    // {
    //   title: 'Agregar curso',
    //   class: 'btn-outline-info',
    //   text: 'CURSO',
    //   cb: () => this.mec.curso()
    // },
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
    public _msjService: ManejoDeMensajesService,
    public _puestoService: PuestoService  ) {}

  ngOnInit() {
    this.cargarEmpleados()
  }

  /**
   *  Carga los empleados e inicializa el paginador. Muy importante tener
   * en cuenta que el inicializador del paginador es el total.
   *
   * @memberof EmpleadoComponent
   */

  cargarEmpleados() {
    this.termino = null
    this._empleadoService.findAll(this.paginacion).subscribe(empleados => {
      this.empleados = empleados
      this.totalDeElementos = this._empleadoService.total
    })
  }

  actualizarConsulta(data: iPaginadorData = null) {
    this.cargando = true
    this.paginacion = data ? data.paginacion : this.paginacion

    const cb = empleados => {
      this.empleados = empleados
      this.cargando = false
    }

    if (this.termino) {
      this._empleadoService.find(this.termino, this.paginacion).subscribe(cb)
    } else {
      this._empleadoService.findAll(data.paginacion).subscribe(cb)
    }
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

  modificandoIngreso = false
  modificarIngreso() {
    if (!this.nuevaFechaIngresoEmpleado){
      this._msjService.invalido('Selecciona una fecha')
      return
    }
    this.modificandoIngreso = true
    this._empleadoService.updateIngresoEmpleado(
      this.empleadoSeleccionadoParaModificar._id,
      this.nuevaFechaIngresoEmpleado
      ).subscribe(
        x => {
          this.cargarEmpleados()
          this.modificandoIngreso = false
        },
        err => {
          this.modificandoIngreso = false
        }
      )
  }

  termino: string = null
  cbObservable = termino => {
    if (this.empleadoFiltrosComponent) this.empleadoFiltrosComponent.limpiar()
    this.paginacion = new Paginacion(5, 0, 1, 'nombres')
    this.termino = termino
    return this._empleadoService.find(termino, this.paginacion)
  }

  resultadoDeBusqueda(datos: Empleado[]) {
    this.totalDeElementos = this._empleadoService.total
    this.empleados = datos
  }

  cancelado() {
    this.cargarEmpleados()
  }

  error(err: any) {
    throw err
  }
  asiganarDetalleDePuesto(puesto: Puesto) {
    // this.puestoDetalle = puesto
  }

  eliminar(empleado: Empleado) {
    let msj1 =
      'Esta accion no se puede deshacer. Siempre es mejor dar de baja al empleado.'

    let msj2 =
      'Si estas completamente seguro de lo que haces continua, de lo contrario cancela.'

    this._msjService.confirmacionDeEliminacion(msj1, () => {
      this._msjService.confirmacionDeEliminacion(msj2, () => {
        this._empleadoService.delete(empleado._id).subscribe(() => {
          this.cargarEmpleados()
        })
      })
    })
  }
}
