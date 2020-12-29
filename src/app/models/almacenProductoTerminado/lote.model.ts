export interface Lote {
  existecia: number
  // La existencia de cada almacen que se vaya creando.
  // Este valor es dinamico pues permite que el usuario
  // cree diferentes almacenes segun sus necesidades.
  // Se espera que la clave de este objecto sea el id
  // del almacen y solo contenga la cantidad.
  existenciaAlmacenes: any
  observaciones: ''
  movimientos: {
    cantidad: number
    // true entrada, false salida.
    esEntrada: boolean
    observaciones: string
    createdAt: Date
    usuario: string
    almacen: string
  }[]
  createdAt: Date
  caducidad: Date
}
