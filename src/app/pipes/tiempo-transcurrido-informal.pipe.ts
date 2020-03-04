import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'
@Pipe({
  name: 'tiempoTranscurridoInformal',
  pure: false
})
export class TiempoTranscurridoInformalPipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): string {
    moment.locale('es')
    const final = args.pop()

    return !final ? moment(value).fromNow() : moment(value).from(final)
  }

}
