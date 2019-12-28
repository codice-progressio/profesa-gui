import { Deserializable } from "../../deserealizable.model"
import { AsistenciaCurso } from "./asistenciaCurso.model"

export class Curso implements Deserializable {
  constructor(
    public _id?: string,
    public nombre?: string,
    // public fechaDeCurso?: Date,
    public duracion?: number,
    public instructor?: string,
    public descripcionDeCurso?: string,
    //Es obligatorio
    public esCursoDeTroncoComun?: boolean,
    public esCursoDeEspecializacion?: boolean,
    public asistencias: AsistenciaCurso[] = []
  ) {}

  deserialize(input: this): this {
    Object.assign(this, input)

    // this.fechaDeCurso = new Date( input.fechaDeCurso)
    if (input.hasOwnProperty("asistencias")) {
      this.asistencias = input.asistencias.map((x) => {
        return new AsistenciaCurso().deserialize(x)
      })
    }

    return this
  }
}
