import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { ModeloCompleto } from 'src/app/models/modeloCompleto.modelo';
import { Lotes } from '../../../models/almacenProductoTerminado/lotes.model'

@Component({
  selector: 'app-almacen-de-producto-terminado-detalle',
  templateUrl: './almacen-de-producto-terminado-detalle.component.html',
  styles: []
})
export class AlmacenDeProductoTerminadoDetalleComponent implements OnInit {

  @Input() modeloCompleto: ModeloCompleto = null 

  verLotesSinExistencia: boolean = false

  @Output() detalleLote = new EventEmitter<Lotes>()

    constructor() { }

  ngOnInit() {
  }

   mostrarDetalleLote( lote:Lotes ) {
     this.detalleLote.emit( lote )
   }










}
