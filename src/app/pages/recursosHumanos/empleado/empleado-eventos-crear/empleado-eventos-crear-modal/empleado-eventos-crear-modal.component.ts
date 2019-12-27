import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Empleado } from '../../../../../models/recursosHumanos/empleados/empleado.model'

@Component({
  selector: 'app-empleado-eventos-crear-modal',
  templateUrl: './empleado-eventos-crear-modal.component.html',
  styles: []
})
export class EmpleadoEventosCrearModalComponent implements OnInit {
  @Input() empleado: Empleado
  @Output() guardado = new EventEmitter<null>()
  @Output() esteComponente = new EventEmitter<this>()

  idModal = 'agregarEvento'

  eventoSeleccionado: number = null

  constructor() {}

  ngOnInit() {
    this.esteComponente.emit(this)
  }

  guardar() {
    this.guardado.emit()
  }

  curso = () => (this.eventoSeleccionado = 0)
  vacaciones = () => (this.eventoSeleccionado = 1)
  cambiosDeSueldo = () => (this.eventoSeleccionado = 2)
  puesto = () => (this.eventoSeleccionado = 3)
  felicitacionPorEscrito = () => (this.eventoSeleccionado = 4)
  amonestacionPorEscrito = () => (this.eventoSeleccionado = 5)
  castigo = () => (this.eventoSeleccionado = 6)
  permiso = () => (this.eventoSeleccionado = 7)
  bono = () => (this.eventoSeleccionado = 8)
  estatusLaboral = () => (this.eventoSeleccionado = 9)
}
