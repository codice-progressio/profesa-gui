import { ListaDePrecios } from './listaDePrecios.model'
import { RutaDeEntrega } from './rutaDeEntrega.model'
import { Usuario } from './usuario.model'
export interface Contacto {
  _id: string
  codigo: string
  nombre: string
  razonSocial: string
  domicilios: ContactoDomicilio[]
  contactos: ContactoContacto[]
  rfc: string
  cuentas: ContactoCuenta[]
  // Establece como eliminado el contacto. Esto sirve
  // para que las referencias como las compras
  // por precio de proveedor no se vean afectadas
  // al eliminar todos los datos relacionados con el proveedor.
  eliminado: boolean
  esProveedor: boolean
  esCliente: boolean
  etiquetas: string[]
  rutas: RutaDeEntrega[]
  // listaDePrecios: string | ListaDePrecios
  listaDePrecios: string
  usuariosAsignados: Usuario []
}

export interface ContactoDomicilio {
  _id: string
  calle: string
  numeroInterior: string
  numeroExterior: string
  colonia: string
  codigoPostal: string
  estado: string
  pais: string
  ciudad: string
  urlMaps: string
}

export interface ContactoContacto {
  _id: string
  nombre: string[]
  telefono: string[]
  correo: string[]
  puesto: string[]
}

export interface ContactoCuenta {
  _id: string
  clabe: number
  cuenta: number
  banco: string
}
