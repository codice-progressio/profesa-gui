import { Deserializable } from "../../../deserealizable.model"
export class Bono implements Deserializable {
  constructor(
    public porAsistencia: number = null,
    public porPuntualidad: number = null,
    public porProductividad: number = null,
    public porResultados: number = null,
    public ayudaEscolarEventual: number = null,
    public otros: {
      cantidad: number,
      motivo: string
    } = null
  ) {}

  deserialize(input: this): this {
    Object.assign(this, input)
    return this
  }
}
