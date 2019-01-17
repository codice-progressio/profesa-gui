import { Injectable, ElementRef } from '@angular/core';
import { BuscadorRapido } from './../buscador-rapido/buscador-rapido';
import { log } from 'util';

@Injectable()
export class BuscadorRapidoService<T> {
  
  /**
   *
   * El nombre del elemento que se va a listar. Este se usa
   * cuando la lista esta vacia y pone una leyanda de tipo "No se a seleccionado ningún XXX ."
   *
   * @type {string}
   * @memberof BuscadorRapidoService
   */
  nombreDeElemento: string;
  
  /**
   *
   * Muestra el icoo de carga al lado de la leyenda.
   *
   * @type {boolean}
   * @memberof BuscadorRapidoService
   */
  mostrarCarga: boolean = false;


  /**
   * Los elementos que se van a mostrar en la lista.
   *
   *
   * @type {BuscadorRapido<T>[]}
   * @memberof BuscadorRapidoService
   */
  elementos: BuscadorRapido<T>[] = [];

  // seleccionado: string;

  /**
   *
   * Rellena el cuadro de elemento seleccionado con esta leyenda.
   * 
   * @type {BuscadorRapido<T>}
   * @memberof BuscadorRapidoService
   */
  elementoSeleccionado: BuscadorRapido<T>;

  
  /**
   *Debe de contener un callback que retorne una promesa. 
   * 
   *
   * @type {*}
   * @memberof BuscadorRapidoService
   */
  promesa: any;

  /**
   * El dato que el usuario esta escribiendo en el inp.
   *
   *
   * @type {string}
   * @memberof BuscadorRapidoService
   */
  termino: string = '';

  
  /**
   * Tiempo para comprobar si el usuario ya dejo de escribir. 
   *
   *
   * @type {number}
   * @memberof BuscadorRapidoService
   */
  tiempoDeEspera: number = 500;
  
  /**
   * La cantidad de caracteres que se van al espera para empezar
   * a ejecutar la funcion de busqueda. 
   *
   *
   * @memberof BuscadorRapidoService
   */
  cantidadDeCaracteresParaEmpezarBusqueda = 1;

  /**
   * El total de registros obtenidos 
   * Este dato se agrega al instanciar la promesa. 
   *
   *
   * @type {number}
   * @memberof BuscadorRapidoService
   */
  totalDeElementosBD: number = 0;

  /**
   * Desde el registrno numero #. Se va sumando 
   * automaticanmente.
   *
   *
   * @type {number}
   * @memberof BuscadorRapidoService
   */
  desde:number = 0;
  
  
  /**
   * El intervalo para obtener resgistro
   *
   *
   * @memberof BuscadorRapidoService
   */

  limite: number =5;
  
  /**
   La pagina actual seleccionada
   * 
   *
   * @type {number}
   * @memberof BuscadorRapidoService
   */
  numeroDePaginaActual: number =1;
  
  /**
   *    Si hay una promesa que se ejecuto 
   entonces no se vuelve a ejecutar. 0

   *
   * @type {boolean}
   * @memberof BuscadorRapidoService
   */
  promesaPendiente: boolean = false;

  /**
   Cantidad de botones para definir intervalos. 
   * 
   *
   * @memberof BuscadorRapidoService
   */
  botones = [5,10,20]

  /**
   * 
   * Se llama cuando un elemento es seleccionado.
   *
   * @type {*}
   * @memberof BuscadorRapidoService
   */
  callbackElementoSeleccionado: any = null;

  // Se llama cuando se da click sobre un elemento de la lista y 
  // este tiene la bandera BuscadorRapido.atenuar = true
  // Si se cumplen las condiciones ejecuta el callback que debe retornar
  // true o false para continuar o no segun lo que se defina dentro del callback.
  callbackAtenuar: any = null;
  
  /**
   * Se llama al eliminar el elemento seleccionado. 
   *
   * @memberof BuscadorRapidoService
   */
  callbackEliminar: any = null;


  constructor() { 
  
  }

  private vacio( termino:string ){
     return termino.replace(/^\s+/, '').replace(/\s+$/, '')==='';
  }

  private interval = null;
  private estaEscribiendo = false;

  buscar( valor:string ){
    this.limpiarPaginador();
    this.buscarElementos( valor );
  }
  private buscarElementos( valor:string ){
    this.estaEscribiendo = true;
    
    this.termino = valor;
 
    this.mostrarCarga = true;
    // Si esta esperando no entramos a 
    // ejecutar la promesa. 
    // if( !this.esperandoEscritura ){
      try{
        // Entro por que no estaba esperando, asignamos 
        // true para que espera y no mande multiples solicitudes. 
        // this.esperandoEscritura = true;
        //Lo ponemos a esperar.
        if( !this.interval){
          this.interval = setInterval( ()=>{
            
            const sonSuficientesCaracteres = this.cantidadDeCaracteresParaEmpezarBusqueda <= this.termino.length
            // Si el termino esta vacio no ejecutamos la promesa
            if( this.vacio(this.termino) ){
              console.log('No se ejecuta la promesa.');
              this.limpiarIntervalo();
              this.limpiar();
              return;
            }

            if( !sonSuficientesCaracteres ){
              this.limpiarIntervalo()
              return;
            }
            if( !this.estaEscribiendo ) {
              if( !this.promesaPendiente ){
                this.promesaPendiente = true;
                // Ejecutamos la promesa. 
                this.promesa()
                .then( datos => {
                  // Los datos resultantes de la promesa, por 
                  // fuerza debe ser un tipo BuscadorRapido. 
                  // Los cargamos en la lista. 
                  this.elementos =  <BuscadorRapido<T>[]> datos;
                  console.log(this.elementos )
                  // Ojo con este, no se me te a limpiar.
                  this.promesaPendiente = false;
                  // Una vez ejecutada la funcion quitamos la espera. 
                  this.limpiarIntervalo();
                 
                }).catch( err =>{
                  console.error(err)
                  this.limpiar();
                })
              }else{
                clearInterval(this.interval);
                this.interval = null;
                this.estaEscribiendo =false;
              }
            }else{
              // Ponemos a false para que si ya no escribio y 
              // se ejecuta el intervalo ejecute la promesa.
              this.estaEscribiendo = false;
            }
          }, this.tiempoDeEspera)

        }

      }catch( err ){
        this.limpiar();
      }
  }

  private limpiarIntervalo( ){
    // Solo limpia lo necesario para un intervalo. No usar el otro limpiar 
    // pues borra todo. 
    this.mostrarCarga= false
    clearInterval(this.interval);
    this.interval = null;
    this.estaEscribiendo =false;
    
  }

  private limpiar( ) {
    
    this.termino = '';
    this.elementos = []
    this.mostrarCarga = false;
    this.interval = null;
    this.estaEscribiendo = false;

  }

  private limpiarPaginador(){
  this.numeroDePaginaActual = 1;
    this.desde = 0;
  }

  /**
   *Limpia todo, absolutamente todo. 
   *
   * @memberof BuscadorRapidoService
   */
  limpiarTodo(){
    // Este se utiliza cuando se inicia el servicio. 
    this.limpiarTodoMenosCallback();
    this.callbackEliminar = null;
    this.callbackElementoSeleccionado = null;
  }

  /**
   * Elimina el elemento seleccionado y ejecuta el callbackEliminar.
   *
   * @memberof BuscadorRapidoService
   */
  limpiarSeleccionado (){
    this.limpiarTodoMenosCallback()
    if( this.callbackEliminar) this.callbackEliminar();

  }

  

  limpiarTodoMenosCallback(){
    // Este se utiliza cunado se guarda, no borra 
    // el callback de elementoSeleccionado.
    this.limpiar();
    this.limpiarIntervalo();
    this.limpiarPaginador()
    this.elementoSeleccionado = null;
  }

  modificarCantidadDeRegistrosAMostrar( c: number){
    this.limite = c;
    this.limpiarPaginador();
    this.buscarElementos(this.termino);
  }

  obtenerPagina(){
    let a = this.totalDeElementosBD / this.limite;
    a = Math.trunc(a);
    return a<1?  1:a;
  }

  siguiente(){
    this.numeroDePaginaActual++;
    this.moverPagina();
  }

  anterior(){
    this.numeroDePaginaActual--;
    this.moverPagina();
  }

  moverPagina() {
    this.numeroDePaginaActual = this.numeroDePaginaActual> this.obtenerPagina()? this.obtenerPagina() :this.numeroDePaginaActual
    this.numeroDePaginaActual = 1 > this.numeroDePaginaActual ? 1 :this.numeroDePaginaActual
       
    
    this.desde = this.limite*this.numeroDePaginaActual;
    this.buscarElementos(this.termino);
  }

  /**
   * Muestra como seleccionado el elemento que se le pasa como parametro. 
   *
   * @param {BuscadorRapido} ele
   * @returns
   * @memberof BuscadorRapidoService
   * @deprecated addElementoSeleccionado que retorna en modo notacion. 
   */
  seleccionarElemento(ele:BuscadorRapido<T>){
    // <!-- 
    // =====================================
    //  NO ELIMINAR ESTA FUNCION AUNQUE SEA DEPRECATED. 
    // =====================================
    // -->
    // La seguimos usuando ded manera interna pero con una que 
    // provee mas comodidad.
    // <!-- 
    // =====================================
    //  END NO ELIMINAR ESTA FUNCION AUNQUE SEA DEPRECATED. 
    // =====================================
    // -->


    // Tiene que ser el primero para hacer comprobaciones
    // dentro de los  callback, De todos modos al final lo borramos. 
    this.elementoSeleccionado = ele;
    if (ele.atenuar && this.callbackAtenuar) {
      if( !this.callbackAtenuar() ){
        // Si el callback retorna false entonces
        // no seleccionamos nada y dejamos todo como estaba.
        this.limpiarTodoMenosCallback();
        return;
      };
    }
    

    if( this.callbackElementoSeleccionado ){
      this.callbackElementoSeleccionado();
    }
    this.limpiar();
    this.limpiarPaginador();
    this.limpiarIntervalo();
    
  }

  /**
   *Anade un elemento seleccionado al buscador rapido. 
   *
   * @returns {BuscadorRapido<T>}
   * @memberof BuscadorRapidoService
   */
  addElementoSeleccionado():BuscadorRapido<T> {
  
    // let a = new BuscadorRapido<T>();
    // this.seleccionarElemento(a);
    return this.elementoSeleccionado;
  }

}