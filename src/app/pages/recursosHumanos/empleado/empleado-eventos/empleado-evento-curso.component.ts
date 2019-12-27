import { Component, OnInit, Input } from '@angular/core';
import { Curso } from 'src/app/models/recursosHumanos/cursos/curso.model';

@Component({
  selector: 'app-empleado-evento-curso',
  templateUrl: './empleado-evento-curso.component.html',
  styles: []
})
export class EmpleadoEventoCursoComponent implements OnInit {


  mensaje: string
  @Input() fecha: string
  @Input() curso: Curso


  constructor() {
    this.mensaje = 'Asistencia a curso'
   }

  ngOnInit() {
  }

}
