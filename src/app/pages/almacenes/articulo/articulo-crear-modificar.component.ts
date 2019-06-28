import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core"
import { Articulo } from "../../../models/almacenDeMateriaPrimaYHerramientas/articulo.modelo"
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms"
import { ValidacionesService } from "../../../services/utilidades/validaciones.service"
import { min } from "rxjs/operators"
import { ArticuloService } from "src/app/services/articulo/articulo.service"
import { AlmacenDescripcion } from "../../../models/almacenDeMateriaPrimaYHerramientas/almacen-descripcion.model"
import { AlmacenDescripcionService } from "../../../services/almacenDeMateriaPrimaYHerramientas/almacen-descripcion.service"

@Component({
  selector: "app-articulo-crear-modificar",
  templateUrl: "./articulo-crear-modificar.component.html",
  styles: []
})
export class ArticuloCrearModificarComponent implements OnInit {
  @Input() articulo: Articulo = null
  @Output() guardar = new EventEmitter<null>()

  @Output() esteComponente = new EventEmitter<this>()

  formulario: FormGroup

  almacenes: AlmacenDescripcion[] = []

  constructor(
    public fb: FormBuilder,
    public vs: ValidacionesService,
    public _articuloService: ArticuloService,
    public _almacenDescripcionService: AlmacenDescripcionService
  ) {}

  ngOnInit() {
    this.esteComponente.emit(this)
    this.crearFormulario()

    this._almacenDescripcionService
      .todo()
      .subscribe((todo) => (this.almacenes = todo))
  }

  cargarDatos() {
    let intervalo = setInterval(() => {
      if (this.articulo) {
        clearInterval(intervalo)
        throw "No se ha definido cargar datos. "
      }
    }, 100)
  }

  crearFormulario() {
    this.formulario = this.fb.group(
      {
        codigoLocalizacion: ["", []],
        codigoInterno: ["", []],
        codigoProveedor: ["", []],
        almacen: ["", [Validators.required]],
        nombre: ["", [Validators.required]],
        presentacion: ["", [Validators.required]],
        unidad: ["", [Validators.required]],
        kgPorUnidad: ["", [Validators.required, Validators.min(0)]],
        stockMinimo: [
          "",
          [Validators.required, Validators.max(999999), Validators.min(0)]
        ],
        stockMaximo: [
          "",
          [Validators.required, Validators.max(999999), Validators.min(0)]
        ]
      },
      { validator: this.validarMinMax }
    )
  }

  validarMinMax(group: FormGroup) {
    let min: number = group.get("stockMinimo").value
    let max: number = group.get("stockMaximo").value
    // let minA: AbstractControl = group.get("stockMinimo")
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

  get codigoLocalizacion_FB(): AbstractControl {
    return this.formulario.get("codigoLocalizacion")
  }
  get codigoInterno_FB(): AbstractControl {
    return this.formulario.get("codigoInterno")
  }
  get codigoProveedor_FB(): AbstractControl {
    return this.formulario.get("codigoProveedor")
  }
  get almacen_FB(): AbstractControl {
    return this.formulario.get("almacen")
  }
  get nombre_FB(): AbstractControl {
    return this.formulario.get("nombre")
  }
  get presentacion_FB(): AbstractControl {
    return this.formulario.get("presentacion")
  }
  get unidad_FB(): AbstractControl {
    return this.formulario.get("unidad")
  }
  get kgPorUnidad_FB(): AbstractControl {
    return this.formulario.get("kgPorUnidad")
  }
  get stockMinimo_FB(): AbstractControl {
    return this.formulario.get("stockMinimo")
  }
  get stockMaximo_FB(): AbstractControl {
    return this.formulario.get("stockMaximo")
  }

  submit(modelo: Articulo, valid: boolean, e) {
    e.preventDefault()
    if (valid) {
      let cb = () => {
        this.guardar.emit()
        this.limpiar()
      }

      if (this.articulo) {
        modelo._id = this.articulo._id
        this._articuloService.modificar(modelo).subscribe(cb)
      } else {
        this._articuloService.guardar(modelo).subscribe(cb)
      }
    }
  }

  limpiar() {
    this.crearFormulario()
  }

  cancelar() {
    this.limpiar()
  }
}
