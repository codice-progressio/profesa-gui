import { Component, OnInit } from '@angular/core'
import { LegendPosition } from '@swimlane/ngx-charts'
import { ModalWrapperComponent } from 'src/app/componentes-modulares/modal-wrapper/modal-wrapper/modal-wrapper.component'
import {
  EstadisticasService,
  iGraficoPie,
  iMejorCliente,
  iVentasTrimestre
} from 'src/app/services/estadisticas.service'
import { EstadisticaCarga } from '../estadistica-recargar/EstadisticaCarga'

@Component({
  selector: 'app-ventas-ultimo-mes',
  templateUrl: './ventas-ultimo-mes.component.html',
  styleUrls: ['./ventas-ultimo-mes.component.css']
})
export class VentasUltimoMesComponent
  extends EstadisticaCarga
  implements OnInit
{
  datos: iVentasTrimestre = undefined

  multi: any[] = [
    {
      name: 'Sin datos',
      series: [
        {
          name: 'No hay datos',
          value: 0
        }
      ]
    }
  ]

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

  // options
  legend: boolean = false
  animations: boolean = true
  xAxis: boolean = true
  yAxis: boolean = true
  showYAxisLabel: boolean = true
  showXAxisLabel: boolean = true
  xAxisLabel: string = 'Comparativa por mes'
  yAxisLabel: string = 'Vendido'
  timeline: boolean = true

  componenteModal: ModalWrapperComponent = undefined

  constructor(private estadisticasService: EstadisticasService) {
    super()
  }

  ngOnInit(): void {
    this.valoresGrafico(true)
  }

  valoresGrafico(cerrado = false) {
    if (cerrado) {
       this.gradient = true
       this.showLegend = false
       this.showLabels = true
       // Line
       this.legend = false
       this.animations = true
       this.xAxis = true
       this.yAxis = true
       this.showYAxisLabel = false
       this.showXAxisLabel = false
       this.timeline = false

    } else  {
      this.gradient = true
      this.showLegend = true
      this.showLabels = true
      this.isDoughnut = true

      // Line
      this.legend = true
      this.animations = true
      this.xAxis = true
      this.yAxis = true
      this.showYAxisLabel = false
      this.showXAxisLabel = false
      this.timeline = true

    }
  }

  cargar() {
    this.componenteCarga.cargando = true
    this.estadisticasService.ventasTrimestre().subscribe(
      datos => {
        this.datos = datos
        this.multi = datos.graficos.meses
        this.single = datos.graficos.totales
        this.componenteCarga.cargando = false
      },
      () => (this.componenteCarga.cargando = false)
    )
  }

  abrirModal() {
    this.valoresGrafico(false)
    this.componenteModal.abrirModal(() => this.cargar())
  }

  cerradoModal() {
    this.valoresGrafico(true)
    this.multi = [...this.multi]
    this.single = [...this.single]
  }

  saleComponente(componente: any) {
    this.componenteCarga = componente
  }
}
