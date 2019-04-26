import { Usuario } from "./usuario.model"
import { Deserializable } from "./deserealizable.model"

export class Seleccion implements Deserializable {
  constructor(
    public guardar: boolean = true,
    public trabajando: boolean = false,
    public seleccionadoPor?: Usuario,
    public quebrados?: number,
    public reves?: number,
    public despostillado?: number,
    public sinLaser?: number,
    public sinHoyos?: number,
    public efectoMalo?: number,
    public otros?: number,
    public descripcionDeOtro?: number,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}

  deserialize(input: this): this {
    if (!input) {
      //console.log\("No se definio el input");
      return this
    }
    Object.assign(this, input)
    this.seleccionadoPor = new Usuario().deserialize(input.seleccionadoPor)
    return this
  }
}
