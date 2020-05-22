import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core"
import { Departamento } from "src/app/models/departamento.models"
import { AreaRH } from "../../models/recursosHumanos/areas/areaRH.model"
import { AreaService } from "../../services/recursosHumanos/area.service"
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms"
import { DepartamentoService } from "../../services/departamento/departamento.service"
import { ValidacionesService } from "../../services/utilidades/validaciones.service"

@Component({
  selector: "app-departamento-crear-modificar",
  templateUrl: "./departamento-crear-modificar.component.html",
  styles: []
})
export class DepartamentoCrearModificarComponent implements OnInit {
  @Output() esteComponente = new EventEmitter<this>()
  @Output() guardado = new EventEmitter()
  departamento: Departamento = null
  areas: AreaRH[] = []

  formulario: FormGroup

  constructor(
    public _areaService: AreaService,
    public _departamentoService: DepartamentoService,
    public fb: FormBuilder,
    public vs: ValidacionesService
  ) {}

  ngOnInit() {
    this.esteComponente.emit(this)
    this._areaService
      .todoAbstracto(0, 1000, AreaRH, undefined)
      .subscribe((areas) => (this.areas = areas))
    this.construirFormulario()
  }

  construirFormulario() {
    this.formulario = this.fb.group({
      area: ["", Validators.required],
      nombre: ["", Validators.required]
    })
  }

  public get area_FB(): AbstractControl {
    return this.formulario.get("area")
  }
  public get nombre_FB(): AbstractControl {
    return this.formulario.get("nombre")
  }

  submit(model: AreaRH, invalid: boolean, e) {
    e.preventDefault()
    if (invalid) return

    model._id = this.departamento._id

    let cb = () => {
      this.guardado.emit()
      this.limpiar()
    }

    let cbError = (err) => {
      console.log("Algo paso al crear o modificar el departamento: ", err)
    }

    if (this.departamento._id) {
      this._departamentoService.update(model).subscribe(cb, cbError)
    } else {
      this._departamentoService.save(model).subscribe(cb, cbError)
    }
  }

  limpiar() {
    this.departamento = null
    this.formulario.reset()
  }

  cancelar() {
    this.limpiar()
  }

  crearOModificar(dep: Departamento = new Departamento()) {
    this.limpiar()
    if (dep._id) this.asignarValores(dep)
    this.departamento = dep
  }

  asignarValores(dep: Departamento) {
    this.nombre_FB.setValue(dep.nombre)
    this.area_FB.setValue(dep.area._id)
  }
}
