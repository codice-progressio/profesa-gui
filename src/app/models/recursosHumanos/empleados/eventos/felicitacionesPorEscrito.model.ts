import { Deserializable } from "../../../deserealizable.model"
import { Puesto } from "../../puestos/puesto.model"
export class FelicitacionesPorEscrito implements Deserializable {
  constructor(public fecha?: Date, public documento?: string) {}

  deserialize(input: this): this {
    Object.assign(this, input)
    this.fecha = new Date(input.fecha)

    return this
  }
}
