import { Component, OnInit } from '@angular/core'
import { EstadisticasService } from 'src/app/services/estadisticas.service'

@Component({
  selector: 'app-total-skus',
  templateUrl: './total-skus.component.html',
  styleUrls: ['./total-skus.component.css']
})
export class TotalSkusComponent implements OnInit {
  constructor(public eSer: EstadisticasService) {}
  ngOnInit(): void {}

  cargandoTotalSkus = false

  cargarTotalItems() {
    this.cargandoTotalSkus = true
    this.eSer.totalSkus().subscribe(
      total => {
        this.cargandoTotalSkus = false
      },
      () => (this.cargandoTotalSkus = false)
    )
  }
}
