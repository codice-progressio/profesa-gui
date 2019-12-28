import { Component, OnInit, Input } from '@angular/core'
import { EventosPuesto } from '../../../../models/recursosHumanos/empleados/eventos/evento_puesto.model'

@Component({
  selector: 'app-empleado-evento-puesto',
  templateUrl: './empleado-evento-puesto.component.html',
  styles: []
})
export class EmpleadoEventoPuestoComponent implements OnInit {
  mensaje: string
  @Input() fecha: string
  @Input() puesto: EventosPuesto

  constructor() {
    this.mensaje = 'Cambio de puesto'
  }

  ngOnInit() {}
}
