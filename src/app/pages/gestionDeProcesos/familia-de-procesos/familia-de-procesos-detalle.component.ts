import { Component, OnInit, Input } from '@angular/core'
import { FamiliaDeProcesos } from '../../../models/familiaDeProcesos.model'
import { ParametrosService } from '../../../services/parametros.service'
import { LocalizacionDeOrdenes } from '../../../models/parametros/localizacionDeOrdenes.parametros.model'

@Component({
  selector: 'app-familia-de-procesos-detalle',
  templateUrl: './familia-de-procesos-detalle.component.html',
  styles: []
})
export class FamiliaDeProcesosDetalleComponent implements OnInit {
  @Input() detalle: FamiliaDeProcesos = null

  @Input() id: string = 'detalleModal'
  cargando = {}

  localizacionDeOrdenes: LocalizacionDeOrdenes
  keys = Object.keys
  constructor(public parametrosService: ParametrosService) {
    this.cargando['cargando'] = 'Obteniendo procesos por defecto'
    this.parametrosService.findAllLocalizacionDeOrdenes().subscribe(
      datos => {
        this.localizacionDeOrdenes = datos
        delete this.cargando['cargando']
      },
      _ => delete this.cargando['cargando']
    )
  }

  ngOnInit() {}
}
