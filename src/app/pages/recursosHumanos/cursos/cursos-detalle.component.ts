import { Component, OnInit, Input } from '@angular/core';
import { Curso } from '../../../models/recursosHumanos/cursos/curso.model'

@Component({
  selector: 'app-cursos-detalle',
  templateUrl: './cursos-detalle.component.html',
  styles: []
})
export class CursosDetalleComponent implements OnInit {
  @Input() curso: Curso = null
  constructor() { }

  ngOnInit() {
  }

}
