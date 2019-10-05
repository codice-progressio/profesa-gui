import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + `/img`;
    if (!img) {
      return url + '/noimg';
    }

    if (img.indexOf('https') >= 0 ) {
      return img;
    }
    // console.log(' Tipo de imágen. ' + tipo);

    switch ( tipo ) {
      case 'usuario':
        url += '/usuarios/' + img;
        break;
      case 'facturas':
        url += '/facturas/' + img;
        break;
      default:
        console.log('No existe el tipo de imagen.');
        url += '/noimg';
        break;
    }
    return url;
  }

}
