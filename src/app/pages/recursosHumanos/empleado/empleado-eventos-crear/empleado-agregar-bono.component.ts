import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import {
  EmpleadoAgregarEventosGeneral,
  iEmpleadoAgregarEventosGeneral
} from './EmpleadoAgregarEventosGeneral'
import { Empleado } from 'src/app/models/recursosHumanos/empleados/empleado.model'
import { EmpleadoService } from 'src/app/services/recursosHumanos/empleado.service'
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service'
import {
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl
} from '@angular/forms'
import { ValidacionesService } from 'src/app/services/utilidades/validaciones.service'
import { Bono } from '../../../../models/recursosHumanos/empleados/eventos/bono.model'
import { ValidatorFn } from '@angular/forms'

@Component({
  selector: 'app-empleado-agregar-bono',
  templateUrl: './empleado-agregar-bono.component.html',
  styles: []
})
export class EmpleadoAgregarBonoComponent
  extends EmpleadoAgregarEventosGeneral<Empleado>
  implements OnInit, iEmpleadoAgregarEventosGeneral {
  porAsistencia: boolean = false
  porPuntualidad: boolean = false
  porProductividad: boolean = false
  porResultados: boolean = false
  ayudaEscolarEventual: boolean = false
  otros: boolean = false

  constructor(
    public _empleadoService: EmpleadoService,
    public _notiService: ManejoDeMensajesService,
    public fb: FormBuilder,
    public vs: ValidacionesService
  ) {
    super(_empleadoService, _notiService, fb, vs)
  }

  ngOnInit() {
    this.crearFormulario()
  }

  @ViewChild('select')
  select: ElementRef

  crearFormulario(): void {
    this.formulario = this.fb.group(
      {
        porAsistencia: [null, null],
        porPuntualidad: [null, null],
        porProductividad: [null, null],
        porResultados: [null, null],
        ayudaEscolarEventual: [null, null],
        otros: this.fb.group({
          cantidad: [null, null],
          motivo: [null, null]
        })
      },
      {
        validators: Validators.compose([this.validarOpcionSeleccinada()])
      }
    )
  }

  validarOpcionSeleccinada(): ValidatorFn {
    return (c: AbstractControl): { general: { mensaje: string } } | null => {
      if (
        ![
          this.porAsistencia,
          this.porPuntualidad,
          this.porProductividad,
          this.porResultados,
          this.ayudaEscolarEventual,
          this.otros
        ].includes(true)
      ) {
        return {
          general: { mensaje: 'Debes seleccionar una opcion de la lista' }
        }
      }

      return null
    }
  }

  submit(e: any, invalid: boolean, model: Bono): void {
    this.formulario.markAllAsTouched()
    this.formulario.updateValueAndValidity()

    if (invalid) {
      e.preventDefault()
      e.stopPropagation()
      return
    }

    this._empleadoService.registrarBono(this.empleado._id, model).subscribe(
      ok => {
        this.guardado.emit()
        this.limpiar()
        this.crearFormulario()
      },
      err => this.cancelar()
    )
  }
  cancelar(): void {
    this.limpiar()
    this.crearFormulario()
  }

  limpiar() {
    this.select.nativeElement.selectedIndex = 0
    this.reiniciarValoresBoleanos()
  }

  private reiniciarValoresBoleanos() {
    this.porAsistencia = false
    this.porPuntualidad = false
    this.porProductividad = false
    this.porResultados = false
    this.ayudaEscolarEventual = false
    this.otros = false
  }

  private quitarTodasLasValidaciones() {
    Object.keys(this.formulario.controls).forEach(x => {
      const control: AbstractControl = this.formulario.controls[x]
      control.clearValidators()
      control.updateValueAndValidity()

      const otro = control.get('otros')
      if (otro) {
        otro.get('motivo').clearValidators()
        otro.get('motivo').updateValueAndValidity()
        otro.get('cantidad').clearValidators()
        otro.get('cantidad').updateValueAndValidity()
      }
    })
  }

  tipo(valor: string) {
    console.log(`entro`, valor)
    this.formulario.updateValueAndValidity()
    this.reiniciarValoresBoleanos()
    this.quitarTodasLasValidaciones()
    this[valor] = true
    console.log(`this[valor]`, this[valor])
    //Tiene que ser obligatorio si se esta mostrando.
    const control: AbstractControl = this.formulario.controls[valor]

    if (valor === 'otros') {
      control.get('motivo').setValidators([Validators.required])
      control
        .get('cantidad')
        .setValidators([Validators.required, , Validators.min(1)])
    } else {
      control.setValidators([Validators.required, Validators.min(1)])
      control.updateValueAndValidity()
    }
  }
}
