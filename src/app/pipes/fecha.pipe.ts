import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(fecha: string, formato: string = 'dddd LL' ): any {
    moment.locale('es');
    return moment(fecha).format(formato).toString();

  }

}
