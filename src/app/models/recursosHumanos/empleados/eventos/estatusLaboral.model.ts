import { Deserializable } from "../../../deserealizable.model"
export class EstatusLaboral implements Deserializable {
  constructor(
    public alta?: boolean,
      public baja?: boolean,
      public reingreso?: boolean,
      public incapacidadEnfermedadGeneral?: boolean,
      public incapacidadRiesgoDeTrabajo?: boolean,
      public incapacidadMaternidad?: boolean,
      public observaciones?: string
  ) {}

  deserialize(input: this): this {
    Object.assign(this, input)
    return this
  }
}
