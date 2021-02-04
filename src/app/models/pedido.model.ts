import { Usuario } from './usuario.model'
import { Proveedor } from './proveedor.model'
import { SKU } from './sku.model'
export interface Pedido {
  _id: Number
  eliminado: boolean
  contacto: Proveedor
  usuario: Usuario
  articulos: ArticuloPedido[]
  observaciones: string
  acciones: PedidoAccion[]
  createdAt: Date
  upadtedAt: Date
}

export interface ArticuloPedido {
  _id: string
  cantidad: number
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
