import { Component, OnInit, Input } from "@angular/core"
import { HistorialDeEstatusRequisicion } from "src/app/models/requisiciones/historialDeEstatusRequisicion.model"

@Component({
  selector: "app-requisicion-estatus-es-cancelada",
  templateUrl: "./requisicion-estatus-es-cancelada.component.html",
  styles: []
})
export class RequisicionEstatusEsCanceladaComponent implements OnInit {
  @Input() historialEstatus: HistorialDeEstatusRequisicion
  constructor() {}

  ngOnInit() {}
}
