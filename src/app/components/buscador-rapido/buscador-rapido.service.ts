import { Injectable, ElementRef } from '@angular/core';
import { BuscadorRapido } from './../buscador-rapido/buscador-rapido';
import { log } from 'util';

@Injectable()
export class BuscadorRapidoService {
  
  nombreDeElemento: string;
  // El nombre del elemento que se va a listar. Este se usa
  // cuando la lista esta vacia y pone una leyanda de tipo "No se a seleccionado ningún XXX ."
  
  mostrarCarga: boolean = false;
  // Muestra el icoo de carga al lado de la leyenda.


  elementos: BuscadorRapido[] = [];
  // Los elementos que se van a mostrar en la lista.

  // seleccionado: string;

  elementoSeleccionado: BuscadorRapido;
  // Rellena el cuadro de elemento seleccionado con esta leyenda.

  
  promesa: any;
  // Debe de contener un callback que retorne una promesa. 

  termino: string = '';
  // El dato que el usuario esta escribiendo en el inp.

  
  tiempoDeEspera: number = 500;
  // Tiempo para comprobar si el usuario ya dejo de escribir. 
  
  cantidadDeCaracteresParaEmpezarBusqueda = 1;
  // La cantidad de caracteres que se van al espera para empezar
  // a ejecutar la funcion de busqueda. 

  totalDeElementosBD: number = 0;
  // El total de registros obtenidos 
  // Este dato se agrega al instanciar la promesa. 

  desde:number = 0;
  // Desde el registrno numero #. Se va sumando 
  // automaticanmente.

  limite: number =5;
  // El intervalo para obtener resgistro
  
  numeroDePaginaActual: number =1;
  // La pagina actual seleccionada
  
  promesaPendiente: boolean = false;
  // Si hay una promesa que se ejecuto 
  // entonces no se vuelve a ejecutar. 0

  // Cantidad de botones para definir intervalos. 
  botones = [5,10,20]

  // Se llama cuando un elemento es seleccionado.
  callbackElementoSeleccionado: any = null;

  // Se llama cuando se da click sobre un elemento de la lista y 
  // este tiene la bandera BuscadorRapido.atenuar = true
  // Si se cumplen las condiciones ejecuta el callback que debe retornar
  // true o false para continuar o no segun lo que se defina dentro del callback.
  callbackAtenuar: any = null;

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
        console.log(`Hay un intervalo?:${!!this.interval}`)
        if( !this.interval){
          this.interval = setInterval( ()=>{
            
            const sonSuficientesCaracteres = this.cantidadDeCaracteresParaEmpezarBusqueda <= this.termino.length
            console.log(`Termino esta vacio?:${this.vacio(this.termino)}`)
            // Si el termino esta vacio no ejecutamos la promesa
            if( this.vacio(this.termino) ){
              console.log('No se ejecuta la promesa.');
              this.limpiarIntervalo();
              this.limpiar();
              return;
            }

            console.log(`Termino tiene suficentes caracteres ${this.cantidadDeCaracteresParaEmpezarBusqueda}?:${sonSuficientesCaracteres}`)
            if( !sonSuficientesCaracteres ){
              this.limpiarIntervalo()
              return;
            }
            console.log(`Esta escribiendo?:${this.estaEscribiendo}`)
            if( !this.estaEscribiendo ) {
              if( !this.promesaPendiente ){
                this.promesaPendiente = true;
                // Ejecutamos la promesa. 
                this.promesa()
                .then( datos => {
                  // Los datos resultantes de la promesa, por 
                  // fuerza debe ser un tipo BuscadorRapido. 
                  // Los cargamos en la lista. 
                  this.elementos =  <BuscadorRapido[]> datos;
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
                console.log(`Hay una promesa pendiente. Borramos el intervalo`)     
                clearInterval(this.interval);
                this.interval = null;
                this.estaEscribiendo =false;
              }
            }else{
              // Ponemos a false para que si ya no escribio y 
              // se ejecuta el intervalo ejecute la promesa.
              this.estaEscribiendo = false;
              console.log('Ponemos en false estaEscribiendo')
            }
          }, this.tiempoDeEspera)

        } else {
          console.log('Hay un intervalo esperando.')
        }

      }catch( err ){
        this.limpiar();
      }
    // }

    
  
  }

  private limpiarIntervalo( ){
    console.log('Limpiando intervalo')
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

  limpiarTodo(){
    // Este se utiliza cuando se inicia el servicio. 
    this.limpiarTodoMenosCallback();
    this.callbackElementoSeleccionado = null;
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
    console.log('siguiente ' + this.desde)
    this.buscarElementos(this.termino);
  }

  seleccionarElemento(ele:BuscadorRapido){
    // Tiene que ser el primero para hacer comprobaciones
    // dentro de los  callback, De todos modos al final lo borramos. 
    this.elementoSeleccionado = ele;

    console.log(` atenuar  existe? ${ele.atenuar}`);
    console.log(`  callback existe? ${this.callbackAtenuar}`);
    if (ele.atenuar && this.callbackAtenuar) {
      if( !this.callbackAtenuar() ){
        console.log(`despues de atenuar? ${'sipo'}`);
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




}