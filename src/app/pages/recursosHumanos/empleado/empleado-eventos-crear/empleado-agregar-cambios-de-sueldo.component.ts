import { Component, OnInit } from '@angular/core'
import {
  EmpleadoAgregarEventosGeneral,
  iEmpleadoAgregarEventosGeneral
} from './EmpleadoAgregarEventosGeneral'
import { Empleado } from 'src/app/models/recursosHumanos/empleados/empleado.model'
import { EmpleadoService } from 'src/app/services/recursosHumanos/empleado.service'
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service'
import { FormBuilder, Validators } from '@angular/forms'
import { ValidacionesService } from '../../../../services/utilidades/validaciones.service'
import { CambiosDeSueldo } from '../../../../models/recursosHumanos/empleados/eventos/cambiosDeSueldo.model'

@Component({
  selector: 'app-empleado-agregar-cambios-de-sueldo',
  templateUrl: './empleado-agregar-cambios-de-sueldo.component.html',
  styles: []
})
export class EmpleadoAgregarCambiosDeSueldoComponent
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
    this.formulario = this.fb.group({
      aumento: [
        this.empleado.sueldoActual,
        [
          Validators.min(this.empleado.sueldoActual),
          Validators.max(this.empleado.puestoActual.sueldoMaximo),
          this.vs.numberValidator
        ]
      ],
      observaciones: ['', null]
    })
  }

  submit(e, invalid, model: CambiosDeSueldo): void {
    this.formulario.markAllAsTouched()
    this.formulario.updateValueAndValidity()

    if (invalid) {
      e.preventDefault()
      e.stopPropagation()
      return
    }

    this._empleadoService
      .registrarSueldo(this.empleado._id, model.aumento, model.observacion)
      .subscribe(ok => {
        this.guardado.emit()
        this.crearFormulario()
      })
  }



  cancelar(): void {
    this.crearFormulario()
  }




  
}
