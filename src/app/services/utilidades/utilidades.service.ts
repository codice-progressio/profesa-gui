import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {

  private campoDeOrdenamiento: string;
  constructor() { }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }


  ordenarArreglo ( arreglo: any [], campo: string) {
    
    arreglo.sort( (a, b) => {
      const ax = [], bx = [];
      
      a[campo].replace(/(\d+)|(\D+)/g, function(_, $1, $2) { ax.push([$1 || Infinity, $2 || '']); });
      b[campo].replace(/(\d+)|(\D+)/g, function(_, $1, $2) { bx.push([$1 || Infinity, $2 || '']); });
  
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
