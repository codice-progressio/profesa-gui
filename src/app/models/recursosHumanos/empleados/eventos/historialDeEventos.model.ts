import { EventosRH } from "./eventosRH.model"
import { Deserializable } from "../../../deserealizable.model"

export class HistorialDeEventos implements Deserializable {
  constructor(
    public fechaDeRegistroDeEvento?: Date,
    public evento?: EventosRH
  ) {}

  deserialize(input: this): this {
    Object.assign(this, input)
    if( !input ) return this
    this.fechaDeRegistroDeEvento = new Date(input.fechaDeRegistroDeEvento)
    this.evento = new EventosRH().deserialize(input.evento)

    return this
  }
}
