import { Component, OnInit, Input } from '@angular/core';
import { Trayecto } from 'src/app/models/trayecto.models'

@Component({
  selector: 'app-orden-detalle-metalizado',
  templateUrl: './orden-detalle-metalizado.component.html',
  styleUrls: ['./orden-detalle-metalizado.component.css']
})
export class OrdenDetalleMetalizadoComponent implements OnInit {

  @Input() trayecto: Trayecto = null
  constructor() { }

  ngOnInit(): void {
  }

  calcularTotal(_10: number, total: number): number {
    return (total * 1000) / (_10 / 10)
  }

}
