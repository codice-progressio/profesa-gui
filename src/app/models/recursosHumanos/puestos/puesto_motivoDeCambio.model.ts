import { Usuario } from "../../usuario.model"
import { Deserializable } from "../../deserealizable.model"
export class Puesto_MotivoDeCambio implements Deserializable {
  constructor(
    public motivo?: string,
    public usuario?: Usuario,
    public fecha?: Date
  ) {}
  deserialize(input: this): this {
    Object.assign(this, input)
    this.usuario = new Usuario().deserialize(input.usuario)
    this.fecha = new Date(input.fecha)
    return this
  }
}
