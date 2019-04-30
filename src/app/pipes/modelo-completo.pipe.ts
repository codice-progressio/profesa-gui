import { Pipe, PipeTransform } from '@angular/core';
import { ModeloCompleto } from '../models/modeloCompleto.modelo';

/**
 *Este pipe transforma un modelo completo 
 a un strin con el formato correcto para 
 imprimirlo en pantalla. 
 *
 * @export
 * @class ModeloCompletoPipe
 * @implements {PipeTransform}
 */
@Pipe({
  name: 'modeloCompleto'
})
export class ModeloCompletoPipe implements PipeTransform {

  transform(mc: ModeloCompleto): any {
    if ( !mc ) return '';
    return ModeloCompleto.nombreCom(mc);
  }

}
