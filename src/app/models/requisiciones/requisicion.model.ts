import { Usuario } from '../usuario.model'
import { Articulo } from '../almacenDeMateriaPrimaYHerramientas/articulo.modelo'
import { EstatusRequisicion } from './estatusRequisicion.model'
import { HistorialDeEstatusRequisicion } from './historialDeEstatusRequisicion.model'
import { Deserializable } from '../deserealizable.model'

export class Requisicion implements Deserializable {
  constructor(
    public _id?: string,
    public folio?: number,
    public usuario?: Usuario,
    public materiaPrima?: boolean,
    public consumibles?: boolean,
    public gastosYServicios?: boolean,
    public cantidad?: number,
    public articulo: Articulo = new Articulo(),
    public estatus: EstatusRequisicion = new EstatusRequisicion(),
    //Una copia del status con fecha.
    public historialDeEstatus: HistorialDeEstatusRequisicion[] = [],
    public razonDeCambioTemp?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public observaciones?: string
  ) {}
  deserialize(input: this): this {
    if (!input) return this
    Object.assign(this, input)
    this.usuario = input.usuario as Usuario

    this.articulo = new Articulo().deserialize(input.articulo)
    if (input.estatus) {
      this.estatus = new EstatusRequisicion().deserialize(input.estatus)
    }
    this.historialDeEstatus = input.historialDeEstatus.map(x =>
      x as HistorialDeEstatusRequisicion
    )

    this.createdAt = input.createdAt ? new Date(input.createdAt) : null
    this.updatedAt = input.updatedAt ? new Date(input.updatedAt) : null
    return this
  }
}
