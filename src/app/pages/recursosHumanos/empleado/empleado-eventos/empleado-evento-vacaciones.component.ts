import { Component, OnInit, Input } from '@angular/core'
import { Curso } from 'src/app/models/recursosHumanos/cursos/curso.model'
import { Vacaciones } from '../../../../models/recursosHumanos/empleados/eventos/vacaciones.model'

@Component({
  selector: 'app-empleado-evento-vacaciones',
  templateUrl: './empleado-evento-vacaciones.component.html',
  styles: []
})
export class EmpleadoEventoVacacionesComponent implements OnInit {
  mensaje: string
  @Input() fecha: string
  @Input() vacaciones: Vacaciones

  constructor() {
    this.mensaje = 'De vacaciones'
  }

  ngOnInit() {}
}
