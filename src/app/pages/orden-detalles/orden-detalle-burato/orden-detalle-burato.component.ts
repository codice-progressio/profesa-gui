import { Component, OnInit, Input } from '@angular/core'
import { Trayecto } from '../../../models/trayecto.models'

@Component({
  selector: 'app-orden-detalle-burato',
  templateUrl: './orden-detalle-burato.component.html',
  styleUrls: ['./orden-detalle-burato.component.css']
})
export class OrdenDetalleBuratoComponent implements OnInit {
  @Input() trayecto: Trayecto = null
  constructor() {}

  ngOnInit(): void {}

  calcularTotal(_10: number, total: number): number {
    return (total * 1000) / (_10 / 10)
  }
}
