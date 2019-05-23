import { Deserializable } from "./deserealizable.model";
export class ControlDeProduccion implements Deserializable {
  constructor(
    public guardar: boolean = true,
    public trabajando: boolean = false,
    public createdAt?: Date,
    public updatedAt?: Date,
    public entregadoAProduccion?: Date
  ) {}

  deserialize(input: this): this {
    Object.assign(this, input);

    return this;
  }
}
