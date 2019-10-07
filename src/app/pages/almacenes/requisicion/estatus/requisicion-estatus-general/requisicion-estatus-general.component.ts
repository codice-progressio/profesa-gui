import { Component, OnInit, Input } from '@angular/core';
import { EstatusRequisicion } from '../../../../../models/requisiciones/estatusRequisicion.model'
import { HistorialDeEstatusRequisicion } from '../../../../../models/requisiciones/historialDeEstatusRequisicion.model'

@Component({
  selector: 'app-requisicion-estatus-general',
  templateUrl: './requisicion-estatus-general.component.html',
  styles: []
})
export class RequisicionEstatusGeneralComponent implements OnInit {

  constructor() { }


  @Input() historialEstatus: HistorialDeEstatusRequisicion

  ngOnInit() {
  }

}
