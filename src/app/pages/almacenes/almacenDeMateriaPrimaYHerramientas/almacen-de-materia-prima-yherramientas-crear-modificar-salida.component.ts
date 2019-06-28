import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core"
import { Articulo } from "../../../models/almacenDeMateriaPrimaYHerramientas/articulo.modelo"
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms"
import { ValidacionesService } from "src/app/services/utilidades/validaciones.service"
import { SalidaArticulo } from "../../../models/almacenDeMateriaPrimaYHerramientas/salidaArticulo.model"
import { ArticuloService } from "../../../services/articulo/articulo.service"
import { Departamento } from "src/app/models/departamento.models"
import { DepartamentoService } from "../../../services/departamento/departamento.service"

@Component({
  selector: "app-almacen-de-materia-prima-yherramientas-crear-modificar-salida",
  templateUrl:
    "./almacen-de-materia-prima-yherramientas-crear-modificar-salida.component.html",
  styles: []
})
export class AlmacenDeMateriaPrimaYHerramientasCrearModificarSalidaComponent
  implements OnInit {
  @Input() articulo: Articulo = null
  @Output() guardado = new EventEmitter<null>()
  @Output() cancelado = new EventEmitter<null>()
  @Output() esteComponente = new EventEmitter<this>()
  formulario: FormGroup
  departamentos: Departamento[] = []

  constructor(
    public fb: FormBuilder,
    public vs: ValidacionesService,
    public _articuloService: ArticuloService,
    public _departamentoService: DepartamentoService
  ) {}

  ngOnInit() {
    this.esteComponente.emit(this)
    this.crearFormulario()
    this._departamentoService
      .todo()
      .subscribe((departamentos) => (this.departamentos = departamentos))
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      cantidad: ["", [Validators.required, Validators.min(0)]],
      departamento: ["", [Validators.required]],
      observaciones: ["", []]
    })
  }

  get cantidad_FB(): AbstractControl {
    return this.formulario.get("cantidad")
  }
  get departamento_FB(): AbstractControl {
    return this.formulario.get("departamento")
  }
  get observaciones_FB(): AbstractControl {
    return this.formulario.get("observaciones")
  }

  limpiar() {
    this.crearFormulario()
  }
  submit(modelo: SalidaArticulo, valid: boolean, e) {
    e.preventDefault()
    if (valid) {
      this._articuloService
        .salida(this.articulo._id, modelo)
        .subscribe((articulo) => {
          this.limpiar()
          this.guardado.emit()
          this.articulo = articulo
        })
    }
  }

  cancelar() {
    this.cancelado.emit()
  }
}
