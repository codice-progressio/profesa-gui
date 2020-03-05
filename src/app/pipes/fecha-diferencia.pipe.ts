import { Pipe, PipeTransform } from '@angular/core'
import * as moment from 'moment'

@Pipe({
  name: 'fechaDiferencia'
})
export class FechaDiferenciaPipe implements PipeTransform {
  transform(inicio: Date, final: Date = new Date(), corto = true): unknown {
    const leyendas = {
      segundos: {
        singular: corto ? 's' : ' segundo',
        plural: corto ? 's' : ' segundos'
      },
      minutos: {
        singular: corto ? 'm' : ' minuto',
        plural: corto ? 'm' : ' minutos'
      },
      horas: {
        singular: corto ? 'h' : ' hora',
        plural: corto ? 'h' : ' horas'
      },
      dias: { singular: 'dia', plural: 'dias' },
      meses: { singular: 'mes', plural: 'meses' },
      anios: { singular: 'año', plural: 'años' }
    }

    /**
     * La fecha actual o fecha de termino
     */
    let fin = moment(final)
    /**
     * La fecha de la cual se quiere calcular el tiempo transcurrido.
     */
    let ini = moment(inicio)

    let segundos =
      moment.duration(fin.diff(ini)).seconds() === 1
        ? leyendas.segundos.singular
        : leyendas.segundos.plural
    let minutos =
      moment.duration(fin.diff(ini)).minutes() === 1
        ? leyendas.minutos.singular
        : leyendas.minutos.plural
    let horas =
      moment.duration(fin.diff(ini)).hours() === 1
        ? leyendas.horas.singular
        : leyendas.horas.plural
    // ESTE SE TIENE QUE CALCULAR COMO <1 POR QUE AL PARECER CUENTA LOS DIAS DESDE 0
    let dias =
      moment.duration(fin.diff(ini)).days() < 1
        ? leyendas.dias.singular
        : leyendas.dias.plural
    // Estos son normales.
    let meses =
      moment.duration(fin.diff(ini)).months() === 1
        ? leyendas.meses.singular
        : leyendas.meses.plural
    let anio =
      moment.duration(fin.diff(ini)).years() === 1
        ? leyendas.anios.singular
        : leyendas.anios.plural

    let diasT = moment.duration(fin.diff(ini)).days()
    let mesesT = moment.duration(fin.diff(ini)).months()
    let anioT = moment.duration(fin.diff(ini)).years()

    /**
     * Hacemos el calculo de la diferencia y formateamos la la salida a tipo 1 anio, 2 meses, 3 dias, 04:05:06
     */

    const formatearFecha = `y [${anio}], M [${meses}], D [${dias}], `.concat(
      !anioT && !mesesT && !diasT
        ? `H[${horas}], m[${minutos}] , s[${segundos}]`
        : 'HH:mm:ss'
    )

    let duration: string = moment.duration(fin.diff(ini)).format(formatearFecha)

    return duration
  }
}
