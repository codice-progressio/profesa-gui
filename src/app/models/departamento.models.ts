import { Deserializable } from "./deserealizable.model"

export class Departamento implements Deserializable {
  constructor(public _id?: string, public nombre?: string) {}

  deserialize(input: this): this {
    //console.log("?.4.4.1.0");
    Object.assign(this, input)
    //console.log("?.4.4.1.1");
    // console.log(this)
    return this
  }

  static fromJSON(data: any) {
    return Object.assign(new this(), data)
  }

  static fromJSON_Array(data: any[]) {
    if (!data) return

    return data.map(x => (x = Departamento.fromJSON(x)))
  }
}
