import { Component, OnInit } from "@angular/core"
import { ModeloCompleto } from "../../../models/modeloCompleto.modelo"
import { AlmacenProductoTerminadoService } from "../../../services/almacenDeProductoTerminado/almacen-producto-terminado.service"
import { PaginadorService } from "../../../components/paginador/paginador.service"

@Component({
  selector: "app-almacen-de-producto-terminado",
  templateUrl: "./almacen-de-producto-terminado.component.html",
  styles: []
})
export class AlmacenDeProductoTerminadoComponent implements OnInit {
  constructor(
    public _almacenDeProductoTerminadoService: AlmacenProductoTerminadoService,
    public _paginadorService: PaginadorService
  ) {
    this._paginadorService.callback = () => {
      this.cargarModelos()
    }
  }

  ngOnInit() {
    this.cargarModelos()
  }

  cargarModelos() {
    this._almacenDeProductoTerminadoService.todo().subscribe((mcs) => {
      this.modelosCompletos = mcs
    })
  }

  modelosCompletos: ModeloCompleto[] = []
  modeloCompletoDetalle: ModeloCompleto = null

  buscar(termino: string) {
    if (termino.trim().length === 0) {
      this.cargarModelos()
      return
    }

    this._almacenDeProductoTerminadoService
      .buscar(termino)
      .subscribe((mc) => (this.modelosCompletos = mc))
  }

  entrada(mc: ModeloCompleto) {
    throw "Sin definir"
  }

  salida(mc: ModeloCompleto) {
    throw "Sin definir"
  }
}
