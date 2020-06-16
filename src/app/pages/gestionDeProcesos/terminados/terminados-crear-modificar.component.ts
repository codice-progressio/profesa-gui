import { Component, OnInit } from '@angular/core'
import { Terminado } from 'src/app/models/terminado.models'
import {
  FormBuilder,
  Validators,
  AbstractControl,
  FormGroup
} from '@angular/forms'
import { ValidacionesService } from 'src/app/services/utilidades/validaciones.service'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'
import { TerminadoService } from 'src/app/services/modelo/terminado.service'

@Component({
  selector: 'app-terminados-crear-modificar',
  templateUrl: './terminados-crear-modificar.component.html',
  styles: []
})
export class TerminadosCrearModificarComponent implements OnInit {
  formulario: FormGroup

  cargando = {}
  terminado: Terminado
  keys = Object.keys

  constructor(
    public skuService: TerminadoService,
    public formBuilder: FormBuilder,
    public vs: ValidacionesService,
    public location: Location,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id')

    if (id) {
      this.cargando['cargando'] = 'Buscando terminado'
      this.skuService.findById(id).subscribe(
        terminado => {
          this.crearFormulario(terminado)
          this.terminado = terminado
          delete this.cargando['cargando']
        },
        () => this.location.back()
      )
    } else {
      this.crearFormulario()
    }
  }

  crearFormulario(terminado: Terminado = new Terminado()) {
    this.formulario = this.formBuilder.group({
      terminado: [terminado.terminado, [Validators.required]]
    })
  }

  f(c: string): AbstractControl {
    return this.formulario.get(c)
  }

  submit(terminado: Terminado, invalid: boolean, e) {
    this.formulario.markAllAsTouched()
    this.formulario.updateValueAndValidity()

    if (invalid) {
      e.preventDefault()
      e.stopPropagation()
      return
    }

    this.cargando['guardando'] = 'Espera mientras se aplican los cambios'

    if (this.terminado) {
      terminado._id = this.terminado._id
      this.skuService.update(terminado).subscribe(() => this.location.back())
    } else {
      this.skuService.save(terminado).subscribe(() => {
        this.crearFormulario()
        delete this.cargando['guardando']
      })
    }
  }
}
