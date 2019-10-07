import { Component, OnInit, Input } from "@angular/core"
import { EstatusRequisicion } from "src/app/models/requisiciones/estatusRequisicion.model"
import { HistorialDeEstatusRequisicion } from "../../../../../models/requisiciones/historialDeEstatusRequisicion.model"
import { ImagenesFacturas } from "../../../../../models/requisiciones/imagenesFacturas.model"
import { VisorDeImagenesService } from "../../../../../services/visorDeImagenes/visor-de-imagenes.service"
import { ImagenPipe } from "../../../../../pipes/imagen.pipe"

@Component({
  selector: "app-requisicion-estatus-es-terminada",
  templateUrl: "./requisicion-estatus-es-terminada.component.html",
  styles: []
})
export class RequisicionEstatusEsTerminadaComponent implements OnInit {
  @Input() historialEstatus: HistorialDeEstatusRequisicion
  constructor(
    private _visorDeImagenesService: VisorDeImagenesService,
    private imagenPipe: ImagenPipe
  ) {}

  ngOnInit() {}

  mostrarImagen(img: string) {
    this._visorDeImagenesService.mostrarImagen(
      this.imagenPipe.transform(img, "facturas")
    )
  }
}
