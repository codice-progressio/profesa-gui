import { Materiales } from "./materiales.models"
import { Transformacion } from "./transformacion.models"
import { Pulido } from "./pulido.models"
import { Seleccion } from "./seleccion.models"
import { Trayecto } from "./trayecto.models"
import { Deserializable } from "./deserealizable.model"

export class Orden implements Deserializable {
  constructor(
    public _id?: string,
    // El número de orden que es la suma del folio, el órden de pedido y número de órden.
    public orden?: string,
    public numeroDeOrden?: number,
    public unidad?: number,
    public piezasTeoricas?: number,
    public piezasFinales?: number,
    public observaciones?: string,
    // True cuando la órden esta terminada.
    public terminada: boolean = false,
    public porcentajeAvance: number = 0,
    public trayectoNormal?: Trayecto[],
    public trayectoRecorrido?: Trayecto[],
    public ubicacionActual: Trayecto = new Trayecto(),
    public siguienteDepartamento?: Trayecto,
    public nivelDeUrgencia: string = "PRODUCCIÓN",
    public fechaFolio?: Date,
    // Esta es solo para facilitarnos la vida.
    public editando: boolean = false
  ) {}

  deserialize(input: this): this {
    //console.log("x  ?.4.1");

    Object.assign(this, input)

    //console.log("x  ?.4.2");

    this.trayectoNormal = input.trayectoNormal.map(trayecto =>
      new Trayecto().deserialize(trayecto)
    )
    //console.log("x  ?.4.3");
    this.trayectoRecorrido = input.trayectoRecorrido.map(trayecto =>
      new Trayecto().deserialize(trayecto)
    )
    //console.log("x  ?.4.4", input.ubicacionActual);
    this.ubicacionActual = new Trayecto().deserialize(input.ubicacionActual)
    //console.log("x  ?.4.5");
    this.siguienteDepartamento = new Trayecto().deserialize(
      input.siguienteDepartamento
    )
    //console.log("x  ?.4.6");

    return this
  }

  static fromJSON(data: any) {
    return Object.assign(new this(), data)
  }

  static fromJSON_Array(data: any[]) {
    return data.map(x => (x = Orden.fromJSON(x)))
  }
}
