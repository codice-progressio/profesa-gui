import { Component, OnInit } from '@angular/core'
import { Tamano } from 'src/app/models/tamano.models'
import {
  FormBuilder,
  Validators,
  AbstractControl,
  FormGroup
} from '@angular/forms'
import { ValidacionesService } from 'src/app/services/utilidades/validaciones.service'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'
import { TamanoService } from 'src/app/services/modelo/tamano.service'

@Component({
  selector: 'app-tamanos-crear-modificar',
  templateUrl: './tamanos-crear-modificar.component.html',
  styles: []
})
export class TamanosCrearModificarComponent implements OnInit {
  formulario: FormGroup

  cargando = {}
  tamano: Tamano
  keys = Object.keys

  constructor(
    public skuService: TamanoService,
    public formBuilder: FormBuilder,
    public vs: ValidacionesService,
    public location: Location,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id')

    if (id) {
      this.cargando['cargando'] = 'Buscando tamano'
      this.skuService.findById(id).subscribe(
        tamano => {
          this.crearFormulario(tamano)
          this.tamano = tamano
          delete this.cargando['cargando']
        },
        () => this.location.back()
      )
    } else {
      this.crearFormulario()
    }
  }

  crearFormulario(tamano: Tamano = new Tamano()) {
    this.formulario = this.formBuilder.group({
      tamano: [tamano.tamano, [Validators.required]]
    })
  }

  f(c: string): AbstractControl {
    return this.formulario.get(c)
  }

  submit(tamano: Tamano, invalid: boolean, e) {
    this.formulario.markAllAsTouched()
    this.formulario.updateValueAndValidity()

    if (invalid) {
      e.preventDefault()
      e.stopPropagation()
      return
    }

    this.cargando['guardando'] = 'Espera mientras se aplican los cambios'

    if (this.tamano) {
      tamano._id = this.tamano._id
      this.skuService.update(tamano).subscribe(() => this.location.back())
    } else {
      this.skuService.save(tamano).subscribe(() => {
        this.crearFormulario()
        delete this.cargando['guardando']
      })
    }
  }
}
