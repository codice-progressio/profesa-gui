import { Component, OnInit } from "@angular/core"
import { Requisicion } from "src/app/models/requisiciones/requisicion.model"
import { RequisicionCrearModificarComponent } from "./requisicion-crear-modificar.component"
import { PaginadorService } from "src/app/components/paginador/paginador.service"
import { ManejoDeMensajesService } from "src/app/services/utilidades/manejo-de-mensajes.service"
import { RequisicionService } from "src/app/services/requisiciones/requisicion.service"
import { RequisicionFiltros } from "src/app/services/utilidades/filtrosParaConsultas/requisicion.filtro"
import { Proveedor } from "src/app/models/proveedores/proveedor.model"
import { Divisa } from "src/app/models/divisas/divisa.model"
import { RecibirParcialidadComponent } from "./estatus/requisicion-estatus-es-entrega-parcial/recibirParcialidad/recibir-parcialidad.component"
import { RecibirTerminacionComponent } from "./estatus/requisicion-estatus-es-terminada/recibir-terminacion/recibir-terminacion.component"
import { RecibirCancelacionComponent } from "./estatus/requisicion-estatus-es-cancelada/recibir-cancelacion/recibir-cancelacion.component"
import { RequisicionFiltrosComponent } from "./requisicion-filtros/requisicion-filtros.component"
import { UsuarioService } from "../../../services/usuario/usuario.service"
import { _ROLES } from "../../../config/roles.const"
import { EstatusRequisicion } from "../../../models/requisiciones/estatusRequisicion.model"
@Component({
  selector: "app-requisicion",
  templateUrl: "./requisicion.component.html",
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

  constructor(
    public _paginadorService: PaginadorService,
    public _requisicionService: RequisicionService,
    public _msjService: ManejoDeMensajesService,
    public _usuarioService: UsuarioService
  ) {
    this._paginadorService.callback = () =>
      this.cargarRequisiciones(this.componenteFiltrador)
  }

  ngOnInit() {
    this.cargarRequisiciones()
  }

  cargarRequisiciones(componente: RequisicionFiltrosComponent = null) {
    this.buscando = true

    this.aplicarFiltros(
      this._requisicionService.filtros(
        new RequisicionFiltros(this._requisicionService)
      ),
      componente
    )
      .setDesde(this._paginadorService.desde)
      .setLimite(this._paginadorService.limite)
      .setSortCampos([["folio", 1]])
      .servicio.todo()
      .subscribe((requisiciones) => {
        this.requisiciones = requisiciones
        this._paginadorService.activarPaginador(this._requisicionService.total)
        setTimeout(() => {
          this.buscando = false
        }, 500)
      })
  }

  private aplicarFiltros(
    filtros: RequisicionFiltros<RequisicionService>,
    c: RequisicionFiltrosComponent
  ): RequisicionFiltros<RequisicionService> {
    if (!c) return filtros

    return filtros
      .set_folioDesde(c.folioDesde ? c.folioDesde : null)
      .set_folioHasta(c.folioHasta ? c.folioHasta : null)
      .set_usuario(c.usuario ? c.usuario : null)
      .set_materiaPrima(c.materiaPrima ? c.materiaPrima : null)
      .set_consumibles(c.consumibles ? c.consumibles : null)
      .set_gastosYServicios(c.gastosYServicios ? c.gastosYServicios : null)
      .set_articulo(c.articulo ? c.articulo : null)
      .set_estatus_esRequisicion(
        c.estatus_esRequisicion ? c.estatus_esRequisicion : null
      )
      .set_estatus_esOrdenDeCompra(
        c.estatus_esOrdenDeCompra ? c.estatus_esOrdenDeCompra : null
      )
      .set_estatus_esEntregaParcial(
        c.estatus_esEntregaParcial ? c.estatus_esEntregaParcial : null
      )
      .set_estatus_esTerminada(
        c.estatus_esTerminada ? c.estatus_esTerminada : null
      )
      .set_estatus_esCancelada(
        c.estatus_esCancelada ? c.estatus_esCancelada : null
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
    this._msjService.err(error)
    throw error
  }

  crear() {
    this.componenteCrearModificar.crear()
  }

  asignarDetalle(requisicion: Requisicion) {
    this.requisicionDetalle = requisicion
  }

  editar(proveedor: Requisicion) {
    this.componenteCrearModificar.modificar(proveedor)
  }

  eliminar(requisicion: Requisicion) {
    let msj = "Esta accion no se puede deshacer."

    this._msjService.confirmacionDeEliminacion(msj, () => {
      this._requisicionService.eliminar(requisicion._id).subscribe(() => {
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
    if (!this._usuarioService.comprobarRol(_ROLES.ALMACEN_REQUISICION_ALMACEN))
      return false

    return requisicion.estatus.esRequisicion
  }

  mostrarBtnEditarRequisicion(requisicion: Requisicion): boolean {
    if (!this._usuarioService.comprobarRol(_ROLES.ALMACEN_REQUISICION_ALMACEN))
      return false

    return requisicion.estatus.esRequisicion
  }

  mostrarBtnGenerarCompra(req: Requisicion): boolean {
    if (
      !this._usuarioService.usuario.role.includes(
        _ROLES.ALMACEN_REQUISICION_COMPRAR
      )
    )
      return false

    return req.estatus.esRequisicion
  }
  mostrarBtnRecibirParcialidad(req: Requisicion): boolean {
    if (req.cantidad === req.estatus.cantidadEntregadaALaFecha) return false
    return this.comprobarBtnRecibirParcialidadLogica(req)
  }

  private comprobarBtnRecibirParcialidadLogica(req: Requisicion) {
    let e = req.estatus

    if (!this._usuarioService.comprobarRol(_ROLES.ALMACEN_REQUISICION_ALMACEN))
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
      !this._usuarioService.comprobarRol(_ROLES.ALMACEN_REQUISICION_ALMACEN)
    )
      return false

    return !e.esTerminada
  }
  mostrarBtnCancelarRequisicion(req: Requisicion): boolean {
    let e = req.estatus
    if (
      this.esRequisicionOEsCancelada(e) ||
      !this._usuarioService.comprobarRol(_ROLES.ALMACEN_REQUISICION_ALMACEN)
    )
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
    req.razonDeCambioTemp = "Se genero la compra."
    req.estatus.reiniciar()
    req.estatus.esOrdenDeCompra = true
    req.estatus.fechaDeGeneracionDeOrdenDeCompra = new Date()
    this._requisicionService.actualizarEstatus(req).subscribe((reqResp) => {
      // this.cargarRequisiciones()
      req = reqResp
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
}
