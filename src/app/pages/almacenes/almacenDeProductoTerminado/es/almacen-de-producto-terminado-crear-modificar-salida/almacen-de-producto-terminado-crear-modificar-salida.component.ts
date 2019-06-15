import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core"
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms"
import { SalidasLotes } from "../../../../../models/almacenProductoTerminado/salidasLote.model"
import { Cliente } from "src/app/models/cliente.models"
import { ValidacionesService } from "../../../../../services/utilidades/validaciones.service"
import { ClienteService } from "../../../../../services/cliente/cliente.service"
import { ModeloCompleto } from "src/app/models/modeloCompleto.modelo"

@Component({
  selector: "app-almacen-de-producto-terminado-crear-modificar-salida",
  templateUrl:
    "./almacen-de-producto-terminado-crear-modificar-salida.component.html",
  styles: []
})
export class AlmacenDeProductoTerminadoCrearModificarSalidaComponent
  implements OnInit {
  formulario: FormGroup

  inputClienteNg: Cliente
  clientes: Cliente[] = []

  clienteSeleccionado: Cliente

  @Output() loteGuardado = new EventEmitter<{
    idLote: string
    salida: SalidasLotes
  }>()
  @Output() cancelar = new EventEmitter<null>()

  /**
   *Para obtener el modelo completo.
   *
   * @type {ModeloCompleto}
   * @memberof AlmacenDeProductoTerminadoCrearModificarSalidaComponent
   */
  @Input() modeloCompleto: ModeloCompleto

  constructor(
    public fb: FormBuilder,
    public vs: ValidacionesService,
    public _clienteService: ClienteService
  ) {
    this.crearFormulario()
  }

  ngOnInit() {}

  crearFormulario() {
    this.formulario = this.fb.group({
      idLote: ["", [Validators.required]],
      cliente: ["", [Validators.required]],
      cantidad: [
        "",
        [
          this.vs.onlyIntegers,
          this.vs.numberValidator,
          Validators.required,
          Validators.min(1)
        ]
      ],
      observaciones: ["", []]
    })
  }

  guardar(salidaLote: SalidasLotes, invalid: boolean, e) {
    e.preventDefault()

    if (invalid) return

    let idLote = this.idLote_FB.value
    this.limpiar()
    this.loteGuardado.emit({
      idLote: idLote,
      salida: salidaLote
    })
  }

  cancelarGuardado() {
    this.cancelar.emit(null)
    this.limpiar()
  }

  limpiar() {
    this.crearFormulario()
    this.inputClienteNg = null
  }

  esperando = false
  intervaloDeBusqueda: any = null
  terminoDeBusqueda: string = ""
  cargarClientes(termino: string) {
    let terminoLimpio = termino.trim()
    if (!terminoLimpio) return

    this.esperando = true
    this.terminoDeBusqueda = termino
    if (!this.intervaloDeBusqueda) {
      this.crearIntervalo()
    }
  }

  crearIntervalo() {
    this.intervaloDeBusqueda = setInterval(() => {
      if (!this.esperando) {
        clearInterval(this.intervaloDeBusqueda)
        this.buscarTermino(this.terminoDeBusqueda)
      }

      this.esperando = false
    }, 200)
  }

  buscarTermino(termino: string) {
    this._clienteService.buscar(termino).subscribe((clientes) => {
      this.clientes = clientes
      this.intervaloDeBusqueda = null
    })
  }

  limpiarCliente(inputCliente) {
    this.cliente_FB.setValue(null)
    this.clientes = []
    inputCliente.value = ""
    this.clienteSeleccionado = null
  }

  clienteObtenerId(nombre: string) {
    if (nombre.trim() !== "") {
      let clienteSeleccionado: Cliente = this.clientes.filter((x) => {
        return x.nombre === nombre.trim()
      })[0]

      if (clienteSeleccionado) {
        this.clienteSeleccionado = clienteSeleccionado
        this.cliente_FB.setValue(clienteSeleccionado._id)
      }
    }
  }

  get cliente_FB(): AbstractControl {
    return this.formulario.get("cliente")
  }

  get cantidad_FB(): AbstractControl {
    return this.formulario.get("cantidad")
  }
  get observaciones_FB(): AbstractControl {
    return this.formulario.get("observaciones")
  }

  get idLote_FB(): AbstractControl {
    return this.formulario.get("idLote")
  }

  /**
   *Setea el numero de lote
   *
   * @param {string} id
   * @memberof AlmacenDeProductoTerminadoCrearModificarSalidaComponent
   */
  seleccionarLote(id: string) {
    this.idLote_FB.setValue(id)
  }
}
