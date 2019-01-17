export class BuscadorRapido<T> {

    /**
     *El nombre del elemento(USAR SET)
     * @type {string}
     * @memberof BuscadorRapido
     */
    nombre?: string;
    /**
     *El objeto que almacenara. (USAR SET)
     *
     * @type {T}
     * @memberof BuscadorRapido
     */
    objeto?: T;
    /**
     *Muestra el efecto de atenuacion del buscador (USAR SET)
     *
     * @type {boolean}
     * @memberof BuscadorRapido
     */
    atenuar: boolean = false;
    /**
     *El mensaje que se mostrara cuando este atenuado. (USAR SET)
     *
     * @type {string}
     * @memberof BuscadorRapido
     */
    mensajeAtenuacion?: string;
    /**
     *La clase que se aplicara en la atenuacion del texto.
     *
     * @type {string}
     * @memberof BuscadorRapido
     */
    claseAtenuacion: string ='text-muted';


    /**
     *Se recomienda no usar el constructor para este objeto. 
     * @param {string} [_nombre]
     * @param {T} [_objeto]
     * @param {boolean} [_atenuar=false]
     * @param {string} [_mensajeAtenuacion]
     * @param {string} [_claseAtenuacion='text-muted']
     * @memberof BuscadorRapido
     */
    constructor(
        public _nombre?: string,
        public _objeto?: T,
        public _atenuar: boolean = false,
        public _mensajeAtenuacion?: string,
        public _claseAtenuacion: string ='text-muted'
    ) {

    this.nombre = _nombre
    this.objeto = _objeto
    this.atenuar = _atenuar
    this.mensajeAtenuacion = _mensajeAtenuacion
    this.claseAtenuacion = _claseAtenuacion

    }


    /**
     *Define el nombre que mostrara el elemento. 
     *
     * @param {string} nombre El nombre para mostrar.
     * @returns {BuscadorRapido<T>} Este objeto.
     * @memberof BuscadorRapido
     */
    setNombre( nombre:  string):BuscadorRapido<T>{
        this.nombre =nombre; 
        return this;
    }
    /**
     *El objeto que queremos almacenar temporalmente. 
     *
     * @param {T} objeto El objeto a almacenar. 
     * @returns {BuscadorRapido<T>}
     * @memberof BuscadorRapido
     */
    setObjeto( objeto:  T):BuscadorRapido<T>{
        this.objeto =objeto; 
        return this;
    }
    /**
     *Si se atenuara el elemento. 
     *
     * @param {boolean} atenuar
     * @returns {BuscadorRapido<T>}
     * @memberof BuscadorRapido
     */
    setAtenuar( atenuar:  boolean):BuscadorRapido<T>{
        this.atenuar = atenuar;
        return this;
    }
    /**
     *El mensaje que se mostrara cuando el elemento este atenuado. 
     *
     * @param {string} mensajeAtenuacion
     * @returns {BuscadorRapido<T>}
     * @memberof BuscadorRapido
     */
    setMensajeAtenuacion( mensajeAtenuacion:  string):BuscadorRapido<T>{
        this.mensajeAtenuacion = mensajeAtenuacion
        return this;
    }
    /**
     *La clase que se aplicara cuando el elemento se atenue. 
     *
     * @param {string} claseAtenuacion 
     * @returns {BuscadorRapido<T>}
     * @memberof BuscadorRapido
     */
    setClaseAtenuacion( claseAtenuacion:  string):BuscadorRapido<T>{
        this.claseAtenuacion = claseAtenuacion;
        return this;
    }






    
}