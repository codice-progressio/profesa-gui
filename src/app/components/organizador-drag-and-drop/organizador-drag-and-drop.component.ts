import { Component, OnInit, Input } from '@angular/core';
import { OrganizadorDragAndDropService } from './organizador-drag-and-drop.service';

/**
 *Esta clase gestiona el componente que generara una lista tipo dnd y
 y una de elementos dragables.
 *
 * @export
 * @class OrganizadorDragAndDropComponent
 * @implements {OnInit}
 * @template T
 */
@Component({
  selector: 'app-organizador-drag-and-drop',
  templateUrl: './organizador-drag-and-drop.component.html',
  styles: [`
    .dnd-drag-start {
        -moz-transform:scale(0.8);
        -webkit-transform:scale(0.8);
        transform:scale(0.8);
        opacity:0.7;
        border: 2px dashed #000;
    }

    .dnd-drag-enter {
        opacity:0.7;
        border: 2px dashed #000;
    }

    .dnd-drag-over {
        border: 2px flat #000;
    }

    .dnd-sortable-drag {
      -moz-transform:scale(0.9);
      -webkit-transform:scale(0.9);
      transform:scale(0.9);
      opacity:0.7;
      border: 1px dashed #000;
    }

  `]
})
export class OrganizadorDragAndDropComponent<T> implements OnInit {

  /**
   *Define si se muestra o no la lista ordenable. 
   *
   * @type {boolean}
   * @memberof OrganizadorDragAndDropComponent
   */
  @Input() listaOrdenable: boolean = false;
  /**
   *Define si se muestra o no la lista de elementos.
   *
   * @type {boolean}
   * @memberof OrganizadorDragAndDropComponent
   */
  @Input() listaDeElementos: boolean = false;



  constructor(
    public s: OrganizadorDragAndDropService<T>
  ) { }

  ngOnInit() {
  }

}
