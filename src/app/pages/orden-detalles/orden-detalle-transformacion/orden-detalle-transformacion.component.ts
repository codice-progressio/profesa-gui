import { Component, OnInit, Input } from '@angular/core';
import { Trayecto } from 'src/app/models/trayecto.models'

@Component({
  selector: 'app-orden-detalle-transformacion',
  templateUrl: './orden-detalle-transformacion.component.html',
  styleUrls: ['./orden-detalle-transformacion.component.css']
})
export class OrdenDetalleTransformacionComponent implements OnInit {
  @Input() trayecto: Trayecto = null
  constructor() {}

  ngOnInit(): void {}
}
