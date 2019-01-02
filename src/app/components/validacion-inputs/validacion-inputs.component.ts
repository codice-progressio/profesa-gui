import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

/**
 * Esta componente muestra una leyenda de validacion en los inputs. 
 *
 * @export
 * @class ValidacionInputsComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-validacion-inputs',
  templateUrl: './validacion-inputs.component.html',
  styles: []
})
export class ValidacionInputsComponent implements OnInit {
  
  /**
   * El control con el que se haran las comprobaciones. 
   *
   * @type {AbstractControl}
   * @memberof ValidacionInputsComponent
   */
  @Input() campo: AbstractControl = null;
  /**
   * Un texto especial que se quiera mostrar. Este no se valida. 
   *
   * @type {string}
   * @memberof ValidacionInputsComponent
   */
  @Input() especial: string = null;

  /**
   * Define si se salta la validacion del touch para mostrar
   * siempre la validacion aunque el usuario no interactue con el 
   * control. 
   *
   * @type {boolean}
   * @memberof ValidacionInputsComponent
   */
  @Input() directo: boolean =  false;  

  
  j = JSON;


  constructor() {}

  ngOnInit() {
  }

  /**
   * Comprueba si el campo a sido tocado si directo no a sido
   * puesto como true. Si ha sido puesto como true retorna true
   * directamete.
   *
   * @returns True si ha sido tocado o directo esta como true.
   * @memberof ValidacionInputsComponent
   */
  touched( ){
    if( this.directo ) return true;
    
    if ( this.campo ){
      return this.campo.touched;
    }
    return false;
  }


  
}
