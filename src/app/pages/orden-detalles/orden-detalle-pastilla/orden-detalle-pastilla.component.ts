import { Component, OnInit, Input } from '@angular/core'
import { Trayecto } from '../../../models/trayecto.models'
import { CantidadesPastilla } from '../../../models/pastilla.model'

@Component({
  selector: 'app-orden-detalle-pastilla',
  templateUrl: './orden-detalle-pastilla.component.html',
  styleUrls: ['./orden-detalle-pastilla.component.css']
})
export class OrdenDetallePastillaComponent implements OnInit {
  @Input() trayecto: Trayecto = null
  constructor() {}

  ngOnInit(): void {}

  calcularTotal(_10: number, total: number): number {
    return (total * 1000) / (_10 / 10)
  }

  totalDeBoton(cantidades: CantidadesPastilla[]): number {
    return cantidades.reduce(
      (a, b) => (a = this.calcularTotal(b.peso10Botones, b.pesoTotalBoton)),
      0
    )
  }
}
