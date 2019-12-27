import { Departamento } from "./departamento.models"
import { Paso } from "./paso.model"
import { GastoConsumo } from "./gastoConsumo.model"
import { Maquina } from "./maquina.model"
import { Deserializable } from "./deserealizable.model"

export class Proceso implements Deserializable {
  constructor(
    public _id?: string,
    public departamento?: Departamento,
    public nombre?: string,
    // public pasos?: Paso[], //LO TENEMOS QUE ELIMINAR
    public observaciones?: string,
    public especial?: boolean,
    // public gastos: GastoConsumo[] = [],
    public maquinas: Maquina[] = [],
    public requiereProduccion: boolean = true,
    // SOLO PARA MOSTRAR INFO.
    public ver: boolean = false,
    public editado: boolean = false
  ) {}

  deserialize(input: this): this {
    
    if( !input ){
      return this
    }
    Object.assign(this, input)
    
    this.departamento = new Departamento().deserialize(input.departamento)
    
    if (input.maquinas) {
      this.maquinas = input.maquinas.map(maquina =>
        new Maquina().deserialize(maquina)
      )
    }
    

    return this
  }

  static fromJSON(data: any) {
    data.departamento = Object.assign(new Departamento(), data.departamento)
    data.pasos = Paso.fromJSON_Array(data.pasos)
    data.gastos = GastoConsumo.fromJSON_Array(data.gastos)
    data.maquinas = Maquina.fromJSON_Array(data.maquinas)
    return Object.assign(new this(), data)
  }

  static fromJSON_Array(data: any[]) {
    return data.map(x => (x = Proceso.fromJSON(x)))
  }
}
