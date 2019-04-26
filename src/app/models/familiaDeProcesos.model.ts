import { Proceso } from "./proceso.model";
import { Procesos } from "./procesos.model";

export class FamiliaDeProcesos {
  constructor(
    public _id?: string,
    public procesos: Procesos[] = [],
    public nombre?: string,
    public soloParaProductoTerminado: boolean = false,
    public createAt?: Date,
    public updateAt?: Date,
    public observaciones?: string,
    // SOLO PARA MOSTRAR INFO.
    public ver: boolean = false,
    public editado: boolean = false
  ) {}

  deserialize(input: this): this {
    console.log("3.1.5.0");
    Object.assign(this, input);
    console.log("3.1.5.1");
    if (input.procesos) {
      this.procesos = input.procesos.map(proceso =>
        new Procesos().deserialize(proceso)
      );
      console.log("3.1.5.2");
    }
    console.log("3.1.5.3");

    return this;
  }

  static fromJSON(data: any) {
    data.procesos = Procesos.fromJSON_Array(data.procesos);
    return Object.assign(new this(), data);
  }

  static fromJSON_Array(data: any[]) {
    return data.map(x => (x = FamiliaDeProcesos.fromJSON(x)));
  }

  agregarProceso(orden: number, proceso: Proceso) {
    this.procesos.push(new Procesos(orden, proceso));
  }
}
