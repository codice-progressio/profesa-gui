import { Pipe, PipeTransform } from '@angular/core';
import { ModeloCompleto } from '../models/modeloCompleto.modelo';

@Pipe({
  name: 'modeloCompleto'
})
export class ModeloCompletoPipe implements PipeTransform {

  transform(mc: ModeloCompleto): any {
    if ( !mc ) return '';
    return ModeloCompleto.nombreCom(mc);
  }

}
