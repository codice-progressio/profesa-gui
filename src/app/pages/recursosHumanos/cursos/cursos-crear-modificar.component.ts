import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild
} from "@angular/core"
import { Curso } from "src/app/models/recursosHumanos/cursos/curso.model"
import { FormGroup, FormBuilder, AbstractControl } from "@angular/forms"
import { ValidacionesService } from "src/app/services/utilidades/validaciones.service"
import { CursoService } from "src/app/services/recursosHumanos/curso.service"
import { ArticuloService } from "src/app/services/articulo/articulo.service"
import { ManejoDeMensajesService } from "src/app/services/utilidades/manejo-de-mensajes.service"
import { Validators } from "@angular/forms"

@Component({
  selector: "app-cursos-crear-modificar",
  templateUrl: "./cursos-crear-modificar.component.html",
  styles: []
})
export class CursosCrearModificarComponent implements OnInit {
  @Input() curso: Curso = null
  @Output() guardar = new EventEmitter<null>()
  @Output() esteComponente = new EventEmitter<this>()

  formulario: FormGroup

  constructor(
    public fb: FormBuilder,
    public vs: ValidacionesService,
    public _cursoService: CursoService,
    public _msjService: ManejoDeMensajesService
  ) {}

  ngOnInit() {
    this.esteComponente.emit(this)
    this.crearFormulario()
  }

  cargarDatos() {
    this.crearFormulario()
    this.asignarValores()
  }

  asignarValores() {
    this.nombre_FB.setValue(this.curso.nombre)
    this.duracion_FB.setValue(this.curso.duracion)
    this.instructor_FB.setValue(this.curso.instructor)
    this.descripcionDeCurso_FB.setValue(this.curso.descripcionDeCurso)
    this.esCursoDeTroncoComun_FB.setValue(this.curso.esCursoDeTroncoComun)
    this.esCursoDeEspecializacion_FB.setValue(
      this.curso.esCursoDeEspecializacion
    )

    this.seleccionarAmbito(this.esCursoDeTroncoComun_FB.value)
  }

  crear() {
    this.curso = null
    this.crearFormulario()
  }

  modificar(curso: Curso) {
    this.curso = curso
    this.crearFormulario()
    this.cargarDatos()
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      nombre: ["", [Validators.required]],
      duracion: ["", [this.vs.numberValidator, Validators.min(0)]],
      instructor: ["", [Validators.required]],
      descripcionDeCurso: ["", [Validators.required]],
      //Es obligatorio
      esCursoDeTroncoComun: [true, []],
      esCursoDeEspecializacion: [false, []]
    })
  }

  submit(modelo: Curso, valid: boolean, e) {
    e.preventDefault()
    if (valid) {
      let cb = () => {
        this.guardar.emit()
        this.limpiar()
      }
      if (this.curso) {
        modelo._id = this.curso._id
        this._cursoService.modificar(modelo).subscribe(cb)
      } else {
        this._cursoService.guardar(modelo).subscribe(cb)
      }
    }
  }

  limpiar() {
    this.crearFormulario()
    this.curso = null
  }

  cancelar() {
    this.limpiar()
  }

  public get nombre_FB(): AbstractControl {
    return this.formulario.get("nombre")
  }
  public get duracion_FB(): AbstractControl {
    return this.formulario.get("duracion")
  }

  public get instructor_FB(): AbstractControl {
    return this.formulario.get("instructor")
  }

  public get descripcionDeCurso_FB(): AbstractControl {
    return this.formulario.get("descripcionDeCurso")
  }

  public get esCursoDeTroncoComun_FB(): AbstractControl {
    return this.formulario.get("esCursoDeTroncoComun")
  }
  public get esCursoDeEspecializacion_FB(): AbstractControl {
    return this.formulario.get("esCursoDeEspecializacion")
  }

  private limpiarAmbitos() {
    this.esCursoDeEspecializacion_FB.setValue(false)
    this.esCursoDeTroncoComun_FB.setValue(false)
  }
  seleccionarAmbito(ambito: boolean) {
    this.limpiarAmbitos()
    if (ambito) {
      this.esCursoDeTroncoComun_FB.setValue(true)
    } else {
      this.esCursoDeEspecializacion_FB.setValue(true)
    }
  }
}
