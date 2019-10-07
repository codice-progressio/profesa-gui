export class CamposParaMostrarFiltrosGeneral {
  constructor() {}

  /**
     *Muestra todos los campos de input remplazando el valor de 
     configuracion existente por true. 
     *
     * @returns {this}
     * @memberof this
     */
  mostrarTodo(): this {
    Object.getOwnPropertyNames(this).forEach((nombre) => {
      this[nombre] = true
    })
    return this
  }

  /**
         *Oculta todos los campos de input remplanzando el valor
         de configuracion existente por false. 
         *
         * @returns {this}
         * @memberof this
         */
  ocultarTodo(): this {
    Object.getOwnPropertyNames(this).forEach((nombre) => {
      this[nombre] = false
    })
    return this
  }
}
