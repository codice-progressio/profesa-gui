import { Deserializable } from "../deserealizable.model"

export class ImagenesFacturas implements Deserializable {
  constructor(public imagen?: string, public fecha?: Date) {}
  deserialize(input: this): this {
    return Object.assign(this, input)
  }
}
