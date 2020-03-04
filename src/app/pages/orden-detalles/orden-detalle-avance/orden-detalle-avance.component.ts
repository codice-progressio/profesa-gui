import { Component, OnInit, Input, Output } from '@angular/core'
import { OrdenParaAsignacion } from '../../../services/programacion-transformacion.service'
import { FolioNewService } from '../../../services/folio/folio-new.service'
import { Orden } from '../../../models/orden.models'
import { Departamento } from '../../../models/departamento.models'
import { Trayecto } from '../../../models/trayecto.models'

@Component({
  selector: 'app-orden-detalle-avance',
  templateUrl: './orden-detalle-avance.component.html',
  styleUrls: ['./orden-detalle-avance.component.css']
})
export class OrdenDetalleAvanceComponent implements OnInit {
  _orden: OrdenParaAsignacion
  ordenConsultada: Orden

  ignorarHasta = 0
  @Input() set orden(orden: OrdenParaAsignacion) {
    if (!orden) return
    this.ordenConsultada = null
    this.folioService
      .detalleOrden(orden.folio, orden.pedido, orden.orden)
      .subscribe(ordenRes => {
        this.ignorarHasta = ordenRes.trayectoRecorrido.length + 1 //ubicacion actual
        this.ordenConsultada = ordenRes
        this._orden = orden
      })
  }

  get orden(): OrdenParaAsignacion {
    return this._orden
  }

  limpiarTrayectosYaTerminados(orden: Orden): Orden {
    for (let i = 0; i < orden.trayectoRecorrido.length; i++) {
      orden.trayectoNormal.pop()
    }

    return orden
  }

  constructor(private folioService: FolioNewService) {}

  ngOnInit(): void {}
}
