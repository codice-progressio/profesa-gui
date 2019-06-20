export interface IBasicosModel <servicio> {
    /**
     *Permite acceder al servcio para este modelo. Se tiene que instanciar. 
     *
     * @type {servicio}
     * @memberof IBasicosModel
     */
    _servicio: servicio
    
    /**
     *Comprueba que el servcio este instanciado.
     *
     * @returns {boolean} True si esta instanciado, false si no. 
     * @memberof IBasicosModel
     */
    comprobarServicio(servicio: servicio)

}