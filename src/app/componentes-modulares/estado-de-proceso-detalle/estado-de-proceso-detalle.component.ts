import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { EstadoDeProceso } from '../estado-de-proceso/estado-de-proceso.model'
import { DateTime, Duration } from 'luxon'

@Component({
  selector: 'app-estado-de-proceso-detalle',
  templateUrl: './estado-de-proceso-detalle.component.html',
  styleUrls: ['./estado-de-proceso-detalle.component.css']
})
export class EstadoDeProcesoDetalleComponent implements OnInit, OnDestroy {
  @Input() datos: EstadoDeProceso[] = []

  intervalos = {}
  horas = {}

  constructor() {}

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.destruirTemporizadores()
  }

  temporizador(estado: EstadoDeProceso, i: number) {
    if (this.intervalos[i]) return false

    this.horas[i] = this.calcularTiempoTranscurrido(
      undefined,
      DateTime.fromJSDate(new Date(estado.hora_inicio))
    )
    this.intervalos[i] = setInterval(() => {
      this.horas[i] = this.calcularTiempoTranscurrido(
        undefined,
        DateTime.fromJSDate(new Date(estado.hora_inicio))
      )
    }, 1000)
  }

  destruirTemporizadores() {
    Object.values(this.intervalos).forEach(x => {
      clearInterval(x as number)
    })
  }

  tiempoTranscurrido(estado) {
    return this.calcularTiempoTranscurrido(
      DateTime.fromJSDate(new Date(estado.hora_final)),
      DateTime.fromJSDate(new Date(estado.hora_inicio))
    )
  }

  private calcularTiempoTranscurrido(
    fechaLimiteSuperior: DateTime = DateTime.now(),
    fechaLimiteInferior: DateTime
  ) {
    const diff = fechaLimiteSuperior.diff(fechaLimiteInferior, [
      'years',
      'months',
      'days',
      'hours'
    ])

    let leyendaDias = diff.days < 1 ? 'dia' : 'dias'
    // Estos son normales.
    let leyendaMeses = diff.months === 1 ? 'mes' : 'meses'
    let leyendaAnio = diff.years === 1 ? 'año' : 'años'

    let cadenaFormato = diff.years ? `y '${leyendaAnio}',` : ''
    cadenaFormato += diff.months ? `M '${leyendaMeses}', ` : ''
    cadenaFormato += diff.days ? `d '${leyendaDias}' , ` : ''
    cadenaFormato += ` hh:mm:ss`

    return diff.toFormat(cadenaFormato)
  }
}
