export interface Proveedor {
  _id: string
  nombre: string
  razonSocial: string
  domicilios: ProveedorDomicilio[]
  contactos: ProveedorContacto[]
  rfc: string
  cuentas: ProveedorCuenta[]
  // Establece como eliminado el proveedor. Esto sirve
  // para que las referencias como las compras
  // por precio de proveedor no se vean afectadas
  // al eliminar todos los datos relacionados con el proveedor.
  eliminado: boolean
  esProveedor: boolean
  esCliente: boolean,
  etiquetas: string[]
}

export interface ProveedorDomicilio {
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

export interface ProveedorContacto {
  _id: string
  nombre: string[]
  telefono: string[]
  correo: string[]
  puesto: string[]
}

export interface ProveedorCuenta {
  _id: string
  clabe: number
  cuenta: number
  banco: string
}
