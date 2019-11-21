import { Curso } from "../../cursos/curso.model"
import { Vacaciones } from "./vacaciones.model"
import { CambiosDeSueldo } from "./cambiosDeSueldo.model"
import { EventosPuesto } from "./evento_puesto.model"
import { FelicitacionesPorEscrito } from "./felicitacionesPorEscrito.model"
import { AmonestacionPorEscrito } from "./amonestacionPorEscrito.model"
import { Permiso } from "./permiso.model"
import { Bono } from "./bono.model"
import { EstatusLaboral } from "./estatusLaboral.model"
import { Castigo } from "./castigo.model"
import { Deserializable } from "../../../deserealizable.model"
export class EventosRH implements Deserializable {
  constructor(
    public eventoPendienteDeDefinir?: boolean,
    public curso?: Curso,
    public vacaciones?: Vacaciones,
    public cambiosDeSueldo?: CambiosDeSueldo,
    public puesto?: EventosPuesto,
    // Una url a un documento pdf
    public felicitacionPorEscrito?: FelicitacionesPorEscrito,
    // Una url a un documento pdf
    public amonestacionPorEscrito?: AmonestacionPorEscrito,
    public castigo?: Castigo,
    public permiso?: Permiso,
    public bono?: Bono,
    public estatusLaboral?: EstatusLaboral
  ) {}
  deserialize(input: this): this {
    Object.assign(this, input)
    if( !input ) return this
    this.deserialize1(input)
    this.deserialize2(input)
    this.deserialize3(input)

    return this
  }

  private deserialize1(input: this) {
    this.curso = input.curso ? new Curso().deserialize(input.curso) : null
    this.vacaciones = input.vacaciones
      ? new Vacaciones().deserialize(input.vacaciones)
      : null
    this.cambiosDeSueldo = input.cambiosDeSueldo
      ? new CambiosDeSueldo().deserialize(input.cambiosDeSueldo)
      : null
    this.puesto = input.puesto
      ? new EventosPuesto().deserialize(input.puesto)
      : null
  }

  private deserialize2(input: this) {
    // Una url a un documento pdf
    this.felicitacionPorEscrito = input.felicitacionPorEscrito
      ? new FelicitacionesPorEscrito().deserialize(input.felicitacionPorEscrito)
      : null
    // Una url a un documento pdf
    this.amonestacionPorEscrito = input.amonestacionPorEscrito
      ? new AmonestacionPorEscrito().deserialize(input.amonestacionPorEscrito)
      : null
    this.castigo = input.castigo
      ? new Castigo().deserialize(input.castigo)
      : null
  }

  private deserialize3(input: this) {
    this.permiso = input.permiso
      ? new Permiso().deserialize(input.permiso)
      : null
    this.bono = input.bono ? new Bono().deserialize(input.bono) : null
    this.estatusLaboral = input.estatusLaboral
      ? new EstatusLaboral().deserialize(input.estatusLaboral)
      : null
  }
}
