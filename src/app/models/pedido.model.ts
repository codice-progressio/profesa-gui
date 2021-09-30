import { Usuario } from './usuario.model'
import { Contacto } from './contacto.model'
import { SKU } from './sku.model'
export interface Pedido {
  _id: Number
  eliminado: boolean
  contacto: Contacto
  usuario: Usuario
  articulos: ArticuloPedido[]
  observaciones: string
  acciones: PedidoAccion[]
  createdAt: Date
  upadtedAt: Date

  //UI
  total: number
  folio: String //Usuario +  fecha + hora
}

export interface ArticuloPedido {
  _id: string
  cantidad: number
  //Si aplica, se usa de lista de precio
  precio: number
  sku: SKU
  observaciones: string
}

export interface PedidoAccion {
  _id: string
  accion: string
  usuario: string
  createdAt: Date
  estadoDocumento: any
}
