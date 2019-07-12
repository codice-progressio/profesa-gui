import { Component, OnInit, Input , EventEmitter, Output} from '@angular/core';
import { Observable, throwError, Subscription } from "rxjs"

@Component({
  selector: 'app-buscador-paciente',
  templateUrl: './buscador-paciente.component.html'
})
export class BuscadorPacienteComponent<T> implements OnInit {

  private ob = Object
  /**
   * El termino que se quiere buscar.
   */
  termino: string = null

  /**Emitimos el termino para que se pueda acceeder a el desde cualquier lado.
   * 
   */
  @Output() terminoPublico = new EventEmitter<string>()

  /**
   * Bandera para cambiar de icono a busqueda o spinner.
   */
  buscando: boolean = false

  /**
   * Bandera que cuando se pone en true y se revisa se ejecuta la busqueda.
   */
  ejecutarBusqueda: boolean = false

  /**
   * El tiempo minimo que durara la esparera antes de que se ejecute la busqueda.
   */
  @Input() tiempoDeEspera: number = 1500
  

  /**
   * Almacena el intervalo que gestiona la llamada a la promesa.
   */
  intervalo: any = null

  /**
   * Define el tiempo maximo de espera para realizar la llamada a la 
   * promesa. Esta en milisegundos y por defecto son 10000.
   */
  @Input() tiempoMaximoDeEspera: number = 10000
  /**
   * Este es el observable que se va a llamar despues de la espera 
   * definida. 
   */
  @Input() observable: Observable<T> = null
  @Input() cbObservable: any
  /**
   * Cuando el observable termina se emite el resultado en este evento
   * obteniendo solo los tados segun el tipo T que se defina. 
   */
  @Output() resultado  = new EventEmitter<T>()
  /**
   * Si el evento se cancela se emite el error. 
   */
  @Output() cancelado  = new EventEmitter<null>()
  /**
   * Emite un error y la razon por la cual pasa para ser capturados. 
   * 
   */
  @Output() error  = new EventEmitter<string>()


  /**
   * Muestra datos para debugueo.
   */
  @Input() debug: boolean = false
  /**
   * El intervalo para medir el tiempo en modo debug. 
   */
  debug_intervalo: any = null
  /**El intervalo para medir el tiempo de cancelacion en modo debug.
   * 
   */
  debug_intervaloCancelacion: any = null
  /**
   * Contador para saber cuando tiempo nos queda antes de ejecutar la promesa.
   */
  debug_tiempoRestante: number = this.tiempoDeEspera
  /**
   * El tiempo que falta para ejecutar la cancelacion. 
   */
  debug_tiempoRestanteCancelacion: number = this.tiempoMaximoDeEspera

  /**La subscripcion que se crea cuando se ejecuta el Observable
   * 
   */
  subscription: Subscription = null

  /**El timeOut para ejecutar la cancelacion . Se guarda asi por que se debe hacer un clearTimeout si la promesa se ejecuto correctamente.
   * 
   */
  timeoutCancelacion = null 

 

  constructor() { }

  ngOnInit() {
  }

  
  /**
   * Ejecuta la busqueda del termino si no esta vacio. 
   */
  buscar( termino: string ){
    //Asignamos el termino recortando espacios
    this.termino = termino.trim()
    //Emitimos el termino. 
    this.terminoPublico.emit(termino)

    //Comprobaciones
    this.comprobaciones()

    //Llegados a este punto puede que haya un error y 
    //que este una subscripcion pendiente. Si es el 
    //caso la eliminamos. 
    if( this.subscription ) this.unsubscribeCompleto()
    
    // Tiene que haber texto en el termino, de otra manera no 
    // no tiene sentido que ejecutemos este codigo. 
    if( this.termino){
      // Decimos que si estamos buscando.
      this.buscando = true
      this.ejecutarBusqueda = true
      this.debug_tiempoRestante = this.tiempoDeEspera
      this.debug_tiempoRestanteCancelacion = this.tiempoMaximoDeEspera

      //Comprobamos si ya existe el intervalo que se encarga de 
      //ejecutar la
      if( !this.intervalo) {
        this.ejecutarIntervalo()
      } else {
        this.limpiarBuscador()
        this.ejecutarIntervalo()
      }

    } else {
      // Como no tenemos texto limpiamos. 
      this.limpiarBuscador()
      // El debug tambien
      this.debug_limpiar()
      // Ponemos en false la bandera. 
      this.buscando = false
      //Emitimos un evento de cancelacion .
      this.cancelado.emit(null)
    }
      
  }

  /**
   * 
   */
  ejecutarIntervalo(){
    //Este es solo para el debug
    this.debug_EjecutarTemporizador()
    // Ejecutamos el codigo del interavlo una vez. 
    this.intervalo_codigo()
    // Guardamos el intervalo. 
    this.intervalo = setInterval( ()=>{
      this.intervalo_codigo()
    }, this.tiempoDeEspera)

  }


  /**
   * Ejecuta los datos para las comprobaciones de cada intervalo y en caso de que ya no 
   * sea necesario seguir con el intervalo ejecuta la promesa que contiene los datos. 
   */
  intervalo_codigo(){
      // Comprobramos si es necesario terminar el intervalo.
      if( !this.ejecutarBusqueda){
        // Limpiamos todos los datos del buscador
        this.limpiarBuscador()
        // Aqui ejecutamos el temporizador de cancelacion. 
        //Si no llega a suceder la carga anulamos. 
        this.temporizadorDeCancelacion()
        // Guardamos la susbscripcion para desuscribirnos despues. 

        this.observable = <Observable<T>> this.cbObservable(this.termino)

        this.subscription = this.observable.subscribe( datos => {
          // Cancelamos la cancelacion xP
          clearTimeout(this.timeoutCancelacion)
          //Los resultados se emiten
          this.resultado.emit(datos)
          // Limpiamos todo
          this.buscando = false
          this.debug_limpiar()
          this.timeoutCancelacion = null
        } )
      }
      // Ya no debe ser necesario ejecutar el intervalo a menos que 
      // se vuelva a ejecutar buscar()
      this.ejecutarBusqueda = false
  }

  /**Ejecuta el temporizador de cancelaion y cancela la 
   * subscripcion si el tiempoMaximoDeEspera es alcanzado. 
   */
  temporizadorDeCancelacion(){
    //Este es para debug.
    this.debug_intervalo_cancelacion()
    // guardamos el timeOut para cancelarlo si es necesario. 
    this.timeoutCancelacion = setTimeout(()=>{
      // Quitamos todo lo relacionado a la suscripcion
      this.unsubscribeCompleto()
      //Emitimos el error por que tardo mas de tiempoMaximoDeEspera
      this.error.emit(`La peticion de busqueda tardo mas de ${this.tiempoMaximoDeEspera/1000} segundos y fue cancelada automaticamente.`)
      // Emitimos tambien un evento de cancelacion. 
      this.cancelado.emit(null)
      this.buscando = false

      
    }, this.tiempoMaximoDeEspera )

  }

  /**
   * Ejelcuta todas las operaciones necesarias para deshacer la suscripcion 
   * y limpiar lo relacionado con ella.
   */
  unsubscribeCompleto(){
    //Si hay suscripcion la quitamos. 
     if( this.subscription ) this.subscription.unsubscribe()
     // Ponemos en null para comprobaciones futuras. 
      this.subscription = null
      //Ejecutamos la limpieza de debug. 
      this.debug_limpiar()
      //Quitamos el timeout por si sigue. 
      if(this.timeoutCancelacion) clearTimeout(this.timeoutCancelacion)
  }

  /**
   * Crea un inteervalo para debugguear la cancelcion. 
   */
  debug_intervalo_cancelacion(){
    this.debug_intervaloCancelacion = setInterval( () => {
      this.debug_tiempoRestanteCancelacion -= 100
    },100 )
  }

  //Limpia el buscador quitando el intervalo. 
  limpiarBuscador(){
    this.debug_limpiar()
    clearInterval(this.intervalo)
    this.intervalo = null
  }


  /**
   * Ejecuta el temporizador para debug
   * restante que le queda para que se ejecute la promesa. 
   * 
   */
  debug_EjecutarTemporizador(){
    this.debug_intervalo = setInterval(()=>{
      this.debug_tiempoRestante -= 100
    }, 100)
  }

  /**
   * Limpia los datos del debug. (Los intervalos. )
   */
  debug_limpiar(){
    clearInterval(this.debug_intervalo)
    clearInterval( this.debug_intervaloCancelacion)
    this.debug_intervalo = null
    this.debug_intervaloCancelacion = null
    // this.debug_tiempoRestante = this.tiempoDeEspera

  }

  /**
   * Ejecuta comprobaciones antes de que la busqueda se realize para no tner un esError
   * extranio. 
   */
  comprobaciones(){
    let esError = false
    let msj = []

    if( !this.observable ) {
      esError = true
      msj.push('No has defido el observable')
    }

   if( esError ) throw 'EL BUSCADOR PACIENTE => ' +  msj.join('.')
    

  }

}