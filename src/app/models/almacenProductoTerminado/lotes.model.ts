import { Orden } from "../orden.models"
import { SalidasLotes } from "./salidasLote.model"
import { DevolucionLote } from "./devolucionLote.model"
import { Deserializable } from "../deserealizable.model";

export class Lotes implements Deserializable {
  constructor(
    public orden?: Orden,
    public numero?: number,
    public existencia?: number,
    public cantidadEntrada?: number,
    public salidas?: SalidasLotes[],
    public devoluciones?: DevolucionLote[],
    public observaciones?: string
  ) {}

  deserialize(input: Lotes): this {
    Object.assign(this, input)

    this.salidas = input.salidas.map((salida) => {
      return new SalidasLotes().deserialize(salida)
    })
    this.devoluciones = input.devoluciones.map((dev) => {
      return new DevolucionLote().deserialize(dev)
    })

    return this
  }
}
