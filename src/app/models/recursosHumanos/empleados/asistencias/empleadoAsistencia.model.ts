import { EmpleadoAsistenciaSupervisor } from "./empleadoAsistenciaSupervisor.model"
import { Deserializable } from "../../../deserealizable.model"

export class EmpleadoAsistencia implements Deserializable {
  constructor(
    // La asistencia del checador debe de llevar
    // esta estructura.
    // 2019: {
    //     12:{
    //         1:[
    //             '12:30',
    //             '12:45',
    //             '15:30',
    //         ]
    //     }
    // }
    public checador: {} = {},
    public supervisor: EmpleadoAsistenciaSupervisor[] = []
  ) {}

  deserialize(input: this): this {
    Object.assign(this, input)
    if( !input ) return this
    this.supervisor = input.supervisor.map((x) => {
      return new EmpleadoAsistenciaSupervisor().deserialize(x)
    })

    return this
  }
}
