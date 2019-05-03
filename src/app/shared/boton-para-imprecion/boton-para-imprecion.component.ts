import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-boton-para-imprecion',
  templateUrl: './boton-para-imprecion.component.html',
  styles: []
})
export class BotonParaImprecionComponent implements OnInit {

  
  /**
   *El id propio que encierra el area a imprimirse. Tiene que ser unico. 
   *
   * @type {string}
   * @memberof BotonParaImprecionComponent
   */
  @Input() id: string
  @Input() mostrarTexto: boolean = true
  
  constructor() { }

  ngOnInit() {

    if( !this.id ){
      throw 'No has definido el id del area.'
    }
  }

}
