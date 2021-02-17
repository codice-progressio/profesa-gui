import { Component, OnInit } from '@angular/core'
import { EstadisticasService } from '../../services/estadisticas.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  constructor(public eSer: EstadisticasService) {}

  ngOnInit() {
    this.cargarTotalItems()
    this.cargarTotalCostoInventario()
  }

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

  cargandoTotalCostoInventario = false

  cargarTotalCostoInventario() {
    this.cargandoTotalCostoInventario = true
    this.eSer.costoExistencias().subscribe(
      total => {
        this.cargandoTotalCostoInventario = false
      },
      () => (this.cargandoTotalCostoInventario = false)
    )
  }
}
