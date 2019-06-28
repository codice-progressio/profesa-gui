import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core"
import { AlmacenDescripcion } from "../../../models/almacenDeMateriaPrimaYHerramientas/almacen-descripcion.model"
import { ValidacionesService } from "../../../services/utilidades/validaciones.service"
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms"

@Component({
  selector: "app-almacen-descripcion-crear-modificar",
  templateUrl: "./almacen-descripcion-crear-modificar.component.html",
  styles: []
})
export class AlmacenDescripcionCrearModificarComponent implements OnInit {
  @Output() guardar = new EventEmitter<AlmacenDescripcion>()
  @Output() modificar = new EventEmitter<AlmacenDescripcion>()
  @Output() esteComponente = new EventEmitter<
    AlmacenDescripcionCrearModificarComponent
  >()
  @Input() almacenDescripcion: AlmacenDescripcion = null

  formulario: FormGroup

  constructor(public fb: FormBuilder, public _vs: ValidacionesService) {
  }
  
  ngOnInit() {
    this.esteComponente.emit(this)
    this.crearFormulario()
  }

  cargarDatos() {

    let interval = setInterval( ()=>{
      
      if( this.almacenDescripcion ){
        this.nombre_FB.setValue(this.almacenDescripcion.nombre)
        this.descripcion_FB.setValue(this.almacenDescripcion.descripcion)
        this.ubicacion_FB.setValue(this.almacenDescripcion.ubicacion)

        clearInterval(interval)

      }
    } , 100 )
    

  }

  crearFormulario() {
    this.formulario = this.fb.group({
      nombre: ["", [Validators.required]],
      descripcion: ["", []],
      ubicacion: ["", []]
    })
  }

  get nombre_FB(): AbstractControl {
    return this.formulario.get("nombre")
  }
  get descripcion_FB(): AbstractControl {
    return this.formulario.get("descripcion")
  }
  get ubicacion_FB(): AbstractControl {
    return this.formulario.get("ubicacion")
  }

  submit(ad: AlmacenDescripcion, invalid: boolean, e) {
    e.preventDefault()
    if (invalid) return

    if (this.almacenDescripcion._id) {
      
      ad._id = this.almacenDescripcion._id
      this.modificar.emit(ad)
    }else{

      this.guardar.emit(ad)
    }

    this.limpiar()
  }

  limpiar() {
    this.crearFormulario()
  }

  cancelar() {
    this.limpiar()
  }
}
