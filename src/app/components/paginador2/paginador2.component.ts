import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginador2',
  templateUrl: './paginador2.component.html',
  styles: []
})
export class Paginador2Component implements OnInit {
  
  @Output() esperaDeTotal = new EventEmitter<Promise<any>>()
  ngOnInit(): void {
 

  }

  /**
   * La pagina actual que se esta mostrando. Se utiliza
   * para calcular el skip.(desde).
   *
   * @type {number}
   * @memberof PaginadorService
   */
  actual: number = 1;
  /**
   * El total de paginas calculdas por el paginador. 
   *
   * @type {number}
   * @memberof PaginadorService
   */
  total: number;
  /**
   * Los valores por defecto que el paginador 
   * va a mostrar para el tamano de las paginas. 
   *
   * @type {number []}
   * @memberof PaginadorService
   */
  porHoja: number [] = [5, 15, 50];
  /**
   *El numero maximo de elementos por pagina. 
   *
   * @type {number}
   * @memberof PaginadorService
   */
  limite: number = 5;
  /**
   * Desde donde va a mandar el pagindor al servicio la 
   * opcion de skip para obtener elementos de la bd. 
   *
   * @type {number}
   * @memberof PaginadorService
   */
  desde: number = 0;
  /**
   * El total de elementos de la BD. Sirve para calcular 
   * las paginas. 
   *
   * @memberof PaginadorService
   */
  @Input() totalDeElementos = 0;

  /**
   * El callback que se va a ejecutar al cambiar de pagina. 
   * 
   * Normalmente se ejecuta la misma funcion que carga los elementos 
   * para mostrarlos en la lista. 
   *
   * @type {*}
   * @memberof PaginadorService
   */
  @Input() callback: any;


  @Output()  cambioDesde: EventEmitter<number> = new EventEmitter()
  @Output()  cambioLimite: EventEmitter<number> = new EventEmitter()

  constructor() { 
       
    this.esperaDeTotal.emit( new Promise( (resolve, reject)=>{
      this.activarPaginador( this.total )
      console.log( 'esta dentro de la promesa ')
      return resolve(2)
   }))
  }

  /**
   * Ejecuta el callback con una prueba de null. 
   * Si esta nulo tira un error. 
   *
   * @memberof PaginadorService
   */
  private ejecutarCallback(){
    if(! this.callback ){
      throw "No definiste un callback para el pagindorService.";
    }
    this.callback();
  }

  /**
   * Cambia la pagina.
   *
   * @param {number} cambio El numero que se va a sumar para el cambio. 
   * @memberof PaginadorService
   */
  cambiarPagina( cambio: number ) {
    
    this.actual += cambio > 0 ? 1 : -1;
    this.desde += cambio;
    
    if (this.desde <= 0) {
      this.desde = 0;
      this.actual = 1;
    }
    this.ejecutarCallback();

    this.emitirCambios()

  }

  emitirCambios(){
    this.cambioDesde.emit( this.desde)
    this.cambioLimite.emit( this.limite)
  }

  /**
   * Cambia el limite de elementos por pagina. 
   *
   * @param {number} lim El limite que se quiere poner. 
   * @memberof PaginadorService
   */
  cambiarCantidad( lim: number ) {
    this.limite = lim;
    // Reiniciamos desde
    this.desde = 0;
    this.actual = 1;
    // Cargamos de nuevo los elementos.
    this.callback( );
    this.ejecutarCallback();
    this.calcular();
    
    this.emitirCambios()
  }


  /**
   * Calcula el total de paginas en base a los datos
   * totalDeElementos y limite. 
   *
   * @memberof PaginadorService
   */
  calcular () {
    this.total = this.totalDeElementos / this.limite;
    if ( this.total % 1) {
      this.total = Math.ceil(this.total);
      this.total = this.total === 0 ? 1 : this.total;
    }
    // this.actual = 1;
  }

  /**
   * Activa el paginador
   *
   * @param {number} total El total de elementos de la BD. 
   * @memberof PaginadorService
   */
  activarPaginador( total: number  ) {
    this.totalDeElementos = total;
    this.calcular();


  }


}
