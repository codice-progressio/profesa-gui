import { CamposParaMostrarFiltrosGeneral } from "src/app/pages/utilidadesPages/camposParaMostrarFiltrosGeneral"

export class RequisicionCamposParaMostrarEnFiltro extends CamposParaMostrarFiltrosGeneral {
  constructor(
    private _folioDesde?: boolean,
    private _folioHasta?: boolean,
    private _usuario?: boolean,
    private _materiaPrima?: boolean,
    private _consumibles?: boolean,
    private _gastosYServicios?: boolean,
    private _articulo?: boolean,
    private _estatus_esRequisicion?: boolean,
    private _estatus_esOrdenDeCompra?: boolean,
    private _estatus_fechaDeGeneracionDeOrdenDeCompraDesde?: boolean,
    private _estatus_fechaDeGeneracionDeOrdenDeCompraHasta?: boolean,
    private _estatus_fechaTerminoYEntradaAlmacenDesde?: boolean,
    private _estatus_fechaTerminoYEntradaAlmacenHasta?: boolean,
    private _estatus_esEntregaParcial?: boolean,
    private _estatus_fechaEntregaParcialidadDesde?: boolean,
    private _estatus_fechaEntregaParcialidadHasta?: boolean,
    private _estatus_cantidadEntregadaALaFecha?: boolean,
    private _estatus_esTerminada?: boolean,
    private _estatus_fechaTerminadaDesde?: boolean,
    private _estatus_fechaTerminadaHasta?: boolean,
    private _estatus_esCancelada?: boolean,
    private _estatus_fechaCancelacionDesde?: boolean,
    private _estatus_fechaCancelacionHasta?: boolean
  ) {
    super()
  }

  public setFolioDesde(v: boolean): this {
    this._folioDesde = v
    return this
  }
  public get folioDesde(): boolean {
    return this._folioDesde
  }
  public setFolioHasta(v: boolean): this {
    this._folioHasta = v
    return this
  }
  public get folioHasta(): boolean {
    return this._folioHasta
  }
  public setUsuario(v: boolean): this {
    this._usuario = v
    return this
  }
  public get usuario(): boolean {
    return this._usuario
  }
  public setMateriaPrima(v: boolean): this {
    this._materiaPrima = v
    return this
  }
  public get materiaPrima(): boolean {
    return this._materiaPrima
  }
  public setConsumibles(v: boolean): this {
    this._consumibles = v
    return this
  }
  public get consumibles(): boolean {
    return this._consumibles
  }
  public setGastosYServicios(v: boolean): this {
    this._gastosYServicios = v
    return this
  }
  public get gastosYServicios(): boolean {
    return this._gastosYServicios
  }
  public setArticulo(v: boolean): this {
    this._articulo = v
    return this
  }
  public get articulo(): boolean {
    return this._articulo
  }
  public setEstatus_esRequisicion(v: boolean): this {
    this._estatus_esRequisicion = v
    return this
  }
  public get estatus_esRequisicion(): boolean {
    return this._estatus_esRequisicion
  }
  public setEstatus_esOrdenDeCompra(v: boolean): this {
    this._estatus_esOrdenDeCompra = v
    return this
  }
  public get estatus_esOrdenDeCompra(): boolean {
    return this._estatus_esOrdenDeCompra
  }
  public setEstatus_fechaDeGeneracionDeOrdenDeCompraDesde(v: boolean): this {
    this._estatus_fechaDeGeneracionDeOrdenDeCompraDesde = v
    return this
  }
  public get estatus_fechaDeGeneracionDeOrdenDeCompraDesde(): boolean {
    return this._estatus_fechaDeGeneracionDeOrdenDeCompraDesde
  }
  public setEstatus_fechaDeGeneracionDeOrdenDeCompraHasta(v: boolean): this {
    this._estatus_fechaDeGeneracionDeOrdenDeCompraHasta = v
    return this
  }
  public get estatus_fechaDeGeneracionDeOrdenDeCompraHasta(): boolean {
    return this._estatus_fechaDeGeneracionDeOrdenDeCompraHasta
  }
  public setEstatus_fechaTerminoYEntradaAlmacenDesde(v: boolean): this {
    this._estatus_fechaTerminoYEntradaAlmacenDesde = v
    return this
  }
  public get estatus_fechaTerminoYEntradaAlmacenDesde(): boolean {
    return this._estatus_fechaTerminoYEntradaAlmacenDesde
  }
  public setEstatus_fechaTerminoYEntradaAlmacenHasta(v: boolean): this {
    this._estatus_fechaTerminoYEntradaAlmacenHasta = v
    return this
  }
  public get estatus_fechaTerminoYEntradaAlmacenHasta(): boolean {
    return this._estatus_fechaTerminoYEntradaAlmacenHasta
  }
  public setEstatus_esEntregaParcial(v: boolean): this {
    this._estatus_esEntregaParcial = v
    return this
  }
  public get estatus_esEntregaParcial(): boolean {
    return this._estatus_esEntregaParcial
  }
  public setEstatus_fechaEntregaParcialidadDesde(v: boolean): this {
    this._estatus_fechaEntregaParcialidadDesde = v
    return this
  }
  public get estatus_fechaEntregaParcialidadDesde(): boolean {
    return this._estatus_fechaEntregaParcialidadDesde
  }
  public setEstatus_fechaEntregaParcialidadHasta(v: boolean): this {
    this._estatus_fechaEntregaParcialidadHasta = v
    return this
  }
  public get estatus_fechaEntregaParcialidadHasta(): boolean {
    return this._estatus_fechaEntregaParcialidadHasta
  }
  public setEstatus_cantidadEntregadaALaFecha(v: boolean): this {
    this._estatus_cantidadEntregadaALaFecha = v
    return this
  }
  public get estatus_cantidadEntregadaALaFecha(): boolean {
    return this._estatus_cantidadEntregadaALaFecha
  }
  public setEstatus_esTerminada(v: boolean): this {
    this._estatus_esTerminada = v
    return this
  }
  public get estatus_esTerminada(): boolean {
    return this._estatus_esTerminada
  }
  public setEstatus_fechaTerminadaDesde(v: boolean): this {
    this._estatus_fechaTerminadaDesde = v
    return this
  }
  public get estatus_fechaTerminadaDesde(): boolean {
    return this._estatus_fechaTerminadaDesde
  }
  public setEstatus_fechaTerminadaHasta(v: boolean): this {
    this._estatus_fechaTerminadaHasta = v
    return this
  }
  public get estatus_fechaTerminadaHasta(): boolean {
    return this._estatus_fechaTerminadaHasta
  }
  public setEstatus_esCancelada(v: boolean): this {
    this._estatus_esCancelada = v
    return this
  }
  public get estatus_esCancelada(): boolean {
    return this._estatus_esCancelada
  }
  public setEstatus_fechaCancelacionDesde(v: boolean): this {
    this._estatus_fechaCancelacionDesde = v
    return this
  }
  public get estatus_fechaCancelacionDesde(): boolean {
    return this._estatus_fechaCancelacionDesde
  }
  public setEstatus_fechaCancelacionHasta(v: boolean): this {
    this._estatus_fechaCancelacionHasta = v
    return this
  }
  public get estatus_fechaCancelacionHasta(): boolean {
    return this._estatus_fechaCancelacionHasta
  }
}
