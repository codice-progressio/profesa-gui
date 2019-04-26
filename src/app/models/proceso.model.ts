import { Departamento } from "./departamento.models";
import { Paso } from "./paso.model";
import { GastoConsumo } from "./gastoConsumo.model";
import { Maquina } from "./maquina.model";
import { Deserializable } from "./deserealizable.model";

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
    console.log("3.1.5.1.1.0");

    Object.assign(this, input);
    console.log("3.1.5.1.1.1", input.departamento);
    this.departamento = new Departamento().deserialize(input.departamento);
    console.log("3.1.5.1.1.2", input.maquinas);
    if (input.maquinas) {
      this.maquinas = input.maquinas.map(maquina =>
        new Maquina().deserialize(maquina)
      );
    }
    console.log("3.1.5.1.1.3");

    return this;
  }

  static fromJSON(data: any) {
    data.departamento = Object.assign(new Departamento(), data.departamento);
    data.pasos = Paso.fromJSON_Array(data.pasos);
    data.gastos = GastoConsumo.fromJSON_Array(data.gastos);
    data.maquinas = Maquina.fromJSON_Array(data.maquinas);
    return Object.assign(new this(), data);
  }

  static fromJSON_Array(data: any[]) {
    return data.map(x => (x = Proceso.fromJSON(x)));
  }
}
