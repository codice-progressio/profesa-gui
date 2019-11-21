import { Deserializable } from "./deserealizable.model"
import { AreaRH } from "./recursosHumanos/areas/areaRH.model"

export class Departamento implements Deserializable {
  constructor(
    public _id?: string,
    public nombre?: string,
    public area?: AreaRH
  ) {}

  deserialize(input: this): this {
    Object.assign(this, input)
    if( !input ) return this
    this.area = new AreaRH().deserialize(input.area)
    return this
  }

  static fromJSON(data: any) {
    return Object.assign(new this(), data)
  }

  static fromJSON_Array(data: any[]) {
    if (!data) return

    return data.map((x) => (x = Departamento.fromJSON(x)))
  }
}
