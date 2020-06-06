import { EstatusRequisicion } from "./estatusRequisicion.model"
import { Usuario } from "../usuario.model"
import { Deserializable } from "../deserealizable.model"
export class HistorialDeEstatusRequisicion implements Deserializable {
  constructor(
    public estatus?: EstatusRequisicion,
    public fechaModificacion?: Date,
    public razonDeCambio?: string,
    public usuarioQueModifica?: Usuario
  ) {}
  deserialize(input: this): this {
    Object.assign(this, input)
    if (input.estatus) {
      this.estatus = new EstatusRequisicion().deserialize(input.estatus)
    }
    this.fechaModificacion = input.fechaModificacion
      ? new Date(input.fechaModificacion)
      : null

    // this.usuarioQueModifica = new Usuario().deserialize(
    //   input.usuarioQueModifica
    // )

    return this
  }
}
