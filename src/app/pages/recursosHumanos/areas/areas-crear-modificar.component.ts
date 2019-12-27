import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core"
import { AreaRH } from "src/app/models/recursosHumanos/areas/areaRH.model"
import { FormGroup, FormBuilder, AbstractControl, ValidatorFn, Validators } from '@angular/forms'
import { AreaService } from "../../../services/recursosHumanos/area.service"
import { ValidacionesService } from "src/app/services/utilidades/validaciones.service"
import { ManejoDeMensajesService } from "src/app/services/utilidades/manejo-de-mensajes.service"

@Component({
  selector: "app-areas-crear-modificar",
  templateUrl: "./areas-crear-modificar.component.html",
  styles: []
})
export class AreasCrearModificarComponent implements OnInit {
  @Input() area: AreaRH = null
  @Output() guardar = new EventEmitter<null>()
  @Output() esteComponente = new EventEmitter<this>()

  formulario: FormGroup

  constructor(
    public fb: FormBuilder,
    public vs: ValidacionesService,
    public _areaService: AreaService,
    public _msjService: ManejoDeMensajesService
  ) {}

  ngOnInit() {
    this.esteComponente.emit(this)
    this.crearFormulario()
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      nombre: ["", [Validators.required]]
    })
  }

  cargarDatos() {
    this.crearFormulario()
    this.asignarValores(this.area)
  }
  asignarValores(area: AreaRH) {
    let datos: AreaRH = area ? area : this.area

    this.nombre_FB.setValue(datos.nombre)
  }

  submit(modelo: AreaRH, valid: boolean, e) {
    e.preventDefault()
    if (valid) {
      let cb = () => {
        this.guardar.emit()
        this.limpiar()
      }
      if (this.area) {
        modelo._id = this.area._id
        this._areaService.modificar(modelo).subscribe(cb)
      } else {
        this._areaService.guardar(modelo).subscribe(cb)
      }
    }
  }

  limpiar() {
    this.crearFormulario()
    this.area = null
  }

  cancelar() {
    this.limpiar()
  }

  public get nombre_FB(): AbstractControl {
    return this.formulario.get("nombre")
  }

  modificar( area: AreaRH ){
    this.area = area
    this.crearFormulario()
    this.asignarValores(area)
  }

  crear( ) {
    this.crearFormulario()
  }
}
