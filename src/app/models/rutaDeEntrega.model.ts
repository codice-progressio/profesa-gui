export interface RutaDeEntrega {
  _id: string
  nombre: string
  descripcion: string
  gui: AccionesGUI
}

export interface AccionesGUI {
  cargando: boolean
}
