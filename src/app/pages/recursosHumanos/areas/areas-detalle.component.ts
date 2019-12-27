import { Component, OnInit, Input } from "@angular/core"
import { AreaRH } from "../../../models/recursosHumanos/areas/areaRH.model"

@Component({
  selector: "app-areas-detalle",
  templateUrl: "./areas-detalle.component.html",
  styles: []
})
export class AreasDetalleComponent implements OnInit {
  @Input() area: AreaRH = null
  constructor() {}

  ngOnInit() {}
}
