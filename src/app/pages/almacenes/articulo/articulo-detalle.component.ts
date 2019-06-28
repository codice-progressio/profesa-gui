import { Component, OnInit, Input } from "@angular/core"
import { Articulo } from "src/app/models/almacenDeMateriaPrimaYHerramientas/articulo.modelo"

@Component({
  selector: "app-articulo-detalle",
  templateUrl: "./articulo-detalle.component.html",
  styles: []
})
export class ArticuloDetalleComponent implements OnInit {
  @Input() articulo: Articulo = null

  constructor() {}

  ngOnInit() {}
}
