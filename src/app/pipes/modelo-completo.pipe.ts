import { Pipe, PipeTransform } from '@angular/core';
import { ModeloCompleto } from '../models/modeloCompleto.modelo';

@Pipe({
  name: 'modeloCompleto'
})
export class ModeloCompletoPipe implements PipeTransform {

  transform(mc: ModeloCompleto): any {
    return ModeloCompleto.nombreCom(mc);
  }

}
