import { Deserializable } from "./deserealizable.model"

export class ProductoTerminado implements Deserializable {
  constructor(public terminada?: boolean) {}

  deserialize(input: this): this {
    if (!input) {
      
      return this
    }
    Object.assign(this, input)

    return this
  }
}
