import { Component, OnInit } from '@angular/core'
import { EstadisticasService } from 'src/app/services/estadisticas.service'
import { EstadisticaRecargarComponent } from '../estadistica-recargar/estadistica-recargar.component'
import { EstadisticaCarga } from '../estadistica-recargar/EstadisticaCarga'
@Component({
  selector: 'app-costo-inventario',
  templateUrl: './costo-inventario.component.html',
  styleUrls: ['./costo-inventario.component.css']
})
export class CostoInventarioComponent extends EstadisticaCarga {
  constructor(public eSer: EstadisticasService) {
    super()
  }

  cargar() {
    this.componenteCarga.cargando = true
    this.eSer.costoExistencias().subscribe(
      total => {
        this.componenteCarga.cargando = false
      },
      () => (this.componenteCarga.cargando = false)
    )
  }
}
