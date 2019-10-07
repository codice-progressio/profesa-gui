import { ImagenesFacturas } from "./imagenesFacturas.model"
import { Deserializable } from "../deserealizable.model"

export class EstatusRequisicion implements Deserializable {
  constructor(
    public esRequisicion?: boolean,
    public esOrdenDeCompra?: boolean,
    public fechaDeGeneracionDeOrdenDeCompra?: Date,
    public fechaTermino?: Date,
    public esEntregaParcial?: boolean,
    public fechaEntregaParcialidad?: Date,
    public cantidadEntregadaALaFecha?: number,
    //?Se completo la cantidad especificada
    //? en la requisicion.
    public esTerminada?: boolean,
    public imagenesFacturas: ImagenesFacturas[] = [],
    public esCancelada?: boolean,
    public fechaCancelacion?: Date,
    public motivoCancelacion?: string
  ) {}

  deserialize(input: this): this {
    Object.assign(this, input)
    this.fechaDeGeneracionDeOrdenDeCompra = input.fechaDeGeneracionDeOrdenDeCompra
      ? new Date(input.fechaDeGeneracionDeOrdenDeCompra)
      : null
    this.fechaTermino = input.fechaTermino
      ? new Date(input.fechaTermino)
      : null
    this.fechaEntregaParcialidad = input.fechaEntregaParcialidad
      ? new Date(input.fechaEntregaParcialidad)
      : null

    this.fechaCancelacion = input.fechaCancelacion
      ? new Date(input.fechaCancelacion)
      : null
    this.imagenesFacturas = input.imagenesFacturas.map((x) =>
      new ImagenesFacturas().deserialize(x)
    )

    return this
  }

  estatusActual(): {msj: string, fa: string } {

    let objeto: {msj: string, fa: string } = {msj:'', fa: ''}

    if (this.esRequisicion) {
      objeto.msj = "En espera de compra"
      objeto.fa = 'fa-cart-plus text-warning'
    } 
    if (this.esOrdenDeCompra) {
      objeto.msj = "En proceso"
      objeto.fa = 'fa-shipping-fast text-info '
    } 
    if (this.esEntregaParcial) {
      objeto.msj = "Entregas parciales"
      objeto.fa = 'fa-star-half text-dark'
    } 
    if (this.esTerminada) {
      objeto.msj = "Requisicion terminada"
      objeto.fa = 'fa-check-circle text-success'
    } 
    if (this.esCancelada) {
      objeto.msj = "Requisicion cancelada"
      objeto.fa = 'fa-times-circle text-danger'
    } 

    return objeto
  }

  
  /**
   *Reinicia el estatus para que se vaya creando el historial y no 
   se dupliquen estatus. No altera las imagenes. 
   *
   * @returns {EstatusRequisicion}
   * @memberof Requisicion
   */
  reiniciar() {
    this.esOrdenDeCompra = false
    this.esRequisicion = false
    this.esEntregaParcial = false
    this.esEntregaParcial = false
    this.esCancelada = false
    this.esTerminada = false

  }
}
