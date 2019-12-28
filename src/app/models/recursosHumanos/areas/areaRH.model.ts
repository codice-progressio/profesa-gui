import { Deserializable } from "../../deserealizable.model"
export class AreaRH implements Deserializable {
  constructor(public _id?: string, public nombre?: string) {}

  deserialize(input: this): this {
    Object.assign(this, input)
    return this
  }
}
