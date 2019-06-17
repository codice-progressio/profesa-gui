import { Component, OnInit } from "@angular/core"
import { ModeloCompleto } from "../../../models/modeloCompleto.modelo"
import { AlmacenProductoTerminadoService } from "../../../services/almacenDeProductoTerminado/almacen-producto-terminado.service"
import { PaginadorService } from "../../../components/paginador/paginador.service"
import { FiltrosModelosCompletos } from "src/app/services/utilidades/filtrosParaConsultas/FiltrosModelosCompletos"
import { ModeloCompletoService } from "../../../services/modelo/modelo-completo.service"
import { Lotes } from "../../../models/almacenProductoTerminado/lotes.model"

@Component({
  selector: "app-almacen-de-producto-terminado",
  templateUrl: "./almacen-de-producto-terminado.component.html",
  styles: []
})
export class AlmacenDeProductoTerminadoComponent implements OnInit {
  /**
   *El modeloCompleto al que se le va a agregar una entrada o salida.
   *
   * @type {ModeloCompleto}
   * @memberof AlmacenDeProductoTerminadoComponent
   */
  modeloCompletoES: ModeloCompleto = null
  /**
   *Define si es entrada o salida lo que se le va agregar al modelo completo
   *
   * @type {boolean}
   * @memberof AlmacenDeProductoTerminadoComponent
   */
  esEntrada: boolean = null

  detalleLote: Lotes

  constructor(
    public _almacenDeProductoTerminadoService: AlmacenProductoTerminadoService,
    public _modeloCompletoService: ModeloCompletoService,
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
    this._almacenDeProductoTerminadoService
      .filtros(
        new FiltrosModelosCompletos(this._almacenDeProductoTerminadoService)
      )
      .setDesde(this._paginadorService.desde)
      .setLimite(this._paginadorService.limite)
      .servicio.todo()
      .subscribe((mcs) => {
        mcs.map((mc) => {
          mc._servicio = this._modeloCompletoService
        })
        this.modelosCompletos = mcs
        this._paginadorService.activarPaginador(
          this._almacenDeProductoTerminadoService.total
        )
      })
  }

  modelosCompletos: ModeloCompleto[] = []
  modeloCompletoDetalle: ModeloCompleto = null
  /**
   *Bandera que senala si se esta utilizando la busqueda. Sirve 
   para ocultar y mostrar el paginador component.
   *
   * @type {boolean}
   * @memberof AlmacenDeProductoTerminadoComponent
   */
  buscando: boolean = false

  buscar(termino: string) {
    if (termino.trim().length === 0) {
      this.cargarModelos()
      this.buscando = false
      return
    }

    this.buscando = true
    this._almacenDeProductoTerminadoService
      .search(termino, undefined, undefined, ModeloCompleto)
      .subscribe((mcs) => {
        mcs.map((mc) => {
          mc._servicio = this._modeloCompletoService
        })
        this.modelosCompletos = mcs
      })
  }

  /**
   *Asigna el modeloCompleto al detalla y ejecuta varias operaciones
   de informacion. 
   *
   * @param {ModeloCompleto} mc
   * @memberof AlmacenDeProductoTerminadoComponent
   */
  asignarDetalle(mc: ModeloCompleto) {
    this.modeloCompletoDetalle = mc
    this.modeloCompletoDetalle.obtenerProduccionEnTransito()
  }

  asignarEntradaOSalida(mc: ModeloCompleto, esEntrada: boolean) {
    this.esEntrada = esEntrada
    this.modeloCompletoES = mc
    this.modeloCompletoES.obtenerProduccionEnTransito()
  }
}
