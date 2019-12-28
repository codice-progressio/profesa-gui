import { Deserializable } from "../../deserealizable.model"
import { Departamento } from "../../departamento.models"
export class Puesto_RelacionClienteProveedorExternos implements Deserializable {
  constructor(
    public contacto?: string,
    public relacion?: string,
    public asunto?: string
  ) {}
  deserialize(input: this): this {
    Object.assign(this, input)
    return this
  }
}
