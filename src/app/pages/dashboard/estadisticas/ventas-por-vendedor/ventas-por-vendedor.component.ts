import { Component, OnInit } from '@angular/core'
import { LegendPosition } from '@swimlane/ngx-charts'
import { ModalWrapperComponent } from 'src/app/componentes-modulares/modal-wrapper/modal-wrapper/modal-wrapper.component'
import {
  EstadisticasService,
  iVentasPorVendedor
} from 'src/app/services/estadisticas.service'
import { EstadisticaCarga } from '../estadistica-recargar/EstadisticaCarga'

@Component({
  selector: 'app-ventas-por-vendedor',
  templateUrl: './ventas-por-vendedor.component.html',
  styleUrls: ['./ventas-por-vendedor.component.css']
})
export class VentasPorVendedorComponent
  extends EstadisticaCarga
  implements OnInit
{
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

  constructor(private estadisticasService: EstadisticasService) {
    super()
  }

  ngOnInit(): void {}

  datos: iVentasPorVendedor

  cargar() {
    this.componenteCarga.cargando = true
    this.estadisticasService.ventasPorVendedor().subscribe(
      res => {
        this.componenteCarga.cargando = false
        this.datos = res
        this.single = [...res.grafico]
      },
      err => (this.componenteCarga.cargando = false)
    )
  }

  componenteModal: ModalWrapperComponent = undefined
  abrirModal() {
    this.componenteModal.abrirModal(()=>this.cargar())
    
  }

  cerradoModal() {
    this.cargar()
  }
}
