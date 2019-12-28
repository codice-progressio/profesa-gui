import { Usuario } from "../../usuario.model"
import { Deserializable } from "../../deserealizable.model"
export class PerfilDelPuesto implements Deserializable {
  constructor(
    public conocimientos: string[] = [],
    public habilidades: string[] = [],
    public aptitudes: string[] = []
  ) {}
  deserialize(input: this): this {
    Object.assign(this, input)
    return this
  }
}
