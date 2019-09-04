import { Deserializable } from "../deserealizable.model"
export class Cuenta implements Deserializable {
  constructor(public clabe?: number, public banco?: string) {}
  deserialize(input: this): this {
    Object.assign(this, input)
    return this
  }
}
