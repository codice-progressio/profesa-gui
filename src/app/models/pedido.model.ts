import { Usuario } from './usuario.model'
import { Contacto } from './contacto.model'
import { SKU } from './sku.model'
import { EstadoDeProceso } from '../componentes-modulares/estado-de-proceso/estado-de-proceso.model'
import { ListaDePrecios } from './listaDePrecios.model'
export interface Pedido {
  _id: Number
  _id_nube: Number
  eliminado: boolean
  contacto: Contacto
  usuario: Usuario
  articulos: ArticuloPedido[]
  observaciones: string
  acciones: PedidoAccion[]
  createdAt: Date | string
  upadtedAt: Date | string
  listaDePreciosId: ListaDePrecios 

  //UI
  total: number
  iva: number
  importe: number
  folio: string //Usuario +  fecha + hora
  folio_interno: number
  folio_interno_display: string
  folio_usuario: string
  ubicacion: {
    latitud: number
    longitud: number
  }

  sincronizado: boolean
  estado: EstadoDeProceso[]
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
