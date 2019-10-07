import { Component, OnInit, Input } from "@angular/core"
import { HistorialDeEstatusRequisicion } from "../../../../../models/requisiciones/historialDeEstatusRequisicion.model"

@Component({
  selector: "app-requisicion-estatus-es-requisicion",
  templateUrl: "./requisicion-estatus-es-requisicion.component.html",
  styles: []
})
export class RequisicionEstatusEsRequisicionComponent implements OnInit {
  @Input() historialEstatus: HistorialDeEstatusRequisicion
  constructor() {}

  ngOnInit() {}
}
