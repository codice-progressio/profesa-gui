import { Component, OnInit, Input } from '@angular/core';
import { Lotes } from 'src/app/models/almacenProductoTerminado/lotes.model';

@Component({
  selector: 'app-lote-detalle',
  templateUrl: './lote-detalle.component.html',
  styles: []
})
export class LoteDetalleComponent implements OnInit {
  constructor() { }

  @Input() lote: Lotes

  ngOnInit() {
  }

}
