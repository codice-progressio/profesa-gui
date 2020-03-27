import { Component, OnInit, Input } from '@angular/core'
import { FamiliaDeProcesos } from '../../../models/familiaDeProcesos.model'

@Component({
  selector: 'app-familia-de-procesos-detalle',
  templateUrl: './familia-de-procesos-detalle.component.html',
  styles: []
})
export class FamiliaDeProcesosDetalleComponent implements OnInit {
  @Input() detalle: FamiliaDeProcesos = null

  @Input() id: string = 'detalleModal'

  ngOnInit() {}
}
