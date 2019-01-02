import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {

  constructor() { }

  /**
   * Ejecuta un retraso atravez de una promesa.
   *
   * @param {number} ms El retrase en milisegundos. 
   * @returns La promesa para ser ejecutada. 
   * @memberof UtilidadesService
   */
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }


  /**
   * Ordena un arreglo de objetos.
   *
   * @param {any []} arreglo Los datos que se quieren arreglar. 
   * @param {string} campo El nombre del campo del objeto que se quiere arreglar. Si no se define este se 
   * automaticamente se descartara el arreglo por objeto y se ordenara un arreglo simple. 
   * @memberof UtilidadesService
   */
  ordenarArreglo ( arreglo: any [], campo: string = null) {
    
    arreglo.sort( (a, b) => {
      const ax = [], bx = [];
      
      if( campo ){
        a[campo].replace(/(\d+)|(\D+)/g, function(_, $1, $2) { ax.push([$1 || Infinity, $2 || '']); });
        b[campo].replace(/(\d+)|(\D+)/g, function(_, $1, $2) { bx.push([$1 || Infinity, $2 || '']); });
        
      } else {
        a.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { ax.push([$1 || Infinity, $2 || '']); });
        b.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { bx.push([$1 || Infinity, $2 || '']); });
      }
  
      while (ax.length && bx.length) {
          const an = ax.shift();
          const bn = bx.shift();
          const nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
          if (nn) {return nn; }
      }
  
      return ax.length - bx.length;
    });
  }


}
