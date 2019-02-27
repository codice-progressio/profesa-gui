import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: []
})
export class ModalComponent implements OnInit {

  /**
   *El id del modal. Puede que este nos sirva cuando haya 
   varios modales en la misma pagina. 
   *
   * @type {string}
   * @memberof ModalComponent
   */
  @Input() idModal: string = 'modalDetalle'
  /**
   *La leyenda antes del titulo. 
   *
   * @type {string}
   * @memberof ModalComponent
   */
  @Input() leyendaTitulo: string
  /**
   *El titulo del modal
   *
   * @type {string}
   * @memberof ModalComponent
   */
  @Input() titulo: string
  /**
   *Define cuando se va a mostrar el modal. (No confundir con la aparcion, si no con el ngIf para
    que el elementoi no lanze errores. )
   *
   * @type {boolean}
   * @memberof ModalComponent
   */
  @Input() mostrar: boolean

  constructor() { }

  ngOnInit() {
  }

}
