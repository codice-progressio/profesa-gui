import { Deserializable } from "../../deserealizable.model"
import { Puesto_RelacionClienteProveedorInternos } from "./puesto_relacionClienteProveedorInternos.model"
import { Puesto_RelacionClienteProveedorExternos } from "./puesto_relacionClienteProveedorIExternos.model"

export class Puesto_RelacionClienteProveedor implements Deserializable {
  constructor(
    public internos: Puesto_RelacionClienteProveedorInternos[] = [],
    public externos: Puesto_RelacionClienteProveedorExternos[] = []
  ) {}
  deserialize(input: this): this {
    Object.assign(this, input)
    if (!input) return this

    this.internos = input.internos.map((x) =>
      new Puesto_RelacionClienteProveedorInternos().deserialize(x)
    )
    this.externos = input.externos.map((x) =>
      new Puesto_RelacionClienteProveedorExternos().deserialize(x)
    )

    return this
  }
}
