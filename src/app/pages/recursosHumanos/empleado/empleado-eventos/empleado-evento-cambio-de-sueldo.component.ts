import { Component, OnInit, Input } from '@angular/core';
import { CambiosDeSueldo } from 'src/app/models/recursosHumanos/empleados/eventos/cambiosDeSueldo.model';

@Component({
  selector: 'app-empleado-evento-cambio-de-sueldo',
  templateUrl: './empleado-evento-cambio-de-sueldo.component.html',
  styles: []
})
export class EmpleadoEventoCambioDeSueldoComponent implements OnInit {

  mensaje: string
  @Input() fecha: string
  @Input() cambiosDeSueldo: CambiosDeSueldo

  constructor() {
    this.mensaje = 'Cambio de sueldo'
  }

  ngOnInit() {}

}
