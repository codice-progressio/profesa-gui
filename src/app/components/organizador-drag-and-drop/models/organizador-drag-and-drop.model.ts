import { Hijos } from "./hijos.model";
import { DndObject } from './dndObject.model';

/**
 *Guarda los datos para generar el organizador.
 *
 * @export
 * @class OrganizadorDragAndDrop
 * @template T El tipo de dato que van a manejarse cuando se guarden los objetos. 
 */
export class OrganizadorDragAndDrop<T> {
    /**
     *El padre del area de organizadcion.
     *
     * @type {DndObject<T>}
     * @memberof OrganizadorDragAndDrop
     */
    public padre: DndObject<T> = new DndObject(this);
    /**
     *Los hijos que pueden organizarse, mantenerse fijos, organizarze y no eliminarse.
     *
     * @type {Hijos<T>}
     * @memberof OrganizadorDragAndDrop
     */
    public hijos: Hijos<T> = new Hijos(this);


    
    constructor(
    ) {
    }
    
    /**
     * Define el nuevo padre. Es el inicio de la cadena.
     *
     * @returns {DndObject<T>} Retorna la instancia dnd del padre. 
     * @memberof OrganizadorDragAndDrop
     */
    setPadre( ):DndObject<T>{
        return this.padre;
    }



    
}