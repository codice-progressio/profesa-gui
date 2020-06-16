import { Input, Directive } from "@angular/core";

/**
 * Esta clase se encarga de gestionar los generales para 
 * mostrar los componentes de detalles. 
 *
 * @export
 * @class Detalles_GUI_CRUD
 */
@Directive()
export class Detalles_GUI_CRUD <T> {

     
  /**
   *El id del modal en html. Este esta definido asi para 
   poder tener varios modales en el mismo lugar y que todos se
   abran. 
   *
   * @type {string}
   * @memberof MaquinasDetalleComponent
   */
  idModal: string = 'modalDetalle' 

  
  /**
   *El elemento que se mostrara en el detalle.
   *
   * @type {T}
   * @memberof MaquinasDetalleComponent
   */
  @Input() detalleElemento: T = null;
    

    constructor( ) {
        
    }
}