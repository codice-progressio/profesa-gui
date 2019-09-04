import { Deserializable } from "../deserealizable.model"
export class Contacto implements Deserializable {
  constructor(
    public nombre?: string,
    public telefono?: string,
    public correo?: string,
    public puesto?: string
  ) {}

  deserialize(input: this): this {
    Object.assign(this, input)
    return this
  }
}
