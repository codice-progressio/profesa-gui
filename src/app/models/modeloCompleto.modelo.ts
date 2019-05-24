import { Modelo } from "./modelo.models"
import { Tamano } from "./tamano.models"
import { Color } from "./color.models"
import { Terminado } from "./terminado.models"
import { Laser } from "./laser.models"
import { FamiliaDeProcesos } from "./familiaDeProcesos.model"
import { Procesos } from "./procesos.model"
import { BasicosGUI } from "./basicosGUI.model"
import { log } from "util"
import { Lotes } from "./almacenProductoTerminado/lotes.model";

export class ModeloCompleto implements BasicosGUI {
  convertido: boolean
  editado: boolean

  constructor(
    public _id?: string,
    public modelo?: Modelo,
    public tamano?: Tamano,
    public color?: Color,
    public terminado?: Terminado,
    public laserAlmacen?: Laser,
    public versionModelo?: String,
    public medias: boolean = false,
    public nombreCompleto?: string,
    public familiaDeProcesos?: FamiliaDeProcesos,
    public esBaston: boolean = false,

    public existencias: number=0,
    public lotes: Lotes[]= [],
    public stockMinimo: number = 0,
    public stockMaximo: number = 0,
    // Cualquier proceso fuera de los de la familia de
    // procesos.
    public procesosEspeciales: Procesos[] = [],
    // Posiblemente es para los costos.
    public espesor?: number,
    public porcentajeDeMerma?: number,
    // Este es solo para modificaciones de las órdenes.
    public mediasGeneradas: boolean = false // Para ordenamiento
  ) {}

  deserialize(input: this): this {
    //console.log("x  ?.1.0");
    Object.assign(this, input)

    this.modelo = new Modelo().deserialize(input.modelo)
    //console.log("x  ?.1.1");
    this.tamano = new Tamano().deserialize(input.tamano)
    //console.log("x  ?.1.2");
    this.color = new Color().deserialize(input.color)
    //console.log("x  ?.1.3");
    this.terminado = new Terminado().deserialize(input.terminado)
    //console.log("x  ?.1.4");
    this.laserAlmacen = new Laser().deserialize(input.laserAlmacen)
    //console.log("x  ?.1.5");
    this.familiaDeProcesos = new FamiliaDeProcesos().deserialize(
      input.familiaDeProcesos
    )
    //console.log("x  ?.1.6");

    this.procesosEspeciales = input.procesosEspeciales.map(proceso =>
      new Procesos().deserialize(proceso)
    )
    //console.log("x  ?.1.7");

    return this
  }

  // Convierte un json a una clase de este tipo
  //  desde un arreglo.
  static fromJSON_Array(data: any[]) {
    return data.map(x => (x = ModeloCompleto.fromJSON(x)))
  }

  // Convierte un JSON a esta claser.
  static fromJSON(data: any) {
    // Convertimos todos los objetos en clases.
    data.modelo = Modelo.fromJSON(data.modelo)
    data.tamano = Tamano.fromJSON(data.tamano)
    data.color = Color.fromJSON(data.color)
    data.terminado = Terminado.fromJSON(data.terminado)
    data.laserAlmacen = Laser.fromJSON(data.laserAlmacen)
    data.familiaDeProcesos = FamiliaDeProcesos.fromJSON(data.familiaDeProcesos)
    data.procesosEspeciales = Procesos.fromJSON_Array(data.procesosEspeciales)
    return Object.assign(new this(), data)
  }

  static nombreCom(x) {
    let nombreCompleto = ""
    nombreCompleto += x.modelo ? x.modelo.modelo : ""
    nombreCompleto += x.tamano ? "-" + x.tamano.tamano : ""
    nombreCompleto += x.color ? "-" + x.color.color : ""
    nombreCompleto += x.terminado ? "-" + x.terminado.terminado : ""
    nombreCompleto += x.laserAlmacen.laser ? "-" + x.laserAlmacen.laser : ""
    nombreCompleto += x.versionModelo ? "-" + x.versionModelo : ""
    return nombreCompleto
  }
}
