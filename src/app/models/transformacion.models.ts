import { Maquina } from "./maquina.model";
import { Deserializable } from "./deserealizable.model";

export class Transformacion implements Deserializable {
  constructor(
    public guardar: boolean = false,
    public cantidadDeBoton?: number,
    public espesorBoton?: number,
    public bl?: number,
    public maquinaActual?: Maquina,
    public createdAt?: Date,
    public updatedAt?: Date,
    public trabajando: boolean = false
  ) {}

  deserialize(input: this): this {
    Object.assign(this, input);
    return this;
  }
}
