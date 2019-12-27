import { Deserializable } from "../../deserealizable.model"
import { Departamento } from "../../departamento.models"
export class Puesto_RelacionClienteProveedorInternos implements Deserializable {
  constructor(
    public departamento?: Departamento,
    public relacion?: string,
    public asunto?: string
  ) {}
  deserialize(input: this): this {
    Object.assign(this, input)
    this.departamento = new Departamento().deserialize(input.departamento)

    return this
  }
}
