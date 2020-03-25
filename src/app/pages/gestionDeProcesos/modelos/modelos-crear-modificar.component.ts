import { Component, OnInit } from '@angular/core'
import { ModeloService } from '../../../services/modelo/modelo.service'
import { Modelo } from 'src/app/models/modelo.models'
import {
  FormBuilder,
  Validators,
  AbstractControl,
  FormGroup
} from '@angular/forms'
import { ValidacionesService } from 'src/app/services/utilidades/validaciones.service'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

@Component({
  selector: 'app-modelos-crear-modificar',
  templateUrl: './modelos-crear-modificar.component.html',
  styles: []
})
export class ModelosCrearModificarComponent implements OnInit {
  formulario: FormGroup

  cargando = {}
  modelo: Modelo
  keys = Object.keys

  constructor(
    public skuService: ModeloService,
    public formBuilder: FormBuilder,
    public vs: ValidacionesService,
    public location: Location,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id')

    if (id) {
      this.cargando['cargando'] = 'Buscando modelo'
      this.skuService.findById(id).subscribe(
        modelo => {
          this.crearFormulario(modelo)
          this.modelo = modelo
          delete this.cargando['cargando']
        },
        () => this.location.back()
      )
    } else {
      this.crearFormulario()
    }
  }

  crearFormulario(modelo: Modelo = new Modelo()) {
    this.formulario = this.formBuilder.group({
      modelo: [modelo.modelo, [Validators.required]]
    })
  }

  f(c: string): AbstractControl {
    return this.formulario.get(c)
  }

  submit(modelo: Modelo, invalid: boolean, e) {
    this.formulario.markAllAsTouched()
    this.formulario.updateValueAndValidity()

    if (invalid) {
      e.preventDefault()
      e.stopPropagation()
      return
    }

    this.cargando['guardando'] = 'Espera mientras se aplican los cambios'

    if (this.modelo) {
      modelo._id = this.modelo._id
      this.skuService.update(modelo).subscribe(() => this.location.back())
    } else {
      this.skuService.save(modelo).subscribe(() => {
        this.crearFormulario()
        delete this.cargando['guardando']
      })
    }
  }
}
