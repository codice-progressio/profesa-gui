import { Deserializable } from '../../../deserealizable.model'
import { PermisoMotivo } from './permisoMotivo.model'
export class Permiso implements Deserializable {
  constructor(
    public conGoceDeSueldo?: boolean,
    public sinGoceDeSueldo?: boolean,
    public motivo?: PermisoMotivo,
    public fechaDeInicio?: Date,
    public fechaDeFinalizacion?: Date,
    public autorizacionSupervisor?: boolean,
    public autorizacionRH?: boolean,
    public comentario?: string,
    public rechazado?: boolean,
    public motivoRechazo?: string,
    public fechaRechazo?: Date
  ) {}

  deserialize(input: this): this {
    Object.assign(this, input)

    this.motivo = new PermisoMotivo().deserialize(input.motivo)
    this.fechaDeInicio = new Date(input.fechaDeInicio)
    this.fechaDeFinalizacion = new Date(input.fechaDeFinalizacion)
    this.fechaRechazo = input.fechaRechazo ? new Date(input.fechaRechazo) : null

    return this
  }
}
