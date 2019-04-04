

/**
 *Esta clase contiene los parametros basicos para filtrar
 datos. 

 *
 * @export
 * @class FiltrosDeConsultas
 * @template T
 */
export class FiltrosDeConsultas<T>  {
    
    private _desde: number;
    /**
     *Desde donde se va empezar a limitar la consulta
     *
     * @type {number}
     * @memberof Filtros
     */
    public get desde(): number {
        return this._desde;
    }
    public setDesde(value: number): this {
        this._desde = value;
        return this
    }
    private _limite: number;
    /**
     *El limite de registros que se van a mostrar. 
     *
     * @type {number}
     * @memberof Filtros
     */
    public get limite(): number {
        return this._limite;
    }
    public setLimite(value: number): this {
        this._limite = value;
        return this
    }

    private _campo: string;
    /**
     *El campo o los campos por el cual se va ordenar. 
     *
     * @type {string}
     * @memberof Filtros
     */
    public get campo(): string {
        return this._campo;
    }
    public setCampo(value: string): this {
        this._campo = value;
        return this
    }

    
    private _sort: string;
    /**
     *El tipo de ordenamiento. 1 o -1
     *
     * @type {string}
     * @memberof Filtros
     */
    public get sort(): string {
        return this._sort;
    }
    public setSort(value: string): this {
        this._sort = value;
        return this
    }
    /**
     *Creates an instance of FiltrosDeConsultas.
     * @param {T} servicio Para tener acceso al servicio utilizando la notacion de punto. 
     * @memberof FiltrosDeConsultas
     */
    constructor(
        public servicio: T,
    ) {
            }


    /**
     *Retorna un objeto con el par nombreDeCampo:datoAFiltrar en base a los 
     campos que se asignaron. Los campos en null se omiten. 
     *
     * @returns {{[string:string]:string}}
     * @memberof FiltrosFolio <T>
     */
    public obtenerFiltros( ): {[string:string]:string} {
        // Obtenemos las propiedades existentes en la clase. 
        let properties = Object.getOwnPropertyNames(this)
        let noVacios = { }
        
        // Separamos las propiedades que esten vacias. 
        for( let x in properties ){
          if( this[properties[x]] ){
            //   Agregamos las que no esten vacias a al objeto que vamos a retornar. 
            noVacios[properties[x]] = this[properties[x]]
          }
        }
  
        return noVacios
    }
}