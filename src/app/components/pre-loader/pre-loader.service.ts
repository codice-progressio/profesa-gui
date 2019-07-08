import { Injectable } from '@angular/core';
import { UtilidadesService } from '../../services/utilidades/utilidades.service';
import { log } from 'util';

@Injectable({
  providedIn: 'root'
})
export class PreLoaderService {

  desvanecer: boolean = false;
  cargando: boolean = false;
  leyenda: string[] = [];
  canceladoPorError:boolean = false;
  miniCarga:boolean = false;
  // tiempoDeEsperaAntesDePrecarga: number  = 100;
  mostrar: boolean = false;



  registro = {};

  Object = Object;

  

  constructor(
    public _utilidadesService: UtilidadesService
  ) { }


  /**
   * Define el arranque de la precarga.
   *
   * @param {string} msj El mensaje que se va a mostrar ( Son acumulables)
   * @returns {number} Retorna un numero que corresponde al tiempo de espera de la tarea en proceso. (Solo es un numero y visual. )
   * @memberof PreLoaderService
   */
  loading( msj: string ): number {
    this.definirMensajeParaMostrar( msj );
      
    if ( !this.cargando ) {
      
      this.cargando = true;
      this.canceladoPorError = false;

      // setTimeout(() => {
        // Si todavia se esta cargando entonces si se muestra. 
        this.mostrar = this.cargando;
      // }, this.tiempoDeEsperaAntesDePrecarga);
    }

    const id = Math.trunc(Math.random()*10000);
    this.registro[id] = msj;
    return id;


  }

  /**
   * Termina la tarea que se le pase como parametro.
   *
   * @param {number} idPreLoader El id que genero loading()
   * @memberof PreLoaderService
   */
  ok(idPreLoader: number ) {
    
    delete this.registro[idPreLoader];
    let b = 0;
    for (const x in this.registro) {
      b++;
    }
    if( b===0 ){
        this.desvanecer = true;
        this._utilidadesService.delay(500)
        .then(r =>{ this.limpiar();})
        .catch( err =>{this.limpiar();});
      }
  }

  /**
   * Se lanza cuando hay un error. 
   *
   * @memberof PreLoaderService
   */
  err(){
    
    this.canceladoPorError = true;
    this.limpiar();
  }
  
  /**
   * Limpia la precarga completamente. 
   *
   * @memberof PreLoaderService
   */
  limpiar(){
    this.desvanecer = false
    this.cargando = false;
    this.mostrar = false;
    this.leyenda = [];
    this.canceladoPorError = false;
    this.miniCarga = false;
    this.registro = {};
    

    
  }

  definirMensajeParaMostrar( msj: string  ) {
    this.leyenda.push(msj);
  }


}
