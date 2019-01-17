import { DndObject } from "./dndObject.model";
import { OrganizadorDragAndDrop } from "./organizador-drag-and-drop.model";

/**
 *Esta clase estrucutra los tipos de hijo que puede tener 
 el organizador
 *
 * @export
 * @class Hijos
 * @template T El tipo de objeto que se almacenara. 
 */
export class Hijos<T> {
     /**
     *Senala hacia el objeto dnd raiz.
     *
     * @type {OrganizadorDragAndDrop<T>}
     * @memberof Hijos
     */
    dnd: OrganizadorDragAndDrop<T>
    /**
     * Los hijos que se mostraran de manera fija. Estos no se pueden ordenar.
     *
     * @type {DndObject<T> []}
     * @memberof Hijos
     */
    public fijos : DndObject<T> [] = [];
    /**
     * Los hijos que se pueden reordenar y eliminar. 
     *
     * @type {DndObject<T>[]}
     * @memberof Hijos
     */
    public ordenables : DndObject<T>[] = [];
    
    constructor(
        dnd: OrganizadorDragAndDrop<T>
    ) {
        this.dnd = dnd;
        
    }
    
    /**
     *Anade un hijo fijo. 
     *
     * @returns {DndObject<T>}
     * @memberof Hijos
     */
    addFijo( ):DndObject<T>{
        let dndO: DndObject<T>   = new DndObject(this.dnd);
        this.fijos.push(dndO);
        return dndO;
    }
    
    /**
     *Agrega un hijo ordenable.
     *
     * @returns {DndObject<T>}
     * @memberof Hijos
     */
    addOrdenable( ):DndObject<T>{
        let dndO: DndObject<T>   = new DndObject(this.dnd);
        this.ordenables.push(dndO);
        return dndO;
    }


}