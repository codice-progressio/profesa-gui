import { Component, OnInit } from "@angular/core"
import { ModeloCompleto } from "src/app/models/modeloCompleto.modelo"
import { Lotes } from "src/app/models/almacenProductoTerminado/lotes.model"
import { AlmacenProductoTerminadoService } from "src/app/services/almacenDeProductoTerminado/almacen-producto-terminado.service"
import { ModeloCompletoService } from "src/app/services/modelo/modelo-completo.service"
import { PaginadorService } from "src/app/components/paginador/paginador.service"
import { FiltrosModelosCompletos } from "src/app/services/utilidades/filtrosParaConsultas/FiltrosModelosCompletos"
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms"
import { ValidacionesService } from "../../../../services/utilidades/validaciones.service"

@Component({
  selector: "app-stock-almacen-producto-terminado",
  templateUrl: "./stock-almacen-producto-terminado.component.html",
  styles: []
})
export class StockAlmacenProductoTerminadoComponent implements OnInit {
  /**
   *El modeloCompleto al que se le va a agregar una entrada o salida.
   *
   * @type {ModeloCompleto}
   * @memberof AlmacenDeProductoTerminadoComponent
   */
  modeloCompletoES: ModeloCompleto = null

  detalleLote: Lotes

  constructor(
    public _almacenDeProductoTerminadoService: AlmacenProductoTerminadoService,
    public _modeloCompletoService: ModeloCompletoService,
    public _paginadorService: PaginadorService,
    public fb: FormBuilder,
    public vs: ValidacionesService
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

  modeloCompletoAModificar: ModeloCompleto = null
  formulario: FormGroup

  asignarModeloCompletoAModificar(mc: ModeloCompleto) {
    this.crearFormulario()
    this._id_FB.setValue(mc._id)
    this.stockMinimo_FB.setValue(mc.stockMinimo)
    this.stockMaximo_FB.setValue(mc.stockMaximo)
    this.modeloCompletoAModificar = mc
  }

  modificarStock(mc) {
    this._modeloCompletoService.modificarStock(mc).subscribe((mod) => {
      this.cargarModelos()
    })
  }

  limpiar() {
    this.modeloCompletoAModificar = null
  }

  crearFormulario() {
    this.formulario = this.fb.group(
      {
        _id: ["", [Validators.required]],
        stockMinimo: [
          "",
          [Validators.min(0), Validators.max(999999), Validators.required]
        ],
        stockMaximo: [
          "",
          [Validators.min(0), Validators.max(999999), Validators.required]
        ]
      },
      { validator: this.validarMinMax }
    )
  }

  validarMinMax(group: FormGroup) {
    let min: number = group.get("stockMinimo").value
    let max: number = group.get("stockMaximo").value
    let minA: AbstractControl = group.get("stockMinimo")
    let maxA: AbstractControl = group.get("stockMaximo")

    let validacion = null
    if (min >= max) {
      maxA.setErrors({ general: { mensaje: "Debe ser mayor que " + min } })

      validacion = {
        general: { mensaje: "El maximo no puede ser igual o menor al minimo." }
      }
    }

    return validacion
  }

  get _id_FB(): AbstractControl {
    return this.formulario.get("_id")
  }

  get stockMaximo_FB(): AbstractControl {
    return this.formulario.get("stockMaximo")
  }
  get stockMinimo_FB(): AbstractControl {
    return this.formulario.get("stockMinimo")
  }

  submit(modelo: ModeloCompleto, valid: boolean, e) {
    e.preventDefault()

    if (!valid) return


    this._modeloCompletoService.modificarStock(modelo).subscribe((mc) => {
      this.cargarModelos()
    })
  }
}
