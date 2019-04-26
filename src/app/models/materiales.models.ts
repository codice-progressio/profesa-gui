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
    console.log("3.4.4.3.0");
    if (!input) {
      console.log("No se definio input en materiales");
      return this;
    }
    Object.assign(this, input);
    console.log("3.4.4.3.1");
    this.maquinaActual = new Maquina().deserialize(input.maquinaActual);
    console.log("3.4.4.3.2");
    return this;
  }
}
