import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/red.css',
    tema: 'red'
  };


  constructor( @Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
   }


  guardarAjustes() {
    // console.log('Guardado en el local storage');
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes () {
    if ( localStorage.getItem('ajustes') ) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      // console.log('Cargando de localStorage');
      this.aplicarTema( this.ajustes.tema);
    } else {
      // console.log('Usando valores por defecto.');
      this.aplicarTema( this.ajustes.tema);

    }
  }

  aplicarTema( tema: string ) {
    // console.log('tema:' + tema);

    const url: string = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema').setAttribute('href', url);
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    this.guardarAjustes();
  }
}


interface Ajustes {
  temaUrl: string;
  tema: string;
}
