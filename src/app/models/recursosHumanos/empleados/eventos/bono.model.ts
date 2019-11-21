import { Deserializable } from "../../../deserealizable.model"
export class Bono implements Deserializable {
  constructor(
    public porAsistencia?: number,
    public porPuntualidad?: number,
    public porProductividad?: number,
    public porResultados?: number,
    public ayudaEscolarEventual?: number
  ) {}

  deserialize(input: this): this {
    Object.assign(this, input)
    return this
  }
}
