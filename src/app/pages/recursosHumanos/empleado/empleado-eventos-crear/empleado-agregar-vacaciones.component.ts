import { Component, OnInit } from '@angular/core'
import { EmpleadoService } from '../../../../services/recursosHumanos/empleado.service'
import { Empleado } from 'src/app/models/recursosHumanos/empleados/empleado.model'
import { ManejoDeMensajesService } from '../../../../services/utilidades/manejo-de-mensajes.service'
import {
  FormBuilder,
  Validators} from '@angular/forms'
import { ValidacionesService } from '../../../../services/utilidades/validaciones.service'
import { Vacaciones } from '../../../../models/recursosHumanos/empleados/eventos/vacaciones.model'
import * as moment from 'moment/moment'
import {
  EmpleadoAgregarEventosGeneral,
  iEmpleadoAgregarEventosGeneral
} from './EmpleadoAgregarEventosGeneral'

@Component({
  selector: 'app-empleado-agregar-vacaciones',
  templateUrl: './empleado-agregar-vacaciones.component.html',
  styles: []
})
export class EmpleadoAgregarVacacionesComponent
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

  crearFormulario() {
    this.formulario = this.fb.group(
      {
        desde: [moment(new Date()).format('YYYY-MM-DD'), [Validators.required]],
        hasta: [
          moment()
            .add(15, 'day')
            .format('YYYY-MM-DD'),
          [Validators.required]
        ]
      },
      {
        validator: Validators.compose([this.vs.fechaMenorQue('desde', 'hasta')])
      }
    )
  }

  submit(e, invalid: boolean, model: Vacaciones) {
    this.formulario.updateValueAndValidity()
    if (invalid) {
      e.preventDefault()
      e.stopPropagation()
      return
    }

    this._empleadoService
      .registrarVacaciones(
        this.empleado._id,
        new Date(),
        model.desde,
        model.hasta
      )
      .subscribe(
        () => {
          this.crearFormulario()
          this.guardado.emit()
        },

        err => this.cancelar(err)
      )
  }
  cancelar(err = null) {
    this.crearFormulario()
    if (err) console.error(err)
    this.cancelado.emit()
  }
}
