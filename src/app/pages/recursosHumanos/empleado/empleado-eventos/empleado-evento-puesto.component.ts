import { Component, OnInit, Input } from '@angular/core';
import { Puesto } from '../../../../models/recursosHumanos/puestos/puesto.model'

@Component({
  selector: 'app-empleado-evento-puesto',
  templateUrl: './empleado-evento-puesto.component.html',
  styles: []
})
export class EmpleadoEventoPuestoComponent implements OnInit {

  mensaje: string
  @Input() fecha: string
  @Input() puesto: Puesto

  constructor() {
    this.mensaje = 'Cambio de puesto'
  }

  ngOnInit() {}

}
