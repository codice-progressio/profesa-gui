import { Deserializable } from "../deserealizable.model"
export class EntradaLotes implements Deserializable {
  constructor(
    public cantidad?: number,
    public observaciones?: string,
    public createAt?: Date
  ) {}
  deserialize(input: this): this {
    Object.assign(this, input)
    return this
  }
}
