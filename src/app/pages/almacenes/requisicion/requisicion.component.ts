import { Component, OnInit } from '@angular/core'
import { Requisicion } from 'src/app/models/requisiciones/requisicion.model'
import { RequisicionCrearModificarComponent } from './requisicion-crear-modificar.component'
import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service'
import { RequisicionService } from 'src/app/services/requisiciones/requisicion.service'
import { RequisicionFiltros } from 'src/app/services/utilidades/filtrosParaConsultas/requisicion.filtro'
import { Proveedor } from 'src/app/models/proveedores/proveedor.model'
import { Divisa } from 'src/app/models/divisas/divisa.model'
import { RecibirParcialidadComponent } from './estatus/requisicion-estatus-es-entrega-parcial/recibirParcialidad/recibir-parcialidad.component'
import { RecibirTerminacionComponent } from './estatus/requisicion-estatus-es-terminada/recibir-terminacion/recibir-terminacion.component'
import { RecibirCancelacionComponent } from './estatus/requisicion-estatus-es-cancelada/recibir-cancelacion/recibir-cancelacion.component'
import { RequisicionFiltrosComponent } from './requisicion-filtros/requisicion-filtros.component'
import { UsuarioService } from '../../../services/usuario/usuario.service'
import { _ROLES } from '../../../config/roles.const'
import { EstatusRequisicion } from '../../../models/requisiciones/estatusRequisicion.model'
import per from 'src/app/config/permisosKeys.config'
import { Paginacion } from '../../../utils/paginacion.util'
import { iPaginadorData } from '../../../shared/paginador/paginador.component'
import { ContieneElPermisoPipe } from '../../../pipes/contiene-el-permiso.pipe'
@Component({
  selector: 'app-requisicion',
  templateUrl: './requisicion.component.html',
  styles: []
})
export class RequisicionComponent implements OnInit {
  buscando: boolean = false
  requisiciones: Requisicion[] = []
  requisicionDetalle: Requisicion = null
  requisicionModificar: Requisicion = null
  requsicionRecibirParcialidad: Requisicion = null
  requsicionRecibirTerminacion: Requisicion = null
  requsicionRecibirCancelacion: Requisicion = null
  componenteCrearModificar: RequisicionCrearModificarComponent
  componenteRecibirCancelacion: RecibirCancelacionComponent
  // cbObservable = this._requisicionService.buscar
  componenteFiltrador: RequisicionFiltrosComponent = null

  detalleProveedor: Proveedor
  detalleDivisa: Divisa

  permisos = per
  cargando = {}
  keys = Object.keys
  paginacion = new Paginacion(5, 0, -1, 'folio')
  // Almacena los filtros de manera temporal
  filtros = ''

  mostrarObservaciones: string[] = []

  constructor(
    public requisicionService: RequisicionService,
    public msjService: ManejoDeMensajesService,
    public usuarioService: UsuarioService,
    public cPerPipe: ContieneElPermisoPipe
  ) {}

  ngOnInit() {
    this.cargarRequisiciones()
  }

  cargarRequisiciones(
    filtros = '',
    paginador: iPaginadorData = null,
    paginadorEspecial = false
  ) {
    this.filtros = filtros

    if (paginador) this.paginacion = paginador.paginacion
    if (paginadorEspecial)
      this.paginacion = new Paginacion(
        this.paginacion.limite,
        0,
        this.paginacion.orden,
        this.paginacion.campoDeOrdenamiento
      )

    this.cargando['filtro'] = 'Aplicando filtros'
    this.requisicionService.findAll(this.paginacion, filtros).subscribe(
      requisiciones => {
        this.requisiciones = requisiciones
        delete this.cargando['filtro']
      },
      () => delete this.cargando['filtro']
    )
  }

  resultadoBusqueda(requisiciones: Requisicion[]) {
    this.buscando = false
    this.requisiciones = requisiciones
  }

  cancelado() {
    this.buscando = false
    this.cargarRequisiciones()
  }

  error(error) {
    this.buscando = false
    this.msjService.err(error)
    throw error
  }

  eliminar(requisicion: Requisicion) {
    let msj =
      'Esta accion no se puede deshacer y solo deberias hacerla si eres el administrador'
    this.msjService.confirmacionDeEliminacion(msj, () => {
      this.requisicionService.delete(requisicion._id).subscribe(() => {
        this.limpiar()
        this.cargarRequisiciones()
      })
    })
  }

  limpiar() {
    this.requisicionDetalle = null
    this.requisicionModificar = null
  }

  guardar() {
    this.limpiar()
    this.cargarRequisiciones()
  }

  asignarDetalleProveedor(proveedor: Proveedor) {
    this.detalleProveedor = proveedor
  }
  asignarDetalleDivisa(divisa: Divisa) {
    this.detalleDivisa = divisa
  }

  recargar() {
    this.cargarRequisiciones()
  }

  mostrarBtnEliminarRequisicion(requisicion: Requisicion): boolean {
    if (!this.cPerPipe.transform(per['requisicion:eliminar'])) return false
    return requisicion.estatus.esRequisicion
  }

  mostrarBtnEditarRequisicion(requisicion: Requisicion): boolean {
    if (!this.cPerPipe.transform(per['requisicion:modificar'])) return false
    return requisicion.estatus.esRequisicion
  }

  mostrarBtnGenerarCompra(req: Requisicion): boolean {
    if (!this.cPerPipe.transform(per['requisicion:estatus:generarCompra']))
      return false
    return req.estatus.esRequisicion
  }
  mostrarBtnRecibirParcialidad(req: Requisicion): boolean {
    if (req.cantidad === req.estatus.cantidadEntregadaALaFecha) return false
    return this.comprobarBtnRecibirParcialidadLogica(req)
  }

  private comprobarBtnRecibirParcialidadLogica(req: Requisicion) {
    let e = req.estatus

    if (!this.cPerPipe.transform(per['requisicion:estatus:agregarParcialidad']))
      return false
    //Es una orden de compra o parcialidad
    let ordenOParcialidad = this.esOrdenOEsParcialidad(e)
    // No esta terminada o cancelada
    let terminadaOCancelada = this.esTerminadaOEsCancelada(e)
    return ordenOParcialidad && !terminadaOCancelada
  }

  mostrarBtnTerminarRequisicion(req: Requisicion): boolean {
    let e = req.estatus

    if (
      this.esRequisicionOEsCancelada(e) ||
      !this.cPerPipe.transform(per['requisicion:estatus:finalizar'])
    )
      return false

    return !e.esTerminada
  }
  mostrarBtnCancelarRequisicion(req: Requisicion): boolean {
    let e = req.estatus
    if (!this.cPerPipe.transform(per['requisicion:estatus:cancelar']))
      return false

    return !e.esTerminada
  }

  private esTerminadaOEsCancelada(e: EstatusRequisicion): boolean {
    return e.esTerminada || e.esCancelada
  }
  private esRequisicionOEsCancelada(e: EstatusRequisicion) {
    return e.esRequisicion || e.esCancelada
  }

  private esOrdenOEsParcialidad(e: EstatusRequisicion): boolean {
    return e.esOrdenDeCompra || e.esEntregaParcial
  }

  generarCompra(req: Requisicion) {
    //Cambiamos el estatus de la requisicion
    req.razonDeCambioTemp = 'Se genero la compra.'

    req.estatus.esOrdenDeCompra = false
    req.estatus.esRequisicion = false
    req.estatus.esEntregaParcial = false
    req.estatus.esEntregaParcial = false
    req.estatus.esCancelada = false
    req.estatus.esTerminada = false

    req.estatus.esOrdenDeCompra = true
    req.estatus.fechaDeGeneracionDeOrdenDeCompra = new Date()
    this.cargando['comprar'] = 'Generando la compra'
    this.requisicionService.actualizarEstatus(req).subscribe(reqResp => {
      // this.cargarRequisiciones()
      // req = reqResp
      delete this.cargando['comprar']
      this.cargarRequisiciones()
    })
  }

  componenteRecibirParcialidad: RecibirParcialidadComponent
  recibirParcialidad(req: Requisicion) {
    this.requsicionRecibirParcialidad = req
    this.componenteRecibirParcialidad.crearFormulario(req)
  }

  recibirParcialidadGuardar() {
    this.cargarRequisiciones()
  }

  componenteRecibirTerminacion: RecibirTerminacionComponent
  recibirTerminacion(req: Requisicion) {
    this.requsicionRecibirTerminacion = req
    this.componenteRecibirTerminacion.crearFormulario(req)
  }

  recibirTerminacionGuardar() {
    this.cargarRequisiciones()
  }

  recibirCancelacionGuardar() {
    this.cargarRequisiciones
  }

  recibirCancelacion(req: Requisicion) {
    this.requsicionRecibirCancelacion = req
    this.componenteRecibirCancelacion.crearFormulario(req)
  }

  agregarOQuitarDeObservaciones(id: string) {
    if (this.mostrarObservaciones.includes(id))
      this.mostrarObservaciones = this.mostrarObservaciones.filter(
        x => x !== id
      )
    else this.mostrarObservaciones.push(id)
  }
}
