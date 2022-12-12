import { Component, OnInit } from '@angular/core'
import { LegendPosition } from '@swimlane/ngx-charts'
import { ModalWrapperComponent } from 'src/app/componentes-modulares/modal-wrapper/modal-wrapper/modal-wrapper.component'
import {
  EstadisticasService,
  iHoy
} from 'src/app/services/estadisticas.service'
import { EstadisticaCarga } from '../estadistica-recargar/EstadisticaCarga'

@Component({
  selector: 'app-pedidos-hoy',
  templateUrl: './pedidos-hoy.component.html',
  styleUrls: ['./pedidos-hoy.component.css']
})
export class PedidosHoyComponent extends EstadisticaCarga implements OnInit {
  constructor(private estadistiasService: EstadisticasService) {
    super()
  }

  single = [
    {
      name: 'Sin datos',
      value: 0
    }
  ]
  view: [number, number] = [undefined, undefined]

  // options
  gradient: boolean = true
  showLegend: boolean = false
  showLabels: boolean = true
  isDoughnut: boolean = false
  legendPosition: LegendPosition = LegendPosition.Below
  arcWidth = 0.41
  doughnut = true

  hoy: iHoy

  ngOnInit(): void {}

  cargar() {
    this.componenteCarga.cargando = true
    this.estadistiasService.hoy().subscribe(
      res => {
        this.componenteCarga.cargando = false
        this.hoy = res
        this.single = [...res.grafico]
      },
      err => (this.componenteCarga.cargando = false)
    )
  }

  componenteModal: ModalWrapperComponent = undefined
  abrirModal() {
    this.componenteModal.abrirModal(() => this.cargar())
  }

  cerradoModal() {
    this.single = [...this.single]
  }
}
