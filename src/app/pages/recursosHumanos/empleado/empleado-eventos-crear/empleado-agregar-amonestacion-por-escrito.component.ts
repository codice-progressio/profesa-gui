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

import { CargaDeImagenesTransporte } from 'src/app/shared/carga-de-imagenes/carga-de-imagenes-transporte'
import { CargaDeImagenesComponent } from '../../../../shared/carga-de-imagenes/carga-de-imagenes.component'

import * as moment from 'moment'

@Component({
  selector: 'app-empleado-agregar-amonestacion-por-escrito',
  templateUrl: './empleado-agregar-amonestacion-por-escrito.component.html',
  styles: []
})
export class EmpleadoAgregarAmonestacionPorEscritoComponent
  extends EmpleadoAgregarEventosGeneral<Empleado>
  implements OnInit, iEmpleadoAgregarEventosGeneral {
  cargaDeImagenesComponent: CargaDeImagenesComponent
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
    this.formulario = this.fb.group({
      fecha: [
        moment()
          .local()
          .format('YYYY-MM-DD'),
        [Validators.required]
      ],
      documento: ['', [Validators.required]]
    })
  }

  documentoCargado(imgsT: CargaDeImagenesTransporte[]) {
    const c = this.f('documento')

    if (imgsT.length === 0) {
      c.setValue('')
    } else {
      c.setValue(imgsT[0].file)
    }
    c.markAsTouched()
    c.updateValueAndValidity()
  }

  submit(e: any, invalid: boolean, model: any): void {
    this.formulario.markAllAsTouched()
    this.formulario.updateValueAndValidity()

    if (invalid) {
      e.preventDefault()
      e.stopPropagation()
      return
    }

    this._empleadoService
      .registrarAmonestacionPorEscrito(
        this.empleado._id,
        model.documento,
        model.fecha
      )
      .subscribe(ok => {
        this.guardado.emit()
        this.cargaDeImagenesComponent.limpiarParaNuevo()
        this.crearFormulario()
      })
  }
  cancelar(): void {
    this.crearFormulario()
    this.cancelado.emit()
    this.cargaDeImagenesComponent.limpiarParaNuevo()
  }
}
