import { Component, OnInit, Input } from '@angular/core';
import { MaquinaService } from 'src/app/services/maquina/maquina.service';
import { MaquinasComponent } from './maquinas.component';

@Component({
  selector: 'app-maquinas-crear-modificar',
  templateUrl: './maquinas-crear-modificar.component.html',
  styles: []
})
export class MaquinasCrearModificarComponent implements OnInit {

  @Input() maquinasComponent: MaquinasComponent

  constructor(
    _maquinaService: MaquinaService
  ) {
   
  }

  ngOnInit() {



    //  QUITAR ESTA LINEA. 
    

    if( this.maquinasComponent.idModificar ) {
      console.log( 'se modifica')
    }
  }


  /**
   *Cancela la modificacion o el guardado.\
   *
   * @memberof MaquinasCrearModificarComponent
   */
  cancelar(){
    this.maquinasComponent.animar();
    this.limpiar();
  }

  /**
   *Limpia los datos despues de cancelar, guardar o modifcar. 
   *
   * @memberof MaquinasCrearModificarComponent
   */
  limpiar(){
    console.log( 'todavia no modificar')
  };








}
