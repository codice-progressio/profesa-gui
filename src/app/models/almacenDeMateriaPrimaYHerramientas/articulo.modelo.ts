import { AlmacenDescripcion } from "./almacen-descripcion.model"
import { Deserializable } from "../deserealizable.model"

export class Articulo implements Deserializable {
  constructor(
    public codigoLocalizacion?: string,
    public codigoInterno?: string,
    public codigoProveedor?: string,
    public almacen?: AlmacenDescripcion,
    public nombre?: string,
    public presentacion?: string,
    public unidad?: string,
    public kgPorUnidad?: string,
    public existencia: number = 0,
    public stockMinimo: number = 0,
    public stockMaximo: number = 0
  ) {}

  deserialize(input: this): this {
    Object.assign(this, input)
    this.almacen = new AlmacenDescripcion().deserialize(input.almacen)
    return this
  }
}
