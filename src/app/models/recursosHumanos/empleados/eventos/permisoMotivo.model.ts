import { Deserializable } from "../../../deserealizable.model"
export class PermisoMotivo implements Deserializable {
  constructor(
    public porPaternidad?: boolean,
    public porDefunción?: boolean,
    public porMatrimonio?: boolean,
    public paraDesempenarUnCargoDeEleccionPopular?: boolean,
    public citaMedica?: boolean,
    public otro?: string
  ) {}

  deserialize(input: this): this {
    Object.assign(this, input)
    return this
  }
}
