import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReporteTransformacionSimplificado } from 'src/app/models/reportes/trasnformacion/ReporteTransformacionSimplificado';
import { ReportesProduccionService } from 'src/app/services/reportes/reportes-produccion.service';
import { Temporizador } from '../../../../services/utilidades/Temporizador';

@Component({
  selector: 'app-transformacion-reporte-simplificado',
  templateUrl: './transformacion-reporte-simplificado.component.html',
  styles: []
})
export class TransformacionReporteSimplificadoComponent extends Temporizador implements OnInit {


  reporte: ReporteTransformacionSimplificado
  keys = Object.keys
  ultimaActualizacion: Date;


  constructor(
    public _reporteProduccion: ReportesProduccionService,
  
  ) { 
    super()
  this.funcionATemporizar = ()=>{this.consultarReporte()} 
  this.intervalo = 1000,
  this.consultarReporte();



    setTimeout( ()=>{
      this.mostrarDiferenciaDeHora = true;
      setInterval( ()=>{
        for (const key in this.objetoContenedorDeTiempos) {
          if (this.objetoContenedorDeTiempos.hasOwnProperty(key)) {
            const element = this.objetoContenedorDeTiempos[key];
            let tiempoTranscurrido: number = Math.abs(new Date().getTime() - new Date(element.inicio).getTime()) / 36e5;
            element.transcurrido = this.convertirAHoras( tiempoTranscurrido.toString())
          }
        }
      }, 1000 )
    }, 5000 );
  }

  // ngOnInit() {
  // }
  
  

  consultarReporte( ){
  
    this._reporteProduccion.transformacionSimplificado().subscribe( (reporte)=>{
      this.reporte = reporte
      this.ultimaActualizacion = new Date();
    } )
  }

 

  formatearFecha( date: string ): Date{
    return new Date(date)
  }

  mostrarDiferenciaDeHora: boolean = false;


  objetoContenedorDeTiempos = {}

  calcularFecha( date: string, maquina: string  ){
    // Si existe el tiempo entoces guardamos un nuevo objeto que 
    // va a estar guardando el tiempo. 
    if( !this.objetoContenedorDeTiempos.hasOwnProperty( maquina )){
      let tiempoTranscurrido: number = Math.abs(new Date().getTime() - new Date(date).getTime()) / 36e5;
      if( !this.objetoContenedorDeTiempos.hasOwnProperty( maquina )){
        
        this.objetoContenedorDeTiempos[maquina] = {
          inicio: new Date( date ),
          transcurrido: this.convertirAHoras( tiempoTranscurrido.toString() )
          
        }
      } 
    }
    
  }

  existePropiedad( key: string  ): boolean {
    return this.objetoContenedorDeTiempos.hasOwnProperty( key )
  }

  convertirAHoras( hora: string): Date{
    var n = new Date(0,0);
    n.setSeconds(+hora * 60 * 60);
    return n
  }
   


}
