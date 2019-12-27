import { Usuario } from "../../usuario.model"
import { Deserializable } from "../../deserealizable.model"
import { Puesto } from "./puesto.model";
export class HistorialDePuesto implements Deserializable {
  constructor(
    public fechaDeCambio?: Date,
    public usuarioQueModifica?: Usuario,
    //Guarda todo
    public cambioAnterior?: any 
  ) {}
  deserialize(input: this): this {
    this.fechaDeCambio = new Date(input.fechaDeCambio)
    this.usuarioQueModifica = new Usuario().deserialize(
      input.usuarioQueModifica
    )
    this.cambioAnterior = new Puesto().deserialize(input.cambioAnterior)
    return this
  }
}
