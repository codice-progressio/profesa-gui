import { Deserializable } from "../deserealizable.model"
import { Domicilio } from "./domicilio.model"
import { Contacto } from "./contacto.model"
import { RelacionArticulo } from "./relacionArticulo.model"
import { Cuenta } from "./cuenta.model"
import { Articulo } from "../almacenDeMateriaPrimaYHerramientas/articulo.modelo"
import * as moment from "moment"


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

  obtenerRelacionPorArticulo(articulo: Articulo): RelacionArticulo {
    return this.relacionArticulos.find((art) => {
      return art.item._id === articulo._id
    })
  }

  obtenerFechaEstimadaDeEntregaEnRelacionAArticulo(articulo: Articulo): Date {
    // Obtenemos el dia de hoy.current
    let hoy = moment()

    let relacion = this.obtenerRelacionPorArticulo(articulo)

    let tiempo: number = relacion.tiempoDeEntregaEnDias
      ? relacion.tiempoDeEntregaEnDias
      : this.tiempoDeEntregaEstimadoEnDias

    let futuro = moment( hoy ).add(tiempo, 'days').toDate()
    return futuro
  }
}
