import { Component, OnInit, Input } from "@angular/core"
import { EstatusRequisicion } from "src/app/models/requisiciones/estatusRequisicion.model"
import { HistorialDeEstatusRequisicion } from "../../../../../models/requisiciones/historialDeEstatusRequisicion.model"

@Component({
  selector: "app-requisicion-estatus-es-orden-de-compra",
  templateUrl: "./requisicion-estatus-es-orden-de-compra.component.html",
  styles: []
})
export class RequisicionEstatusEsOrdenDeCompraComponent implements OnInit {
  @Input() historialEstatus: HistorialDeEstatusRequisicion
  constructor() {}

  ngOnInit() {
  }
}
