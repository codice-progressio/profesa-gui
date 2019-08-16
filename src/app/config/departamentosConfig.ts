
export class VariablesDeptos  {
    /**
     * El nombre de la variable. 
     *
     * @type {string}
     * @memberof variablesDeptos
     */
    _v: string;

    /**
     *El nombre que se debe de mostrar. 
     *
     * @type {string}
     * @memberof variablesDeptos
     */
    _n: string;
    /**
     *El nombre de la variable del modelo. 
     *
     * @type {string}
     * @memberof variablesDeptos
     */
    _vm: string;

    constructor( 
        _v: string,
        _n: string,
        _vm: string,
    ) {
        this._v = _v; 
        this._n = _n; 
        this._vm = _vm; 

    }

}


/**
 *Almacena las constates de los departamentos como los siguientes.
 * _v => Para utilizarlo en variables. [MATERIALES._v]
 * _n => El nombre para mostrar. 
 * _vm => El nombre de la variable en el modelo. 
 * Departamento  por de fault de todas las familias de proceso.  
 * CONTROL_DE_PRODUCCION: { _v: 'CONTROL_DE_PRODUCCION', _n: 'CONTROL DE PRODUCCIÓN', _vm:'controlDeProduccion' },
 *
 * @export
 * @class DepartamentosConfig
 */
export class DepartamentosConfig {
    CONTROL_DE_PRODUCCION = new VariablesDeptos (   'CONTROL_DE_PRODUCCION', 'CONTROL DE PRODUCCIÓN','controlDeProduccion' );
    MATERIALES = new VariablesDeptos (   'MATERIALES', 'MATERIALES','materiales' )
    PASTILLA = new VariablesDeptos (   'PASTILLA', 'PASTILLA','pastilla' )
    TRANSFORMACION = new VariablesDeptos (   'TRANSFORMACION', 'TRANSFORMACIÓN','transformacion' )
    PULIDO = new VariablesDeptos (   'PULIDO', 'PULIDO','pulido' )
    SELECCION = new VariablesDeptos (   'SELECCION', 'SELECCIÓN','seleccion' )
    TENIDO = new VariablesDeptos (   'TENIDO', 'TEÑIDO','tenido' )
    EMPAQUE = new VariablesDeptos (   'EMPAQUE', 'EMPAQUE','empaque' )
    PRODUCTO_TERMINADO = new VariablesDeptos (   'PRODUCTO_TERMINADO', 'PRODUCTO TERMINADO','productoTermiando' )
    METALIZADO = new VariablesDeptos (   'METALIZADO', 'METALIZADO','metalizado' )
    BURATO = new VariablesDeptos (   'BURATO', 'BURATO','burato' )
    BARNIZADO = new VariablesDeptos (   'BARNIZADO', 'BARNIZADO','barnizado' )
    LASER = new VariablesDeptos (   'LASER', 'LASER', 'laser' )
    ALMACEN_DE_BOTON = new VariablesDeptos (   'ALMACEN_DE_BOTON', 'ALMACEN DE BOTON', 'almacenDeBoton' )
}

