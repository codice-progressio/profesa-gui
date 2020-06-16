import { Component, OnInit, Input } from '@angular/core';
import { Trayecto } from 'src/app/models/trayecto.models'

@Component({
  selector: 'app-orden-detalle-seleccion',
  templateUrl: './orden-detalle-seleccion.component.html',
  styleUrls: ['./orden-detalle-seleccion.component.css']
})
export class OrdenDetalleSeleccionComponent implements OnInit {

  @Input() trayecto : Trayecto = null
  constructor() { }

  ngOnInit(): void {
  }

}
