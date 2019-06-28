import { Deserializable } from "../deserealizable.model"

/**
 *Almacena la descripcion de los almacenes.
 *
 * @export
 * @class AlmacenDescripcion
 */
export class AlmacenDescripcion implements Deserializable {
  constructor(
    public _id?: string,
    public nombre?: string,
    public descripcion?: string,
    public ubicacion?: string
  ) {}
  deserialize(input: this): this {
    Object.assign(this, input)
    return this
  }
}
