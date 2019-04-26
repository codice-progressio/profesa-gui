import { Deserializable } from "./deserealizable.model";
export class Burato implements Deserializable {
  constructor(
    public peso10Botones?: number,
    public pesoTotalBoton?: number,
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
