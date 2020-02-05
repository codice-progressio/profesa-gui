import { AlmacenDescripcion } from './almacen-descripcion.model'
import { Deserializable } from '../deserealizable.model'
import { SalidaArticulo } from './salidaArticulo.model'
import { EntradaArticulo } from './entradaArticulo.model'

export class Articulo implements Deserializable {
  constructor(
    public _id?: string,
    public codigoLocalizacion?: string,
    public codigoInterno?: string,
    public codigoProveedor?: string,
    public almacen?: AlmacenDescripcion,
    public nombre?: string,
    public presentacion?: string,
    public unidad?: string,
    public kgPorUnidad: number = 0,
    public existencia: number = 0,
    public stockMinimo: number = 0,
    public stockMaximo: number = 0,
    public salidas: SalidaArticulo[] = [],
    public entradas: EntradaArticulo[] = [],
    public descripcion?: string,
    public observaciones?: string,
    public imagenes: string[] = [],
    public enTransito: []= [],
    public _7: []= [],
    public _30: []= [],
    public _365: []= []
  ) {}

  deserialize(input: this): this {
    Object.assign(this, input)
    this.almacen = new AlmacenDescripcion().deserialize(input.almacen)
    this.salidas.map(salida => new SalidaArticulo().deserialize(salida))
    this.entradas.map(entrada => new EntradaArticulo().deserialize(entrada))
    return this
  }

  existenciaEnKg(): number {
    let a = this.kgPorUnidad * this.existencia
    return a
  }

  comprobarExistencias() {
    let valor: number = 2

    if (this.existencia > this.stockMaximo) valor = 1
    if (this.existencia < this.stockMinimo) valor = -1
    if (this.existencia == 0) valor = 0

    return valor
  }

  obtenerPrimeraImagenSiExiste() {
    if (this.imagenes.length > 0) return this.imagenes[0]
  }
}
