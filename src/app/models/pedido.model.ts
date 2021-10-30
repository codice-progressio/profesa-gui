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
  createdAt: Date | string
  upadtedAt: Date | string

  //UI
  total: number
  iva: number
  importe: number
  folio: string //Usuario +  fecha + hora
  ubicacion: {
    latitud: number
    longitud: number
  }

  sincronizado:boolean
  estado: Estado[]
}

interface Estado {
  _id: string
  nombre: string
  descripcion: string
  hora_inicio: Date
  hora_final: Date
  observaciones
}

export interface ArticuloPedido {
  _id: string
  cantidad: number
  //Si aplica, se usa de lista de precio
  precio: number
  sku: SKU
  observaciones: string
  importe: number
}

export interface PedidoAccion {
  _id: string
  accion: string
  usuario: string
  createdAt: Date
  estadoDocumento: any
}
