import { OnInit, OnDestroy, ModuleWithComponentFactories, Directive } from "@angular/core";
import * as moment from 'moment/moment';
import 'moment-duration-format';

/**
 *Esta clase genera un temporizador que se destruye junto con el componente y se inicia con
 este. Es una clase que se hereda.  
 *
 * @export
 * @class Temporizador
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Directive()
export class Temporizador implements OnInit, OnDestroy{


    /**
     *El objeto intervalo que se usa para destruirlo. 
     *
     * @type {*}
     * @memberof Temporizador
     */
    timerInterval:any;
    /**
     *La funcion que se ejecutara en el temporizador. 
     *
     * @type {*}
     * @memberof Temporizador
     */
    funcionATemporizar: any
    /**
     *El intervalo que durara la repeticion de uno a otro. 
     *
     * @type {number}
     * @memberof Temporizador
     */
    intervalo: number = 50000
    /**
     *Se ejecuta cuando el componente se destruye. 
     *
     * @memberof Temporizador
     */
    ngOnDestroy(): void {
         // Will clear when component is destroyed e.g. route is navigated away from.
       clearInterval(this.timerInterval);
    }
    
    /**
     *Se ejecuta cunado el componente se inicializa. 
     *
     * @memberof Temporizador
     */
    ngOnInit(){
      this.timerInterval = setInterval(()=>{
        this.funcionATemporizar()
      } , this.intervalo);
    }

   
    /**
     *Calcula el tiempo trasncurrido desde la fecha que se le pase como parametro a la fecha
      actual.
     *
     * @param {string} inicio
     * @returns {string}
     * @memberof Temporizador
     * @param {Date} inicio
     */
    tiempoTrasncurridoHastaFechaActual( inicio: Date):string {
      /**
       * La fecha actual. 
       */
      let fechaActual = moment();
      /**
       * La fecha de la cual se quiere calcular el tiempo transcurrido. 
       */
      let fechaDeInicio = moment(inicio); 
      
      // ESTE SE TIENE QUE CALCULAR COMO <1 POR QUE AL PARECER CUENTA LOS DIAS DESDE 0
      let leyendaDias = moment.duration(fechaActual.diff(fechaDeInicio)).days() < 1 ? 'dia' : 'dias'
      // Estos son normales. 
      let leyendaMeses = moment.duration(fechaActual.diff(fechaDeInicio)).months() === 1 ? 'mes' : 'meses'
      let leyendaAnio = moment.duration(fechaActual.diff(fechaDeInicio)).years() === 1 ? 'año' : 'años'
      
      /**
       * Hacemos el calculo de la diferencia y formateamos la la salida a tipo 1 anio, 2 meses, 3 dias, 04:05:06
       */
      let duration:string = moment.duration(fechaActual.diff(fechaDeInicio)).format(`y [${leyendaAnio}], M [${leyendaMeses}], D [${leyendaDias}], HH:mm:ss`);
      
      return duration;

    }

   
  }
    

    
   