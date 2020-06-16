import { Component, OnInit, Input } from '@angular/core';
import { Trayecto } from '../../../models/trayecto.models'

@Component({
  selector: 'app-orden-detalle-barnizado',
  templateUrl: './orden-detalle-barnizado.component.html',
  styleUrls: ['./orden-detalle-barnizado.component.css']
})
export class OrdenDetalleBarnizadoComponent implements OnInit {

  @Input() trayecto: Trayecto = null
  constructor() { }

  ngOnInit(): void {
  }

  calcularTotal(_10: number, total: number): number {
    return (total * 1000) / (_10 / 10)
  }

}
