import { Deserializable } from "../../../deserealizable.model"
export class Vacaciones implements Deserializable {
  constructor(public desde?: Date, public hasta?: Date) {}
  deserialize(input: this): this {
    Object.assign(this, input)

    this.desde = new Date(input.desde)
    this.hasta = new Date(input.hasta)

    return this
  }
}
