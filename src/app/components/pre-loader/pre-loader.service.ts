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

  registro = {};

  Object = Object;

  

  constructor(
    public _utilidadesService: UtilidadesService
  ) { }


  loading( msj: string ): number {
    this.definirMensajeParaMostrar( msj );
        
    if ( !this.cargando ) {
      
      this.cargando = true;
      this.canceladoPorError = false;
    }

    const id = Math.trunc(Math.random()*10000);
    this.registro[id] = msj;
    return id;


  }

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

  err(){
    
    this.canceladoPorError = true;
    this.limpiar();
  }
  
  limpiar(){
    this.desvanecer = false
    this.cargando = false;
    this.leyenda = [];
    this.canceladoPorError = false;
    this.miniCarga = false;
    this.registro = {};
    

    
  }

  definirMensajeParaMostrar( msj: string  ) {
    this.leyenda.push(msj);
  }


}
