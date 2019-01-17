import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

/**
 * Controla los datos de un paginador.component para hacer
 * consultas paginadas. 
 * 
 * Para inicializarlo es neceario definir un callback que se llamara
 * cada vez que se cambie de pagina o se modifique la cantidad de elementos
 * que se quieren mostrar. Este servicio se encargara de gestionar el envio 
 * automaticamente a todos los servicios que extiendan desde la clase CRUD
 * por la inyeccion de dependencias. Si se quiere mas de un paginador por componente
 * es necesario que se creen nuevas instancias del servicio para que no se crucen los
 * datos.
 *
 * @export
 * @class PaginadorService
 */
@Injectable({
  providedIn: 'root'
})
export class PaginadorService {

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
  totalDeElementos = 0;

  /**
   * El callback que se va a ejecutar al cambiar de pagina. 
   * 
   * Normalmente se ejecuta la misma funcion que carga los elementos 
   * para mostrarlos en la lista. 
   *
   * @type {*}
   * @memberof PaginadorService
   */
  callback: any;

  constructor() { 
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
