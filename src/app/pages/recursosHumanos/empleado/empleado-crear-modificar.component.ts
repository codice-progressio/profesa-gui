import { Component, OnInit, Input } from '@angular/core';
import { Empleado } from 'src/app/models/recursosHumanos/empleados/empleado.model';

@Component({
  selector: 'app-empleado-crear-modificar',
  templateUrl: './empleado-crear-modificar.component.html',
  styles: []
})
export class EmpleadoCrearModificarComponent implements OnInit {


  @Input() empleado: Empleado = null
  constructor() { }

  ngOnInit() {
  }

}
