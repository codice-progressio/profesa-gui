import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { EstadoDeProceso } from './estado-de-proceso.model'

@Component({
  selector: 'app-estado-de-proceso',
  templateUrl: './estado-de-proceso.component.html',
  styleUrls: ['./estado-de-proceso.component.scss']
})
export class EstadoDeProcesoComponent implements OnInit {
  @Input() estados: EstadoDeProceso[] = []

  @Output() detalle = new EventEmitter<EstadoDeProceso>()

  constructor() {}

  ngOnInit(): void {}

  click(estado: EstadoDeProceso) {
    this.detalle.emit(estado)
  }
}
