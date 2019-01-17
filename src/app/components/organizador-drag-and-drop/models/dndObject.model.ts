import { OrganizadorDragAndDrop } from "./organizador-drag-and-drop.model";

/**
 *El objeto que almacena los datos para organizador. 
 *
 * @export
 * @class DndObject
 * @template T El tipo de objeto que se guardara en objeto.
 */
export class DndObject<T> {

    /**
     *Senala hacia el objeto dnd raiz.
     *
     * @type {OrganizadorDragAndDrop<T>}
     * @memberof DndObject
     */
    dnd: OrganizadorDragAndDrop<T>
    /**
      *La leyenda de texto que mostrara el elemento de lista.
      *
      * @type {string}
      * @memberof DndObject
      */
     leyenda?: string;
     /**
      *La leyenda optativa secundaria
      *
      * @type {string}
      * @memberof DndObject
      */
     leyendaOptativa?: string;
     /**
      *El objeto relacionado que se va a almacenar.
      *
      * @type {T}
      * @memberof DndObject
      */
     objeto?: T

     /**
      *Define si se puede eliminar el elemento.
      *
      * @type {boolean}
      * @memberof DndObject
      */
     eliminable: boolean = false;

     /**
      * Almacena el orden del acomodo con su respectivo decimal.
      *
      * @type {string}
      * @memberof DndObject
      */
     orden: string;

     /**
      * Define el objeto padre para hacer referencia mas facil al buscar. 
      *
      * @type {T}
      * @memberof DndObject
      */
     objetoPadre: T;


    
    constructor(
        dnd?: OrganizadorDragAndDrop<T>
    ) {
        this.dnd = dnd;
    }

    /**
     *Define la leyenda que se va a mostrar
     *
     * @param {string} leyenda
     * @returns {DndObject<T>}
     * @memberof DndObject
     */
    setLeyenda(leyenda: string): DndObject<T>{
        this.leyenda = leyenda;
        return this;
    }
    /**
     *Define la leyenda optativa que se va a mostrar.
     *
     * @param {string} leyendaOptativa
     * @returns {DndObject<T>}
     * @memberof DndObject
     */
    setLeyendaOptativa(leyendaOptativa: string): DndObject<T>{
        this.leyendaOptativa = leyendaOptativa;
        return this;
    }


    /**
     * Setea como eliminable o no el elemento.
     *
     * @param {boolean} e 
     * @returns {DndObject<T>}
     * @memberof DndObject
     */
    setEliminable(e: boolean ): DndObject<T>{
        this.eliminable = e;
        return this;
    }

    /**
     *El objeto cuyo valor instera guardar.
     *
     * @param {T} obj
     * @returns {DndObject<T>}
     * @memberof DndObject
     */
    setObjeto(obj:T):DndObject<T>{
        this.objeto = obj;
        return this;
    }

    /**
     * Define el orden del objeto. Normalmente
     * se utiliza una secuencia 1.12, 1.2, etc. 
     *
     * @param {string} i El numero que se va almacenar. 
     * @returns {DndObject<T>}
     * @memberof DndObject
     */
    setOrden( i:string ): DndObject<T>{ 
        this.orden = i;
        return this;
    }




}