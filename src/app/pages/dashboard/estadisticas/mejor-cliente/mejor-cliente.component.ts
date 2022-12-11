import { Component, OnInit } from '@angular/core'
import { ModalWrapperComponent } from 'src/app/componentes-modulares/modal-wrapper/modal-wrapper/modal-wrapper.component'
import {
  EstadisticasService,
  iMejorCliente
} from 'src/app/services/estadisticas.service'
import { EstadisticaCarga } from '../estadistica-recargar/EstadisticaCarga'

@Component({
  selector: 'app-mejor-cliente',
  templateUrl: './mejor-cliente.component.html',
  styleUrls: ['./mejor-cliente.component.css']
})
export class MejorClienteComponent extends EstadisticaCarga implements OnInit {
  mejorCliente: iMejorCliente = undefined
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

  // options
  legend: boolean = false
  showLabels: boolean = true
  animations: boolean = true
  xAxis: boolean = true
  yAxis: boolean = true
  showYAxisLabel: boolean = true
  showXAxisLabel: boolean = true
  xAxisLabel: string = 'Ultimos 30 dias'
  yAxisLabel: string = 'Vendido'
  timeline: boolean = true

  componenteModal: ModalWrapperComponent = undefined

  constructor(private estadisticasService: EstadisticasService) {
    super()
  }

  ngOnInit(): void {}

  cargar() {
    this.componenteCarga.cargando = true
    this.estadisticasService.mejorCliente().subscribe(
      datos => {
        this.multi = datos.grafico
        this.mejorCliente = datos
        this.componenteCarga.cargando = false
      },
      () => (this.componenteCarga.cargando = false)
    )
  }

  abrirModal() {
    this.componenteModal.abrirModal(() => this.cargar())
  }

  cerradoModal() {
    this.multi = [...this.multi]
  }

  saleComponente(componente: any) {
    this.componenteCarga = componente
  }
}
