import { Usuario } from "./usuario.model"
import { Deserializable } from "./deserealizable.model"

export class Pastilla implements Deserializable {
  constructor(
    public createdAt?: Date,
    public updatedAt?: Date,
    public conto?: Usuario,
    public cantidades: CantidadesPastilla[] = [new CantidadesPastilla()]
  ) {}

  deserialize(input: this): this {
    if (!input) {
      //console.log\("No se definio el input");
      return this
    }

    Object.assign(this, input)
    this.cantidades = input.cantidades.map(cantidad =>
      new CantidadesPastilla().deserialize(cantidad)
    )
    return this
  }
}

export class CantidadesPastilla implements Deserializable {
  constructor(
    public peso10Botones?: number,
    public pesoTotalBoton?: number,
    public espesorPastilla?: number // cantidadPastilla?: number,
  ) {}

  deserialize(input: this): this {
    Object.assign(this, input)

    return this
  }
}
