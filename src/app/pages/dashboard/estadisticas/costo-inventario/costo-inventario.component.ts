import { Component, OnInit } from '@angular/core'
import { EstadisticasService } from 'src/app/services/estadisticas.service'

@Component({
  selector: 'app-costo-inventario',
  templateUrl: './costo-inventario.component.html',
  styleUrls: ['./costo-inventario.component.css']
})
export class CostoInventarioComponent implements OnInit {
  constructor(public eSer: EstadisticasService) {}

  ngOnInit(): void {
    this.cargarTotalCostoInventario()
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
