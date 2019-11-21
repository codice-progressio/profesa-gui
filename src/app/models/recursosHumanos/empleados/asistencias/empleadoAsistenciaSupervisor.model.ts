import { Deserializable } from "../../../deserealizable.model"
export class EmpleadoAsistenciaSupervisor implements Deserializable {
  constructor(
    public dia?: Date,
    public asistencia?: boolean,
    public falta?: boolean,
    public retardo?: boolean,
    public comentario?: string
  ) {}
  deserialize(input: this): this {
    Object.assign(this, input)
    this.dia = new Date(input.dia)

    return this
  }
}
