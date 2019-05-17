/**
 *Esta clase se encarga de gestionar la visivilidad de los campos de filtracion
 de el grupo de filtro component. 
 *
 * @export
 * @class CamposParaMostrarEnFiltrosFolio
 */
export class CamposParaMostrarEnFiltrosFolio {
  constructor(
    private _folio?: boolean,
    private _pedido?: boolean,
    private _cliente?: boolean,
    private _vendedor?: boolean,
    private _modelo?: boolean,
    private _tamano?: boolean,
    private _color?: boolean,
    private _terminado?: boolean,
    private _fechaDeCreacionDesdeEl?: boolean,
    private _fechaDeCreacionHasta?: boolean,
    private _fechaDeEntregaEstimadaDesdeEl?: boolean,
    private _fechaDeEntregaEstimadaHasta?: boolean,
    private _fechaFinalizacionDelFolioDesdeEl?: boolean,
    private _fechaFinalizacionDelFolioHasta?: boolean,
    private _entregarAProduccion?: boolean,
    private _ordenesGeneradas?: boolean,
    private _foliosTerminados?: boolean
  ) {}

  /**
     *Muestra todos los campos de input remplazando el valor de 
     configuracion existente por true. 
     *
     * @returns {CamposParaMostrarEnFiltrosFolio}
     * @memberof CamposParaMostrarEnFiltrosFolio
     */
  mostrarTodo(): CamposParaMostrarEnFiltrosFolio {
    Object.getOwnPropertyNames(this).forEach((nombre) => {
      this[nombre] = true
    })
    return this
  }

  /**
     *Oculta todos los campos de input remplanzando el valor
     de configuracion existente por false. 
     *
     * @returns {CamposParaMostrarEnFiltrosFolio}
     * @memberof CamposParaMostrarEnFiltrosFolio
     */
  ocultarTodo(): CamposParaMostrarEnFiltrosFolio {
    Object.getOwnPropertyNames(this).forEach((nombre) => {
      this[nombre] = false
    })
    return this
  }

  public get ordenesGeneradas(): boolean {
    return this._ordenesGeneradas
  }
  public setOrdenesGeneradas(value: boolean): this {
    this._ordenesGeneradas = value
    return this
  }
  public get entregarAProduccion(): boolean {
    return this._entregarAProduccion
  }
  public setEntregarAProduccion(value: boolean): this {
    this._entregarAProduccion = value
    return this
  }

  public get fechaFinalizacionDelFolioHasta(): boolean {
    return this._fechaFinalizacionDelFolioHasta
  }

  public setFechaFinalizacionDelFolioHasta(value: boolean): this {
    this._fechaFinalizacionDelFolioHasta = value
    return this
  }
  public get fechaFinalizacionDelFolioDesdeEl(): boolean {
    return this._fechaFinalizacionDelFolioDesdeEl
  }
  public setFechaFinalizacionDelFolioDesdeEl(value: boolean): this {
    this._fechaFinalizacionDelFolioDesdeEl = value
    return this
  }
  public get fechaDeEntregaEstimadaHasta(): boolean {
    return this._fechaDeEntregaEstimadaHasta
  }
  public setFechaDeEntregaEstimadaHasta(value: boolean): this {
    this._fechaDeEntregaEstimadaHasta = value
    return this
  }
  public get fechaDeEntregaEstimadaDesdeEl(): boolean {
    return this._fechaDeEntregaEstimadaDesdeEl
  }
  public setFechaDeEntregaEstimadaDesdeEl(value: boolean): this {
    this._fechaDeEntregaEstimadaDesdeEl = value
    return this
  }
  public get fechaDeCreacionHasta(): boolean {
    return this._fechaDeCreacionHasta
  }
  public setFechaDeCreacionHasta(value: boolean): this {
    this._fechaDeCreacionHasta = value
    return this
  }
  public get fechaDeCreacionDesdeEl(): boolean {
    return this._fechaDeCreacionDesdeEl
  }
  public setFechaDeCreacionDesdeEl(value: boolean): this {
    this._fechaDeCreacionDesdeEl = value
    return this
  }
  public get terminado(): boolean {
    return this._terminado
  }
  public setTerminado(value: boolean): this {
    this._terminado = value
    return this
  }
  public get color(): boolean {
    return this._color
  }
  public setColor(value: boolean): this {
    this._color = value
    return this
  }
  public get tamano(): boolean {
    return this._tamano
  }
  public setTamano(value: boolean): this {
    this._tamano = value
    return this
  }
  public get modelo(): boolean {
    return this._modelo
  }
  public setModelo(value: boolean): this {
    this._modelo = value
    return this
  }
  public get vendedor(): boolean {
    return this._vendedor
  }
  public setVendedor(value: boolean): this {
    this._vendedor = value
    return this
  }
  public get cliente(): boolean {
    return this._cliente
  }
  public setCliente(value: boolean): this {
    this._cliente = value
    return this
  }
  public get pedido(): boolean {
    return this._pedido
  }
  public setPedido(value: boolean): this {
    this._pedido = value
    return this
  }
  public get folio(): boolean {
    return this._folio
  }
  public setFolio(value: boolean): this {
    this._folio = value
    return this
  }
  public get foliosTerminados(): boolean {
    return this._foliosTerminados
  }
  /**
   *Bandera que define si se va a mostrar el campo folioTerminado.
   *
   * @param {boolean} value
   * @returns {this}
   * @memberof CamposParaMostrarEnFiltrosFolio
   */
  public setFoliosTerminados(value: boolean): this {
    this._foliosTerminados = value
    return this
  }
}
