import { SKU } from './sku.model'

export interface ListaDePrecios {
  _id: string
  nombre: string
  skus: SKUListaDePrecios[]
  iva: number
  descripcion: string
}

export interface SKUListaDePrecios {
  sku: Partial<SKU> | string
  precio: number
}
