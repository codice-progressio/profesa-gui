import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-estadistica-recargar',
  templateUrl: './estadistica-recargar.component.html',
  styleUrls: ['./estadistica-recargar.component.css']
})
export class EstadisticaRecargarComponent implements OnInit {
  cargando = false
  constructor() {}

  @Output() ejecutar = new EventEmitter()
  @Output() esteComponente = new EventEmitter<EstadisticaRecargarComponent>()

  ngOnInit(): void {
    this.esteComponente.emit(this)
  }

  recargar() {
    if(this.cargando) return
    this.cargando = true
    this.ejecutar.emit()
  }
}
