import { Usuario } from "./usuario.model";
import { Maquina } from "./maquina.model";
import { Deserializable } from "./deserealizable.model";

/**
 * El modelo de el departamento materiales.
 *
 * @export
 * @class Materiales
 */
export class Materiales implements Deserializable {
  constructor(
    public createdAt?: Date,
    public updatedAt?: Date,
    public cargo?: Usuario,
    public guardar?: boolean,
    public trabajando: boolean = false,
    public maquinaActual?: Maquina
  ) {}

  deserialize(input: this): this {
    Object.assign(this, input);
    this.maquinaActual = new Maquina().deserialize(input.maquinaActual);
    return this;
  }
}
