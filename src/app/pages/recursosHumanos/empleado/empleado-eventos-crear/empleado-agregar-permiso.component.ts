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
  ValidatorFn,
  AbstractControl
} from '@angular/forms'
import { ValidacionesService } from 'src/app/services/utilidades/validaciones.service'
import * as moment from 'moment'

@Component({
  selector: 'app-empleado-agregar-permiso',
  templateUrl: './empleado-agregar-permiso.component.html',
  styles: []
})
export class EmpleadoAgregarPermisoComponent
  extends EmpleadoAgregarEventosGeneral<Empleado>
  implements OnInit, iEmpleadoAgregarEventosGeneral {
  @ViewChild('select', { static: false }) select: ElementRef
  @ViewChild('selectConGoce', { static: false }) selectConGoce: ElementRef

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

  crearFormulario(): void {
    this.formulario = this.fb.group(
      {
        conGoceDeSueldo: [false, null],
        sinGoceDeSueldo: [true, null],
        motivo: this.fb.group({
          porPaternidad: [false, null],
          porDefuncion: [false, null],
          porMatrimonio: [false, null],
          paraDesempenarUnCargoDeEleccionPopular: [false, null],
          citaMedica: [false, null],
          otro: ['', [Validators.minLength(10)]]
        }),
        fechaDeInicio: [
          moment()
            .local()
            .format('YYYY-MM-DD'),
          [Validators.required]
        ],
        fechaDeFinalizacion: [
          moment()
            .add(1, 'day')
            .local()
            .format('YYYY-MM-DD'),
          [Validators.required]
        ],
        autorizacionSupervisor: [null, [Validators.required]],
        autorizacionRH: [false, null],
        comentario: ['', null]
      },
      {
        validators: Validators.compose([
          this.vs.fechaMenorQue('fechaDeInicio', 'fechaDeFinalizacion'),
          this.validarMotivo()
        ])
      }
    )
  }

  motivoValido: -1 | 0 | 1 = -1

  validarMotivo(): ValidatorFn {
    return (c: AbstractControl): { general: { mensaje: string } } | null => {
      var unCampoEsTrue = false
      var touched = false
      ;[
        'motivo.porPaternidad',
        'motivo.porDefuncion',
        'motivo.porMatrimonio',
        'motivo.paraDesempenarUnCargoDeEleccionPopular',
        'motivo.citaMedica'
      ].forEach(nombre => {
        if (c.get(nombre).value) unCampoEsTrue = true
        if (c.get(nombre).touched) touched = true
      })

      const cOtro = c.get('motivo.otro')

      if (cOtro.touched) touched = true

      // Si se selecciono un motivo por lo menos entonces
      // no es necesario validar otro

      if (!unCampoEsTrue && this.mostrarOtro) {
        //Entonces otros debe de contener texto
        const otros: string = (cOtro.value + '').trim()

        if (!otros) {
          return {
            general: {
              mensaje: 'El motivo "otro" requiere que especifiques la razon'
            }
          }
        }
      }

      if (!unCampoEsTrue && !this.mostrarOtro) {
        if (touched) this.motivoValido = 0

        return {
          general: { mensaje: 'Debes seleccionar un motivo de la lista' }
        }
      }
      this.motivoValido = 1
      return null
    }
  }

  conGoce(conGoce: string) {
    const b = conGoce == 'true'
    const con = this.f('conGoceDeSueldo')
    const sin = this.f('sinGoceDeSueldo')
    con.setValue(b)
    sin.setValue(!b)
    con.markAsTouched()
    con.updateValueAndValidity()
  }

  mostrarOtro: boolean = false

  motivo(opcion: string) {
    const opciones = [
      'porPaternidad',
      'porDefuncion',
      'porMatrimonio',
      'paraDesempenarUnCargoDeEleccionPopular',
      'citaMedica'
    ].forEach(p => this.f('motivo.' + p).setValue(null))
    this.f('motivo.otro').setValue('')
    this.mostrarOtro = false

    const esOtro = opcion === 'otro'

    if (!esOtro) {
      this.f('motivo.' + opcion).setValue(true)
      this.f('motivo.otro').clearValidators()
    } else {
      this.mostrarOtro = true
      this.f('motivo.otro').setValidators(Validators.required)
    }
    this.f('motivo.otro').updateValueAndValidity()
  }

  submit(e: any, invalid: boolean, model: any): void {
    this.formulario.markAllAsTouched()
    this.formulario.updateValueAndValidity()

    if (invalid) {
      e.preventDefault()
      e.stopPropagation()
      return
    }
    this._empleadoService.registrarPermiso(this.empleado._id, model).subscribe(
      ok => {
        this.guardado.emit()
        this.limpiar()
        this.crearFormulario()
      },
      () => {
        this.cancelar()
      }
    )
  }
  cancelar(): void {
    this.crearFormulario()
    this.limpiar()
  }

  limpiar() {
    this.mostrarOtro = false
    this.motivoValido = -1
    this.select.nativeElement.selectedIndex = 0
    this.selectConGoce.nativeElement.selectedIndex = 0
  }
}
