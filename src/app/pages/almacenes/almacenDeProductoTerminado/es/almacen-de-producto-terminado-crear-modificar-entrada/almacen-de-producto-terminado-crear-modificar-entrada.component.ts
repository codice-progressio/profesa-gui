import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core"
import { SalidasLotes } from "../../../../../models/almacenProductoTerminado/salidasLote.model"
import { Lotes } from "../../../../../models/almacenProductoTerminado/lotes.model"
import { ValidacionesService } from "../../../../../services/utilidades/validaciones.service"
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms"

@Component({
  selector: "app-almacen-de-producto-terminado-crear-modificar-entrada",
  templateUrl:
    "./almacen-de-producto-terminado-crear-modificar-entrada.component.html",
  styles: []
})
export class AlmacenDeProductoTerminadoCrearModificarEntradaComponent
  implements OnInit {
  formulario: FormGroup

  @Output() loteGuardado: EventEmitter<Lotes> = new EventEmitter()
  @Output() cancelar: EventEmitter<null> = new EventEmitter()

  constructor(public fb: FormBuilder, public vs: ValidacionesService) {
    this.crearFormulario()
  }

  ngOnInit() {}

  crearFormulario() {
    this.formulario = this.fb.group({
      cantidadEntrada: [
        "",
        [
          this.vs.onlyIntegers,
          this.vs.numberValidator,
          Validators.required,
          Validators.min(1)
        ]
      ],
      observaciones: [""]
    })
  }

  get cantidadEntrada_FB(): AbstractControl {
    return this.formulario.get("cantidadEntrada")
  }

  get observaciones_FB(): AbstractControl {
    return this.formulario.get("observaciones")
  }

  guardar(lote: Lotes, invalid: boolean, e) {
    e.preventDefault()
    if (invalid) return
    this.limpiar()
    this.loteGuardado.emit(lote)
  }

  cancelarGuardado() {
    this.limpiar()
    this.cancelar.emit()
  }

  limpiar() {
    this.crearFormulario()
  }
}
