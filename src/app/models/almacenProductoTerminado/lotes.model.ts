import { Orden } from "../orden.models"
import { SalidasLotes } from "./salidasLote.model"
import { DevolucionLote } from "./devolucionLote.model"
import { Deserializable } from "../deserealizable.model"
import { EntradaLotes } from "./entradasLotes.model"

export class Lotes implements Deserializable {
  constructor(
    // public orden?: Orden,
    // public numero?: number,
    public _id?: string,
    public existencia?: number,
    public cantidadEntrada?: number,
    public salidas: SalidasLotes[] = [],
    public entradas: EntradaLotes[] = [],
    public devoluciones: DevolucionLote[] = [],
    public observaciones?: string,
    public createAt?: Date
  ) {}

  deserialize(input: this): this {
    Object.assign(this, input)

    this.salidas = input.salidas.map((salida) => {
      return new SalidasLotes().deserialize(salida)
    })
    this.entradas = input.entradas.map((entrada) => {
      return new EntradaLotes().deserialize(entrada)
    })
    this.devoluciones = input.devoluciones.map((dev) => {
      return new DevolucionLote().deserialize(dev)
    })

    return this
  }
}
