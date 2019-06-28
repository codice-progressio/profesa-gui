import { Departamento } from "../departamento.models"
import { Deserializable } from "../deserealizable.model"
export class SalidaArticulo implements Deserializable {
  constructor(
    public fecha?: Date,
    public cantidad?: number,
    public departamento?: Departamento,
    public observaciones?: string
  ) {}

  deserialize(input: this): this {
    Object.assign(this, input)
    this.departamento = new Departamento().deserialize(input.departamento)
    return this
  }
}
