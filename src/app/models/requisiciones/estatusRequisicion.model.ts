import { ImagenesFacturas } from './imagenesFacturas.model'
import { Deserializable } from '../deserealizable.model'

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
    this.fechaTermino = input.fechaTermino ? new Date(input.fechaTermino) : null
    this.fechaEntregaParcialidad = input.fechaEntregaParcialidad
      ? new Date(input.fechaEntregaParcialidad)
      : null

    this.fechaCancelacion = input.fechaCancelacion
      ? new Date(input.fechaCancelacion)
      : null
    this.imagenesFacturas = input.imagenesFacturas.map(x =>
      new ImagenesFacturas().deserialize(x)
    )

    return this
  }

  
}
