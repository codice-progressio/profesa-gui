import { Deserializable } from "../../../deserealizable.model"
export class CambiosDeSueldo implements Deserializable {
  constructor(
    // Expresa lo que antes era?: 1200
    public sueldAnteriorAlCambio?: number,
    //Expresa el total?: 1200+600 = 1800
    public aumento?: number,
    public observacion?: string
  ) {}

  deserialize(input: this): this {
    Object.assign(this, input)

    return this
  }
}
