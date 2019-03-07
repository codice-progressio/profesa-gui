import { OnInit, OnDestroy } from "@angular/core";

/**
 *Esta clase genera un temporizador que se destruye junto con el componente y se inicia con
 este. Es una clase que se hereda.  
 *
 * @export
 * @class Temporizador
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
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
    
}