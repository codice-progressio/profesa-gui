import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import * as moment from 'moment'

@Component({
  selector: 'app-tiempo-transcurrido',
  templateUrl: './tiempo-transcurrido.component.html',
  styleUrls: ['./tiempo-transcurrido.component.css']
})
export class TiempoTranscurridoComponent implements OnInit, OnDestroy {
  private _inicio
  @Input() set inicio(f: Date) {
    this._inicio = f

    this.calculo(f)
  }

  get inicio(): Date {
    return this._inicio
  }

  private intervalo = null

  leyenda: string

  constructor() {}

  ngOnInit(): void {
    this.intervalo = setInterval(() => {
      this.calculo(this._inicio)
    }, 1000)
  }

  ngOnDestroy(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo)
    }
  }

  private calculo(value: Date) {
    /**
     * La fecha actual o fecha de termino
     */
    let fechaActual = moment()
    /**
     * La fecha de la cual se quiere calcular el tiempo transcurrido.
     */
    let fechaDeInicio = moment(value)

    // ESTE SE TIENE QUE CALCULAR COMO <1 POR QUE AL PARECER CUENTA LOS DIAS DESDE 0
    let leyendaDias =
      moment.duration(fechaActual.diff(fechaDeInicio)).days() < 1
        ? 'dia'
        : 'dias'
    // Estos son normales.
    let leyendaMeses =
      moment.duration(fechaActual.diff(fechaDeInicio)).months() === 1
        ? 'mes'
        : 'meses'
    let leyendaAnio =
      moment.duration(fechaActual.diff(fechaDeInicio)).years() === 1
        ? 'año'
        : 'años'

    /**
     * Hacemos el calculo de la diferencia y formateamos la la salida a tipo 1 anio, 2 meses, 3 dias, 04:05:06
     */
    let duration: string = moment
      .duration(fechaActual.diff(fechaDeInicio))
      .format(
        `y [${leyendaAnio}], M [${leyendaMeses}], D [${leyendaDias}], HH:mm:ss`
      )

    this.leyenda = duration
  }
}
