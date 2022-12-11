import { Component, OnInit } from '@angular/core'
import { EstadisticasService } from 'src/app/services/estadisticas.service'
import { EstadisticaCarga } from '../estadistica-recargar/EstadisticaCarga'

@Component({
  selector: 'app-total-skus',
  templateUrl: './total-skus.component.html',
  styleUrls: ['./total-skus.component.css']
})
export class TotalSkusComponent extends EstadisticaCarga {
  constructor(public eSer: EstadisticasService) {
    super()
  }

  cargar() {
    this.componenteCarga.cargando = true
    this.eSer.totalSkus().subscribe(
      total => {
        this.componenteCarga.cargando = false
      },
      () => (this.componenteCarga.cargando = false)
    )
  }
}
