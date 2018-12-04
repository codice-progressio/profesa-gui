import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PaginadorService {

  actual: number = 1;
  total: number;
  porHoja: number [] = [5, 15, 50];
  limite: number = 5;
  desde: number = 0;
  totalDeElementos = 100;

  callback: any;

  constructor() { 
  }

  cambiarPagina( cambio: number ) {
    
    this.actual += cambio > 0 ? 1 : -1;
    console.log('actual' + this.actual);
    this.desde += cambio;
    
    if (this.desde <= 0) {
      this.desde = 0;
      this.actual = 1;
    }

    this.callback( this.desde, this.limite);
  }

  cambiarCantidad( lim: number ) {
    this.limite = lim;
    // Reiniciamos desde
    this.desde = 0;
    this.actual = 1;
    // Cargamos de nuevo los elementos.
    this.callback( this.desde, this.limite);
    this.calcular();

  }


  calcular () {
    this.total = this.totalDeElementos / this.limite;
    if ( this.total % 1) {
      this.total = Math.ceil(this.total);
      this.total = this.total === 0 ? 1 : this.total;
    }
    // this.actual = 1;
  }

  activarPaginador( total: number  ) {
    this.totalDeElementos = total;
    this.calcular();
  }

}
