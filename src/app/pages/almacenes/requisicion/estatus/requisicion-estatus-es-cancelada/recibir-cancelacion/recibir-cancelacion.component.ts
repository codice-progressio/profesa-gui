import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core"
import { Requisicion } from "src/app/models/requisiciones/requisicion.model"
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms"
import { ValidacionesService } from "src/app/services/utilidades/validaciones.service"
import { ProveedorService } from "src/app/services/proveedor.service"
import { DivisaService } from "src/app/services/divisa.service"
import { ManejoDeMensajesService } from "src/app/services/utilidades/manejo-de-mensajes.service"
import { SubirArchivoService } from "src/app/services/subir-archivo/subir-archivo.service"
import { RequisicionService } from "src/app/services/requisiciones/requisicion.service"

@Component({
  selector: "app-recibir-cancelacion",
  templateUrl: "./recibir-cancelacion.component.html",
  styles: []
})
export class RecibirCancelacionComponent implements OnInit {
  @Input() requisicion: Requisicion = null
  @Output() guardar = new EventEmitter<any>()
  @Output() esteComponente = new EventEmitter<this>()
  @Output() cancelado = new EventEmitter<null>()

  formulario: FormGroup

  constructor(
    public fb: FormBuilder,
    public vs: ValidacionesService,
    public requisicionService: RequisicionService
  ) {}

  ngOnInit() {
    this.esteComponente.emit(this)
  }

  crearFormulario(req: Requisicion) {
    this.requisicion = req
    this.formulario = this.fb.group({
      motivoCancelacion: ["", [Validators.required, Validators.minLength(20)]]
    })
  }

  public get motivoCancelacion_FB(): AbstractControl {
    return this.formulario.get("motivoCancelacion")
  }

  cancelar() {
    this.limpiar()
    this.cancelado.emit(null)
  }

  limpiar() {
    this.formulario.reset()
  }

  submit(modelo, invalid, e) {
    e.preventDefault()
    if (invalid) return

    this.requisicionService.reiniciar(this.requisicion.estatus)
    this.requisicion.estatus.esCancelada = true
    this.requisicion.estatus.fechaCancelacion = new Date()
    this.requisicion.estatus.motivoCancelacion = modelo.motivoCancelacion
    this.requisicion.razonDeCambioTemp = "El usuario cancelo la requisicion"

    this.requisicionService
      .actualizarEstatus(this.requisicion)
      .subscribe((x) => {
        this.guardar.emit()
        this.limpiar()
      })

    throw "No definido"
  }
}
