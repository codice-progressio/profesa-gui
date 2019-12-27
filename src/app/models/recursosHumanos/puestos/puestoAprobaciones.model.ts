import { Deserializable } from "../../deserealizable.model"
import { Empleado } from "../empleados/empleado.model";

export class PuestoAprobaciones implements Deserializable {
  constructor(
    public desarrollo?: Empleado,
    public reviso?: Empleado,
    public aprobo?: Empleado
  ) {}
  deserialize(input: this): this {
    Object.assign(this, input)
    if( !input  ) return this
    this.desarrollo = new Empleado().deserialize(input.desarrollo)
    this.reviso = new Empleado().deserialize(input.reviso)
    this.aprobo = new Empleado().deserialize(input.aprobo)

    return this
  }
}
