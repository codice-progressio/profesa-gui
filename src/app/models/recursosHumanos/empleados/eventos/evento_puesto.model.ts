import { Deserializable } from "../../../deserealizable.model"
// import { Puesto } from "../../puestos/puesto.model"

export class EventosPuesto implements Deserializable {
  constructor(
    public anterior?: String,
    public nuevo?: String,
    public observaciones?: string
  ) {}

  deserialize(input: this): this {
    Object.assign(this, input)
    // this.anterior = new Puesto().deserialize(input.anterior)
    // this.nuevo = new Puesto().deserialize(input.nuevo)

    return this
  }
}
