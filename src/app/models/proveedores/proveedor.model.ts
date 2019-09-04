import { Deserializable } from "../deserealizable.model"
import { Domicilio } from "./domicilio.model"
import { Contacto } from "./contacto.model"
import { RelacionArticulo } from "./relacionArticulo.model"
import { Cuenta } from "./cuenta.model"
export class Proveedor implements Deserializable {
  constructor(
    public _id?: string,
    public nombre?: string,
    public razonSocial?: string,
    public domicilios: Domicilio[] = [],
    public contactos: Contacto[] = [],
    public tiempoDeEntregaEstimadoEnDias?: number,
    public relacionArticulos: RelacionArticulo[] = [],
    public rfc?: string,
    public metodosDePagoAceptados: string[] = [],
    public condicionesDePago: string[] = [],
    public formasDePago: string[] = [],
    public cuentas: Cuenta[] = []
  ) {}
  deserialize(input: this): this {
    Object.assign(this, input)

    this.domicilios = input.domicilios.map((i) =>
      new Domicilio().deserialize(i)
    )
    this.contactos = input.contactos.map((i) => new Contacto().deserialize(i))
    this.relacionArticulos = input.relacionArticulos.map((i) =>
      new RelacionArticulo().deserialize(i)
    )
    this.cuentas = input.cuentas.map((i) => new Cuenta().deserialize(i))

    return this
  }
}
