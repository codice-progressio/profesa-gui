import { Usuario } from "./usuario.model";
import { Deserializable } from "./deserealizable.model";

export class Empaque implements Deserializable {
  constructor(
    public cantidadDeBoton?: number,
    public contadoPor?: Usuario,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}

  deserialize(input: this): this {
    Object.assign(this, input);

    return this;
  }
}
