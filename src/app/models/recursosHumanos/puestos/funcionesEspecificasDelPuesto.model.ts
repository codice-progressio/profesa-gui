import { Deserializable } from "../../deserealizable.model"
export class FuncionesEspecificasDelPuesto implements Deserializable {
  constructor(
    public actividad?: string,
    public proposito?: string,
    public frecuencia?: string,
    public prioridad?: string
  ) {}
  deserialize(input: this): this {
    Object.assign(this, input)
    return this
  }
}
