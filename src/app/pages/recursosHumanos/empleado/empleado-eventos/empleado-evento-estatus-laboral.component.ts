import { Component, OnInit, Input } from '@angular/core'
import { EstatusLaboral } from '../../../../models/recursosHumanos/empleados/eventos/estatusLaboral.model'

@Component({
  selector: 'app-empleado-evento-estatus-laboral',
  templateUrl: './empleado-evento-estatus-laboral.component.html',
  styles: []
})
export class EmpleadoEventoEstatusLaboralComponent implements OnInit {
  mensaje: string = 'Estatus laboral'
  @Input() fecha: Date
  _estatusLaboral: EstatusLaboral
  icono: string
  estatus: string
  observaciones: string

  @Input() set estatusLaboral(es: EstatusLaboral) {
    this.seleccionarDatos(es)
    this.observaciones = es.observaciones
    this._estatusLaboral = es
  }

  get estatusLabora(): EstatusLaboral {
    return this._estatusLaboral
  }

  ngOnInit() {}

  datos = {
    alta: { msj: 'Alta', icono: 'fa-user-check' },
    baja: { msj: 'Baja', icono: 'fa-user-slash' },
    reingreso: { msj: 'Reingreso', icono: 'fa-user-tag' },
    incapacidadEnfermedadGeneral: {
      msj: 'Incapacidad por enfermedad general',
      icono: 'fa-user-md'
    },
    incapacidadRiesgoDeTrabajo: {
      msj: 'Incapacidad por riesgo de trabajo',
      icono: 'fa-user-injured'
    },
    incapacidadMaternidad: {
      msj: 'Incapacidad por maternidad',
      icono: 'fa-heart'
    }
  }

  seleccionarDatos(es: EstatusLaboral) {
    Object.keys(es).forEach(key => {
      if (this.datos.hasOwnProperty(key)) {
        if (es[key]) {
          this.estatus = this.datos[key].msj
          this.icono = this.datos[key].icono
        }
      }
    })
  }
}
