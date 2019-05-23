

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
     *
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
     *
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
    public setCampo(value:string): this {
        this._campo = value
        return this
    }


    private _sortCampos: string 
    public get sortCampos(): string {
        return this._sortCampos;
    }
    public setSortCampos(value:[ string, number][]): this {
        
        let a: string []= value.map( (x)=>{
            return `${x[0]}>${x[1]}`
        })
        
        this._sortCampos = a.join('@');

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

        properties.push( 'sort' )
        properties.push( 'campo' )
        properties.push( 'sortCampos' )
        properties.push( 'desde' )
        properties.push( 'limite' )
        // Quitamos la propiedad servicio para que no nos perjudique.
        properties = properties.filter( (x)=>{ return x !== 'servicio'} )
        properties = properties.map( (x)=>{
            return  x.replace('_', '')
        })
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