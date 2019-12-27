import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { EventosRH } from '../../../../models/recursosHumanos/empleados/eventos/eventosRH.model'
import { Bono } from 'src/app/models/recursosHumanos/empleados/eventos/bono.model'
import { Usuario } from 'src/app/models/usuario.model'
import { Curso } from 'src/app/models/recursosHumanos/cursos/curso.model'
import { Vacaciones } from 'src/app/models/recursosHumanos/empleados/eventos/vacaciones.model'
import { CambiosDeSueldo } from 'src/app/models/recursosHumanos/empleados/eventos/cambiosDeSueldo.model'
import { EventosPuesto } from 'src/app/models/recursosHumanos/empleados/eventos/evento_puesto.model'
import { Puesto } from 'src/app/models/recursosHumanos/puestos/puesto.model'
import { FelicitacionPorEscrito } from 'src/app/models/recursosHumanos/empleados/eventos/felicitacionesPorEscrito.model'
import { AmonestacionPorEscrito } from 'src/app/models/recursosHumanos/empleados/eventos/amonestacionPorEscrito.model'
import { Castigo } from 'src/app/models/recursosHumanos/empleados/eventos/castigo.model'
import { Permiso } from 'src/app/models/recursosHumanos/empleados/eventos/permiso.model'
import { PermisoMotivo } from 'src/app/models/recursosHumanos/empleados/eventos/permisoMotivo.model'
import { EstatusLaboral } from 'src/app/models/recursosHumanos/empleados/eventos/estatusLaboral.model'
import { HistorialDeEventos } from '../../../../models/recursosHumanos/empleados/eventos/historialDeEventos.model'
import { EmpleadoService } from '../../../../services/recursosHumanos/empleado.service'
import { Empleado } from '../../../../models/recursosHumanos/empleados/empleado.model'
import { ManejoDeMensajesService } from '../../../../services/utilidades/manejo-de-mensajes.service'

@Component({
  selector: 'app-empleado-evento-manejador',
  templateUrl: './empleado-evento-manejador.component.html',
  styles: []
})
export class EmpleadoEventoManejadorComponent implements OnInit {
  evento: EventosRH
  private _historialDeEventos
  estasDentro: boolean = false
  @Input() set historialDeEventos(hist: HistorialDeEventos) {
    this.fecha = hist.fechaDeRegistroDeEvento
    this._historialDeEventos = hist
    this.evento = hist.evento
  }

  @Output() autorizacion = new EventEmitter<string>()
  @Output() rechazar = new EventEmitter<{ idHisto: string; motivo: string }>()
  @Output() eliminarEvento = new EventEmitter<string>()

  get historialDeEventos(): HistorialDeEventos {
    return this._historialDeEventos
  }

  fecha: Date

  constructor(private _noti: ManejoDeMensajesService) {}

  ngOnInit() {}

  autorizar() {
    this.autorizacion.emit(this.historialDeEventos._id)
  }

  rechazado(motivo: string) {
    this.rechazar.emit({ idHisto: this.historialDeEventos._id, motivo })
  }

  eliminar() {
    this._noti.confirmacionDeEliminacion(
      'Si eliminas este evento los cambios hasta ahora echos en el kardex del empleado no se reflejaran de manera congruente al faltar informacion. Esto aplica especialmente en eventos donde se hizo un ajuste de sueldo. Aun asi quieres continuar?',
      () => {
        this.eliminarEvento.emit(this._historialDeEventos._id)
      }
    )
  }
}
