import { SkuLote } from './lote.model'
export interface SKU {
  _id: string
  puedoProducirlo: boolean
  puedoComprarlo: boolean
  puedoVenderlo: boolean

  produccion: {
    familiaDeProcesos: string

    bom: {
      material: string
      factor: number
    }[]
  }

  unidad: string
  descripcion: string
  imagenes: SkuImagen[]

  nombreCompleto: string

  /**
   * La existencia de sku en el almacen.
   * Esta se actualiza automaticamente cuando se
   * se guarda la salida de sku o entra un nuevo lote.
   */
  existencia: number

  // La suma de la existencia de los almacenes
  // tomando en cuenta los que esten divididos entre
  // lotes diferentes.
  existenciaAlmacenes: {}

  /**
   * Los lotes de este sku. Ver schema para mas info.
   */
  lotes: SkuLote[]

  // Valores para las existencias.
  stockMinimo: number
  stockMaximo: number
  etiquetas: string[]
}

export interface SkuImagen {
  _id: string
  nombreOriginal: string
  nombreBD: string
  path: string
}
