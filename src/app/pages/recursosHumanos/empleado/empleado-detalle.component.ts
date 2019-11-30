import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import { Empleado } from "src/app/models/recursosHumanos/empleados/empleado.model"
import { Puesto } from 'src/app/models/recursosHumanos/puestos/puesto.model';

@Component({
  selector: "app-empleado-detalle",
  templateUrl: "./empleado-detalle.component.html",
  styles: []
})
export class EmpleadoDetalleComponent implements OnInit {
  @Input() empleado: Empleado = null
  @Output() detallePuesto = new EventEmitter<Puesto>()
  constructor() {}

  ngOnInit() {}
  asignarDetallePuesto(puesto: Puesto) {
    this.detallePuesto.emit(puesto)
  }
}
