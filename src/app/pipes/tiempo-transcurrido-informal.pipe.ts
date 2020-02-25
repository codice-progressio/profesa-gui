import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'
@Pipe({
  name: 'tiempoTranscurridoInformal',
  pure: false
})
export class TiempoTranscurridoInformalPipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): string {
    moment.locale('es')
    return moment(value).fromNow()
  }

}
