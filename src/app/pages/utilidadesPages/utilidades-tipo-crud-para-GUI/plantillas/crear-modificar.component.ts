import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-crear-modificar',
  templateUrl: './crear-modificar.component.html',
  styles: []
})
export class CrearModificarComponent implements OnInit {


  /**
   *Muestra el contenedor para empezar a animarlo. 
   *
   * @type {boolean}
   * @memberof CrearModificarComponent
   */
  @Input() mostrarCrearModificar: boolean;
  /**
   *Cambia las clases para empezar a animar el contenedor. 
   *
   * @type {boolean}
   * @memberof CrearModificarComponent
   */
  @Input() crearModificar: boolean;
  /**
   *Define si se agrega a la leyenda la palabra 'nueva' o no. Se usa para las modificaciones. 
   *
   * @type {boolean}
   * @memberof CrearModificarComponent
   */
  @Input() esModificacion: boolean;
  /**
   *El nombre con el que se referira al elemento. 
   *
   * @type {string}
   * @memberof CrearModificarComponent
   */
  @Input() nombreElemento: string = 'Nombre elemento';

  /**
   *Diferencia entre el nombre del elemento masculino y femenio para la palabra 
   nuevo o nueva. 
   *
   * @type {boolean}
   * @memberof CrearModificarComponent
   */
  @Input( ) esMasculino: boolean;




  constructor() { }

  ngOnInit() {
  }

}
