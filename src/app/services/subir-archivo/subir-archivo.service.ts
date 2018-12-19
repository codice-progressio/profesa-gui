import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  // Sirve para guardar cualquier fichero
  subirArchivo (archivo: File, tipo: string, id: string) {

    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, reject) => {
      // Vanilla JS
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append( 'imagen', archivo, archivo.name);
      xhr.onreadystatechange = () => {
        if ( xhr.readyState === 4 ) {
          if ( xhr.status === 200 ) {
            // console.log('imagen subida');
            resolve(JSON.parse(xhr.response));
          } else {
            // console.log('Fallo la subida.');
            reject(JSON.parse(xhr.response));

          }
        }
      };

      const url = URL_SERVICIOS + `/upload/${ tipo }/${ id }`;
      xhr.open('PUT', url, true);
      xhr.send(formData);
    });



  }
}
