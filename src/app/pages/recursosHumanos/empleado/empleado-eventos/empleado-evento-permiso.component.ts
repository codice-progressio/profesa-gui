import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import { Permiso } from '../../../../models/recursosHumanos/empleados/eventos/permiso.model'
import { ManejoDeMensajesService } from '../../../../services/utilidades/manejo-de-mensajes.service'

@Component({
  selector: 'app-empleado-evento-permiso',
  templateUrl: './empleado-evento-permiso.component.html',
  styles: []
})
export class EmpleadoEventoPermisoComponent implements OnInit {
  mensaje: string = 'Permiso '
  @Input() fecha: Date
  _permiso: Permiso
  @Input() set permiso(permiso: Permiso) {
    this.seleccionarDatos(permiso)
    this._permiso = permiso
  }
  get permiso(): Permiso {
    return this._permiso
  }

  @Output() autorizacion = new EventEmitter<Permiso>()
  @Output() rechazado = new EventEmitter<string>()

  icono: string
  motivo: string
  otroMotivo: string

  datos = {
    porPaternidad: {
      icono: 'fa-baby',
      msj: 'Por paternidad'
    },
    porDefuncion: {
      icono: 'fa-cross',
      msj: 'Por defuncion'
    },
    porMatrimonio: {
      icono: 'fa-grin-hearts',
      msj: 'Por matrimonio'
    },
    paraDesempenarUnCargoDeEleccionPopular: {
      icono: 'fa-vote-yea',
      msj: 'Para desempeñar un cargo de elección popular'
    },
    citaMedica: {
      icono: 'fa-clinic-medical',
      msj: 'Cita con el medico'
    },
    otro: {
      icono: 'fa-question',
      msj: 'Otro motivo'
    }
  }

  constructor(public noti: ManejoDeMensajesService) {}
  ngOnInit() {}
  seleccionarDatos(permiso: Permiso) {
    Object.keys(permiso.motivo).forEach(key => {
      if (this.datos.hasOwnProperty(key))
        if (permiso.motivo[key]) {
          this.icono = this.datos[key].icono
          this.motivo = this.datos[key].msj
          if (key === 'otro') this.otroMotivo = permiso.motivo.otro
        }
    })
  }

  autorizar() {
    this.autorizacion.emit()
  }

  rechazar(event, motivo: string) {
    if (motivo.trim() === '') {
      event.preventDefault()
      event.stopPropagation()
      this.noti.invalido('Debes definir el motivo de rechazo.')

      return
    }
    this.rechazado.emit(motivo)
  }
}
