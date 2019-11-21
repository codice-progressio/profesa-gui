import { Component, OnInit, Input } from "@angular/core"
import { Empleado } from "src/app/models/recursosHumanos/empleados/empleado.model"

@Component({
  selector: "app-empleado-detalle",
  templateUrl: "./empleado-detalle.component.html",
  styles: []
})
export class EmpleadoDetalleComponent implements OnInit {
  @Input() empleado: Empleado = null

  constructor() {}

  ngOnInit() {}
}
