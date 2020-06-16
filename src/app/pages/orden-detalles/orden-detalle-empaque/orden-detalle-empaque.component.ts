import { Component, OnInit, Input } from '@angular/core';
import { Trayecto } from '../../../models/trayecto.models'

@Component({
  selector: 'app-orden-detalle-empaque',
  templateUrl: './orden-detalle-empaque.component.html',
  styleUrls: ['./orden-detalle-empaque.component.css']
})
export class OrdenDetalleEmpaqueComponent implements OnInit {


  @Input() trayecto: Trayecto = null
  constructor() { }

  ngOnInit(): void {
  }

}
