import { Component, OnInit } from '@angular/core'
import {
  EmpleadoAgregarEventosGeneral,
  iEmpleadoAgregarEventosGeneral
} from './EmpleadoAgregarEventosGeneral'
import { Empleado } from 'src/app/models/recursosHumanos/empleados/empleado.model'
import { EmpleadoService } from 'src/app/services/recursosHumanos/empleado.service'
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service'
import { FormBuilder, Validators } from '@angular/forms'
import { ValidacionesService } from 'src/app/services/utilidades/validaciones.service'

import * as moment from 'moment'
import { EstatusLaboral } from '../../../../models/recursosHumanos/empleados/eventos/estatusLaboral.model'

@Component({
  selector: 'app-empleado-agregar-estatus-laboral',
  templateUrl: './empleado-agregar-estatus-laboral.component.html',
  styles: []
})
export class EmpleadoAgregarEstatusLaboralComponent
  extends EmpleadoAgregarEventosGeneral<Empleado>
  implements OnInit, iEmpleadoAgregarEventosGeneral {
  
  
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
        opcion: [null, [Validators.required]],
        observaciones: ['', [Validators.required, Validators.minLength(10)]],
        fechaInicioIncapacidad: [
          moment()
            .local()
            .format('YYYY-MM-DD'),
          [Validators.required]
        ],
        fechaFinalizacionIncapacidad: [
          moment()
            .local()
            .add(3, 'day')
            .format('YYYY-MM-DD'),
          [Validators.required]
        ]
      }
      ,
      {
        validator: Validators.compose([
          this.vs.fechaMenorQue(
            'fechaInicioIncapacidad',
            'fechaFinalizacionIncapacidad'
          )
        ])
      }
    )
  }
  submit(e: any, invalid: boolean, model: EstatusLaboral): void {
    this.formulario.markAllAsTouched()
    this.formulario.updateValueAndValidity()

    if (invalid) {
      e.preventDefault()
      e.stopPropagation()
      return
    }

    this.operacionSeleccionada(model)
  }

  observacionesIndependientes: string = ''

  baja() {
    this._empleadoService
      .registrarEstatusLaboral_baja(this.empleado._id, this.observacionesIndependientes)
      .subscribe(
        resp => this.accionesRespuesta(resp),
        err => this.accionesError()
      )
  }
  reingreso() {
    this._empleadoService
      .registrarEstatusLaboral_reingreso(this.empleado._id, this.observacionesIndependientes)
      .subscribe(
        resp => this.accionesRespuesta(resp),
        err => this.accionesError()
      )
  }

  enfermedadGeneral: boolean = false
  riesgoDeTrabajo: boolean = false
  maternidad: boolean = false
  operacionSeleccionada: any

  private reiniciarIncapacidades() {
    this.enfermedadGeneral = false
    this.riesgoDeTrabajo = false
    this.maternidad = false
  }
  seleccionarIncapacidad(
    incapacidad: 'enfermedadGeneral' | 'riesgoDeTrabajo' | 'maternidad'
  ) {
    this.reiniciarIncapacidades()
    this.f('opcion').setValue(incapacidad)
    this[incapacidad] = true
    this.operacionSeleccionada = this[incapacidad + '_cb']
  }

  enfermedadGeneral_cb = (model: EstatusLaboral) => {
    this._empleadoService
      .registrarEstatusLaboral_incapacidad_enfermedadGeneral(
        this.empleado._id,
        model
      )
      .subscribe(
        respuesta => this.accionesRespuesta(respuesta),
        err => this.accionesError()
      )
  }
  riesgoDeTrabajo_cb = (model: EstatusLaboral) => {
    this._empleadoService
      .registrarEstatusLaboral_incapacidad_riesgoDeTrabajo(
        this.empleado._id,
        model
      )
      .subscribe(
        respuesta => this.accionesRespuesta(respuesta),
        err => this.accionesError()
      )
  }
  maternidad_cb = (model: EstatusLaboral) => {
    this._empleadoService
      .registrarEstatusLaboral_incapacidad_maternidad(this.empleado._id, model)
      .subscribe(
        respuesta => this.accionesRespuesta(respuesta),
        err => this.accionesError()
      )
  }

  accionesRespuesta(respuesta: boolean) {
    this.guardado.emit()
    this.limpiar()
    this.crearFormulario()
  }

  accionesError() {
    this.cancelar()
    this.cancelado.emit()
  }

  limpiar() {
    this.reiniciarIncapacidades()
    this.observacionesIndependientes = ''
  }

  cancelar(): void {
    this.limpiar()
    this.crearFormulario()
  }
}
