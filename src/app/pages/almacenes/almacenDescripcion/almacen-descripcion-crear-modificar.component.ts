import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { AlmacenDescripcion } from '../../../models/almacenDeMateriaPrimaYHerramientas/almacen-descripcion.model'
import { ValidacionesService } from '../../../services/utilidades/validaciones.service'
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms'
import { AlmacenDescripcionService } from 'src/app/services/almacenDeMateriaPrimaYHerramientas/almacen-descripcion.service'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

@Component({
  selector: 'app-almacen-descripcion-crear-modificar',
  templateUrl: './almacen-descripcion-crear-modificar.component.html',
  styles: []
})
export class AlmacenDescripcionCrearModificarComponent implements OnInit {
  formulario: FormGroup

  cargando = {}
  almacenDescripcion: AlmacenDescripcion
  keys = Object.keys

  constructor(
    public almacenDescripcionService: AlmacenDescripcionService,
    public formBuilder: FormBuilder,
    public vs: ValidacionesService,
    public location: Location,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id')

    if (id) {
      this.cargando['cargando'] = 'Buscando almacendescripcion'
      this.almacenDescripcionService.findById(id).subscribe(
        almacendescripcion => {
          this.crearFormulario(almacendescripcion)
          delete this.cargando['cargando']
        },
        () => this.location.back()
      )
    } else {
      this.crearFormulario()
    }
  }

  crearFormulario(almaDes: AlmacenDescripcion = new AlmacenDescripcion()) {
    this.almacenDescripcion = almaDes
    this.formulario = this.formBuilder.group({
      nombre: [almaDes.nombre, [Validators.required]],
      descripcion: almaDes.descripcion,
      ubicacion: almaDes.ubicacion
    })
  }

  f(c: string): AbstractControl {
    return this.formulario.get(c)
  }

  submit(almacendescripcion: AlmacenDescripcion, invalid: boolean, e) {
    this.formulario.markAllAsTouched()
    this.formulario.updateValueAndValidity()

    if (invalid) {
      e.preventDefault()
      e.stopPropagation()
      return
    }

    this.cargando['guardando'] = 'Espera mientras se aplican los cambios'

    if (this.almacenDescripcion._id) {
      almacendescripcion._id = this.almacenDescripcion._id
      this.almacenDescripcionService.update(almacendescripcion).subscribe(
        () => this.location.back(),
        err => delete this.cargando['guardando']
      )
    } else {
      this.almacenDescripcionService.save(almacendescripcion).subscribe(() => {
        this.crearFormulario()
        delete this.cargando['guardando']
      }, 
      err=> delete this.cargando['guardando']
      )
    }
  }
}
