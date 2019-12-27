import { Component, OnInit, Input } from '@angular/core';
import { Departamento } from 'src/app/models/departamento.models';

@Component({
  selector: 'app-departamento-detalle',
  templateUrl: './departamento-detalle.component.html',
  styles: []
})
export class DepartamentoDetalleComponent implements OnInit {


  @Input() departamento: Departamento =  null
  constructor() { }

  ngOnInit() {
  }

}
