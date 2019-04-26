import { Deserializable } from "./deserealizable.model";
export class AlmacenDeBoton implements Deserializable {
  constructor(
    public cantidadDeBoton?: number,
    public createdAt?: Date,
    public updatedAt?: Date,
    public guardar?: boolean,
    public trabajando?: boolean
  ) {}
  deserialize(input: this): this {
    Object.assign(this, input);

    return this;
  }
}
