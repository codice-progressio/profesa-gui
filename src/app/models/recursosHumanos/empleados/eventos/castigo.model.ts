import { Deserializable } from "../../../deserealizable.model"
export class Castigo implements Deserializable {
  constructor(public fecha?: Date, public acta?: string) {}

  deserialize(input: this): this {
    Object.assign(this, input)
    this.fecha = new Date(input.fecha)

    return this
  }
}
