import { Deserializable } from "../deserealizable.model"
export class Domicilio implements Deserializable {
  constructor(
    public calle?: string,
    public numeroInterior?: string,
    public numeroExterior?: string,
    public colonia?: string,
    public codigoPostal?: string,
    public estado?: string,
    public ciudad?: string,
    public pais?: string,
    public urlMaps?: string
  ) {}

  deserialize(input: this): this {
    Object.assign(this, input)
    return this
  }



 
  completo(): string  {


    let d = `${this.calle} #${this.numeroExterior} `

    d += this.numeroInterior ? `int. ${this.numeroInterior}.` :''
    d += this.colonia ? ` Col. ${this.colonia}. ` :''
    d += this.codigoPostal ? ` CP. ${this.codigoPostal} ` :''
    d += this.ciudad ? ` ${this.ciudad}, ` :''
    d += this.estado ? ` ${this.estado}, ` :''
    d += this.pais ? ` ${this.pais} ` :''
    


    return d
  }
}
