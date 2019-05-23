import { Deserializable } from "./deserealizable.model";

export class ColoresTenidos implements Deserializable {
  constructor(
    public color?: string,
    public cantidad?: number,
    public observaciones?: string,
    public terminado: boolean = false,
    public fechaTerminado?: Date,
    // Para gui
    public valido: boolean = true
  ) {}

  deserialize(input: this): this {
    Object.assign(this, input);
    return this;
  }
}
