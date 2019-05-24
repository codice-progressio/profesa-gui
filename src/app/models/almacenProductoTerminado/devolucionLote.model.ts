import { Cliente } from "../cliente.models"
import { Deserializable } from '../deserealizable.model'
export class DevolucionLote implements Deserializable {
  constructor(
    public cliente?: Cliente,
    public cantidad?: number,
    public creatAt?: Date,
    public updateAt?: Date,
    public observaciones?: string
  ) {}
  deserialize(input: this): this {
    Object.assign(this, input)
    this.cliente.deserialize( input.cliente )
    return this
  }
}
