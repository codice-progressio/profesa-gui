import { Lote } from './lote.model'
export interface SKU {
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
  imagenes: {
    nombreOriginal: string
    nombreBD: string
    path: string
  }[]

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
  lotes: {
    type: Lote[]
    select: false
  }

  // Valores para las existencias.
  stockMinimo: number
  stockMaximo: number
  etiquetas: string[]
}
