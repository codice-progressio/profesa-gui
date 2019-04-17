import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Orden } from '../../../models/orden.models';
import { FolioLinea } from 'src/app/models/folioLinea.models';

@Component({
  selector: 'app-pedidos-detalle',
  templateUrl: './pedidos-detalle.component.html',
  styles: []
})
export class PedidosDetalleComponent implements OnInit {
  
  
  /**
   *El pedido para mostrar el detalle. 
   *
   * @type {FolioLinea}
   * @memberof PedidosDetalleComponent
   */
  @Input() pedido: FolioLinea =  null

  /**
   *La orden para mostrar el detalle. 
   *
   * @memberof PedidosDetalleComponent
   */
  @Output() orden =  new EventEmitter<Orden>()
  
  constructor() { }

  ngOnInit() {
  }

}
