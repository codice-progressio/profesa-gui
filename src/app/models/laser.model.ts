import { Maquina } from "./maquina.model";
import { Deserializable } from "./deserealizable.model";

/**
 *Guarda los datos del departamento de laser.
 *
 * @export
 * @class Laser
 */
export class Laser implements Deserializable {
  constructor(
    public createdAt?: Date,
    public updatedAt?: Date,
    public cantidadDeBoton?: number,
    public bl?: number,
    public maquinaActual?: Maquina,
    public guardar?: boolean,
    public trabajando: boolean = false
  ) {}

  deserialize(input: this): this {
    if (!input) {
      console.log("No se definio el input");
      return this;
    }
    Object.assign(this, input);
    this.maquinaActual = new Maquina().deserialize(input.maquinaActual);
    return this;
  }
}
