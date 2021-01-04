import { Component, OnInit } from "@angular/core"
import { VisorDeImagenesService } from "../visor-de-imagenes-con-paginacion/visor-de-imagenes.service"

@Component({
  selector: "app-visor-de-imagenes-general",
  templateUrl: "./visor-de-imagenes-general.component.html",
  styleUrls: ["./visor-de-imagenes-general.component.css"]
})
export class VisorDeImagenesGeneralComponent implements OnInit {
  constructor(public servicio: VisorDeImagenesService) {}

  ngOnInit() {}

  cerrar() {}
}
