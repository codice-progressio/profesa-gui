import { Component, OnInit, Input } from '@angular/core';
import { Maquina } from 'src/app/models/maquina.model';

@Component({
  selector: 'app-maquinas-detalle',
  templateUrl: './maquinas-detalle.component.html',
  styles: []
})
export class MaquinasDetalleComponent implements OnInit {

  
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
   * @type {Maquina}
   * @memberof MaquinasDetalleComponent
   */
  @Input() maquinaDetalle: Maquina = null;
  

  constructor() { 
  }

  ngOnInit() {
  }

}
