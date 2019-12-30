import { Component, OnInit, Input } from "@angular/core"
import { EstatusRequisicion } from "src/app/models/requisiciones/estatusRequisicion.model"
import { HistorialDeEstatusRequisicion } from "../../../../../models/requisiciones/historialDeEstatusRequisicion.model"
import { VisorDeImagenesService } from "../../../../../services/visorDeImagenes/visor-de-imagenes.service"
import { ImagenPipe } from "../../../../../pipes/imagen.pipe"

@Component({
  selector: "app-requisicion-estatus-es-entrega-parcial",
  templateUrl: "./requisicion-estatus-es-entrega-parcial.component.html",
  styles: []
})
export class RequisicionEstatusEsEntregaParcialComponent implements OnInit {
  @Input() historialEstatus: HistorialDeEstatusRequisicion
  constructor(
    public _visorDeImagenesService: VisorDeImagenesService,
    public imagenPipe: ImagenPipe
  ) {}

  ngOnInit() {
  }

  mostrarImagen(img: string) {
    this._visorDeImagenesService.mostrarImagen(
      this.imagenPipe.transform(img, "facturas")
    )
  }
}
