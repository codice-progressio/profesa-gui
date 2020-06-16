import { Materiales } from './materiales.models'
import { Transformacion } from './transformacion.models'
import { Pulido } from './pulido.models'
import { Seleccion } from './seleccion.models'
import { Trayecto } from './trayecto.models'
import { Deserializable } from './deserealizable.model'
import { FamiliaDeProcesos } from './familiaDeProcesos.model'
import { ModeloCompleto } from './modeloCompleto.modelo'

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
    public nivelDeUrgencia: string = 'PRODUCCIÓN',
    public fechaFolio?: Date,

    public ruta: Ruta[] = [],

    // Esta es solo para facilitarnos la vida.
    public editando: boolean = false,
    public modeloCompleto?: ModeloCompleto
  ) {}

  deserialize(input: this): this {
    Object.assign(this, input)

    this.trayectoNormal = input.trayectoNormal.map(trayecto =>
      new Trayecto().deserialize(trayecto)
    )

    this.trayectoRecorrido = input.trayectoRecorrido.map(trayecto =>
      new Trayecto().deserialize(trayecto)
    )

    this.ubicacionActual = new Trayecto().deserialize(input.ubicacionActual)

    this.siguienteDepartamento = new Trayecto().deserialize(
      input.siguienteDepartamento
    )

    return this
  }

  static fromJSON(data: any) {
    return Object.assign(new this(), data)
  }

  static fromJSON_Array(data: any[]) {
    return data.map(x => (x = Orden.fromJSON(x)))
  }
}

export interface Ruta {
  idProceso: string
  idDepartamento: string
  entrada: Date
  salida: Date
  recibida: boolean
  ubicacionActual: boolean
  recepcion: Date
  consecutivo: number,
  trabajando:boolean
  trabajandoDesde:Date
  
  datos: {} //--> ESte varia entre cada uno
}
