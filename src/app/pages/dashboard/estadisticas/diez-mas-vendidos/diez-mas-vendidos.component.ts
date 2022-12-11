import { Component, OnInit } from '@angular/core'
import { LegendPosition } from '@swimlane/ngx-charts'
import { ModalWrapperComponent } from 'src/app/componentes-modulares/modal-wrapper/modal-wrapper/modal-wrapper.component';
import {
  EstadisticasService,
  iGraficoPie
} from 'src/app/services/estadisticas.service'
import { EstadisticaCarga } from '../estadistica-recargar/EstadisticaCarga';

@Component({
  selector: 'app-diez-mas-vendidos',
  templateUrl: './diez-mas-vendidos.component.html',
  styleUrls: ['./diez-mas-vendidos.component.css']
})
export class DiezMasVendidosComponent extends EstadisticaCarga {
  single: iGraficoPie[] = [{ name: 'No hay items para mostrar', value: 0 }]
  view: [number, number] = [undefined, undefined]

  // options
  gradient: boolean = true
  showLegend: boolean = false
  showLabels: boolean = true
  isDoughnut: boolean = false
  legendPosition: LegendPosition = LegendPosition.Below
  arcWidth = 0.41
  doughnut = true

  componenteModal: ModalWrapperComponent = undefined

  constructor(private estadisticasService: EstadisticasService) {
    super()
  }

  cargar() {
    this.componenteCarga.cargando = true
    this.estadisticasService.diezMasVendidos().subscribe(
      datos => {
        this.single = datos
        this.componenteCarga.cargando = false
      },
      () => (this.componenteCarga.cargando = false)
    )
  }

  abrirModal() {
    this.componenteModal.abrirModal(() => this.cargar())
  }

  cerradoModal() {
    this.single = [...this.single]
  }
}
