import { Deserializable } from "../deserealizable.model"
export class Divisa implements Deserializable {
  constructor(
    public _id?: string,
    public nombre?: string,
    public tipoDeCambio?: number,
    public updatedAt?: Date,
    public createdAt?: Date
  ) {}
  deserialize(input: this): this {
    Object.assign(this, input)
    this.updatedAt = new Date(input.updatedAt)
    this.createdAt = new Date(input.createdAt)
    return this
  }
}
