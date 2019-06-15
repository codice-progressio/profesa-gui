import { Cliente } from "../cliente.models"
import { Deserializable } from "../deserealizable.model"

export class SalidasLotes implements Deserializable {
  constructor(
    public cliente?: Cliente,
    public cantidad?: number,
    public observaciones?: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}

  deserialize(input: SalidasLotes): this {
    Object.assign(this, input)
    input.cliente.deserialize(input.cliente)
    return this
  }
}
