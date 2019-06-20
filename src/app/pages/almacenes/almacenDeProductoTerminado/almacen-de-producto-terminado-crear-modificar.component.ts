import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core"
import { ModeloCompleto } from "../../../models/modeloCompleto.modelo"
import { ModeloCompletoService } from "../../../services/modelo/modelo-completo.service"
import { Lotes } from "src/app/models/almacenProductoTerminado/lotes.model"
import { AlmacenProductoTerminadoService } from "../../../services/almacenDeProductoTerminado/almacen-producto-terminado.service"
import { LoteService } from "../../../services/almacenDeProductoTerminado/lote.service"
import { SalidasLotes } from "../../../models/almacenProductoTerminado/salidasLote.model"

@Component({
  selector: "app-almacen-de-producto-terminado-crear-modificar",
  templateUrl: "./almacen-de-producto-terminado-crear-modificar.component.html",
  styles: []
})
export class AlmacenDeProductoTerminadoCrearModificarComponent
  implements OnInit {
  /**
   *Define si el elemento es una entrada (true) o salida (false)
   *
   * @type {boolean}
   * @memberof AlmacenDeProductoTerminadoCrearModificarComponent
   */
  @Input() esEntrada: boolean
  /**
   *El modelo completo con el que vamos a trabajar.
   *
   * @type {ModeloCompletoService}
   * @memberof AlmacenDeProductoTerminadoCrearModificarComponent
   */
  @Input() modeloCompleto: ModeloCompleto = null
  // @Input() _modeloCompletoService: ModeloCompletoService
  /**
   *El id html del modal para que se ejecute el data-dissmis y se ejecute el modal.
   *
   * @type {string}
   * @memberof AlmacenDeProductoTerminadoCrearModificarComponent
   */

  @Output() guardado = new EventEmitter<null>()
  @Output() cancelar = new EventEmitter<null>()

  constructor(
    public _almacenDeProductoTerminadoService: AlmacenProductoTerminadoService,
    public _loteService: LoteService
  ) {}

  ngOnInit() {}

  guardarLote(lote: Lotes) {
    if (!this.modeloCompleto) throw "No has definido el modelo completo."

    this._loteService
      .guardar(this.modeloCompleto._id, lote)
      .subscribe((resp) => {
        this.guardado.emit()
      })
  }

  guardarSalida(lote: { salida: SalidasLotes; idLote: string }) {
    this._loteService
      .registrarSalida(lote.salida, lote.idLote, this.modeloCompleto._id)
      .subscribe(() => {
        this.guardado.emit(null)
      })
  }
}
