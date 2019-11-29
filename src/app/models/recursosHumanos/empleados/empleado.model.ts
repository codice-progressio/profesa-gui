import { HistorialDeEventos } from "./eventos/historialDeEventos.model"
import { EmpleadoDocumentos } from "./documentos/empleadoDocumentos.model"
import { EmpleadoAsistencia } from "./asistencias/empleadoAsistencia.model"
import { Deserializable } from "../../deserealizable.model"
import { Puesto } from "../puestos/puesto.model"

export class Empleado implements Deserializable {
  constructor(
    public _id?: string,
    public idChecador?: number,
    public idNomina?: number,
    public nombres: string = null,
    public apellidos: string = null,
    public fechaDeNacimiento?: Date,
    //0 - H, 1 - M
    public sexo?: boolean,
    public curp?: string,
    public rfc?: string,
    public numeroDeCuenta?: string,
    public numeroDeSeguridadSocial?: string,
    public fotografia?: string,
    public sueldoActual?: number,
    public puestoActual: Puesto = null,
    //Relacionado a eventosRH. estatusLaboral.
    public activo?: boolean,
    //El puesto esta dentro de los eventos.
    public eventos?: HistorialDeEventos,
    public documentos?: EmpleadoDocumentos,

    public asistencia?: EmpleadoAsistencia
  ) {}

  deserialize(input: this): this {
    Object.assign(this, input)
    if (!input) return this

    this.fechaDeNacimiento = new Date(input.fechaDeNacimiento)
    if (input.puestoActual) {
      this.puestoActual = new Puesto().deserialize(input.puestoActual)
    }

    this.eventos = new HistorialDeEventos().deserialize(input.eventos)
    this.documentos = new EmpleadoDocumentos().deserialize(input.documentos)
    this.asistencia = new EmpleadoAsistencia().deserialize(input.asistencia)

    return this
  }

  nombreCompleto(): string {
    if (!this.nombres) return null
    return `${this.nombres} ${this.apellidos}`
  }
}
