import { Deserializable } from "../../deserealizable.model"
import { Empleado } from "../empleados/empleado.model";

export class AsistenciaCurso implements Deserializable {
  constructor(public empleado?: Empleado, public fecha?: Date) {}

  deserialize(input: this): this {
    Object.assign(this, input)
    this.empleado = new Empleado().deserialize(input.empleado)
    this.fecha = new Date(input.fecha)
    return this
  }
}
