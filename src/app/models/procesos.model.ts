import { Proceso } from "./proceso.model"
export class Procesos {
  constructor(
    public _id?: any,
    public proceso?: Proceso,
    public orden?: string,
    // El padre de este proceso. Nos sirve para ordenar.
    public procesoPadre: Proceso = new Proceso(),
    // Solo para GUI
    public esDeFamilia: boolean = true,
    // Para ordenador visual.
    public dragEnable: boolean = true
  ) {}

  deserialize(input: this): this {
    //console.log("?.1.5.1.0");
    Object.assign(this, input)
    //console.log("?.1.5.1.1");
    this.proceso = new Proceso().deserialize(input.proceso)
    //console.log("?.1.5.1.2", input.procesoPadre);
    this.procesoPadre = new Proceso().deserialize(input.procesoPadre)
    //console.log("?.1.5.1.3");

    return this
  }

  static fromJSON(data: any) {
    data.proceso = Proceso.fromJSON(data.proceso)
    return Object.assign(new this(), data)
  }
  static fromJSON_Array(data: any[]) {
    return data.map(x => (x = Procesos.fromJSON(x)))
  }
}
