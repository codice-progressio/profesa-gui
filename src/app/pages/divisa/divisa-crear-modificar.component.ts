import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core"
import { Divisa } from "src/app/models/divisas/divisa.model"
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms"
import { ValidacionesService } from "src/app/services/utilidades/validaciones.service"
import { DivisaService } from "src/app/services/divisa.service"

@Component({
  selector: "app-divisa-crear-modificar",
  templateUrl: "./divisa-crear-modificar.component.html",
  styles: []
})
export class DivisaCrearModificarComponent implements OnInit {
  @Input() divisa: Divisa = null
  @Output() guardar = new EventEmitter<null>()
  @Output() esteComponente = new EventEmitter<this>()

  formulario: FormGroup

  constructor(
    public fb: FormBuilder,
    public vs: ValidacionesService,
    public _divisaService: DivisaService
  ) {}

  ngOnInit() {
    this.esteComponente.emit(this)
    this.crearFormulario()
  }

  cargarDatos() {
    this.crearFormulario()
    this.asignarValores(this.divisa)
  }

  asignarValores(divisa: Divisa) {
    this.nombre_FB.setValue(divisa.nombre)
    this.tipoDeCambio_FB.setValue(divisa.tipoDeCambio)
  }

  crear() {
    this.divisa = null
    this.crearFormulario()
  }

  modificar(divisa: Divisa) {
    this.divisa = divisa
    this.crearFormulario()
    this.cargarDatos()
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      nombre: ["", [Validators.required]],
      tipoDeCambio: [
        "",
        [
          Validators.required,
          this.vs.numberValidator,
          Validators.min(1),
          Validators.max(99)
        ]
      ]
    })
  }

  get nombre_FB(): AbstractControl {
    return this.formulario.get("nombre")
  }
  get tipoDeCambio_FB(): AbstractControl {
    return this.formulario.get("tipoDeCambio")
  }

  submit(modelo: Divisa, valid: boolean, e) {
    e.preventDefault()
    if (valid) {
      let cb = () => {
        this.guardar.emit()
        this.limpiar()
      }

      if (this.divisa) {
        modelo._id = this.divisa._id
        this._divisaService.modificar(modelo).subscribe(cb)
      } else {
        this._divisaService.guardar(modelo).subscribe(cb)
      }
    }
  }

  limpiar() {
    this.crearFormulario()
    this.divisa = null
  }

  cancelar() {
    this.limpiar()
  }
}
