import { Component, OnInit } from '@angular/core'
import { CrearModificar_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/CrearModificar_GUI_CRUD'
import { Color } from 'src/app/models/color.models'
import {
  FormBuilder,
  Validators,
  AbstractControl,
  FormGroup
} from '@angular/forms'
import { ColorService } from 'src/app/services/modelo/color.service'
import { ValidacionesService } from 'src/app/services/utilidades/validaciones.service'
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-colores-crear-modificar',
  templateUrl: './colores-crear-modificar.component.html',
  styles: []
})
export class ColoresCrearModificarComponent implements OnInit {
  formulario: FormGroup

  cargando = {}
  color: Color
  keys = Object.keys

  constructor(
    public colorService: ColorService,
    public formBuilder: FormBuilder,
    public vs: ValidacionesService,
    public location: Location,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id')

    if (id) {
      this.cargando['cargando'] = 'Buscando color'
      this.colorService.findById(id).subscribe(
        color => {
          this.crearFormulario(color)
          this.color = color
          delete this.cargando['cargando']
        },
        err => this.location.back()
      )
    } else {
      this.crearFormulario()
    }
  }

  crearFormulario(color: Color = new Color()) {
    this.formulario = this.formBuilder.group({
      color: [color.color, [Validators.required]]
    })
  }

  f(c: string): AbstractControl {
    return this.formulario.get(c)
  }

  submit(modelo: Color, invalid: boolean, e) {
    this.formulario.markAllAsTouched()
    this.formulario.updateValueAndValidity()

    if (invalid) {
      e.preventDefault()
      e.stopPropagation()
      return
    }

    this.cargando['guardando'] = 'Espera mientras se aplican los cambios'

    if (this.color) {
      modelo._id = this.color._id
      this.colorService.update(modelo).subscribe(() => this.location.back())
    } else {
      this.colorService.save(modelo).subscribe(() => {
        this.crearFormulario()
        delete this.cargando['guardando']
      })
    }
  }
}
