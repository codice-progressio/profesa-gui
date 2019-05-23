import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReporteTransformacionSimplificado } from 'src/app/models/reportes/trasnformacion/ReporteTransformacionSimplificado';
import { ReportesProduccionService } from 'src/app/services/reportes/reportes-produccion.service';
import { Temporizador } from '../../../../services/utilidades/Temporizador';
import * as moment from 'moment';

@Component({
  selector: 'app-transformacion-reporte-simplificado',
  templateUrl: './transformacion-reporte-simplificado.component.html',
  styles: []
})
export class TransformacionReporteSimplificadoComponent extends Temporizador implements OnInit {


  reporte: ReporteTransformacionSimplificado
  keys = Object.keys
  ultimaActualizacion: Date;

  
  /**
   * Contiene la relacion entre maquina y tiempo transcurrido. 
   *
   * @memberof TransformacionReporteSimplificadoComponent
   */
  objetoContenedorDeTiempos = {}

  
  /**
   *Oculta los temporizadores para permitir que se cargue el reporte
    y que no se mande error por que no hay objetos que cargar. 
   *
   * @type {boolean}
   * @memberof TransformacionReporteSimplificadoComponent
   */
  mostrarDiferenciaDeHora: boolean = false;




  constructor(
    public _reporteProduccion: ReportesProduccionService,
  
  ) { 
    super()
  
  // Cargamos la funcion a temporizar para que se elimine 
  this.funcionATemporizar = ()=>{ 
    // Consultamos los datos del reporte. 
    this.consultarReporte()

    this.mostrarDiferenciaDeHora = true
    for (const key in this.objetoContenedorDeTiempos) {
      if (this.objetoContenedorDeTiempos.hasOwnProperty(key)) {
        const element = this.objetoContenedorDeTiempos[key];
        element.transcurrido = this.tiempoTrasncurridoHastaFechaActual(element.inicio);
      }
    }
  } 

  this.intervalo = 1000
  // Consultamos el reporte al cargar
  this.consultarReporte();

  }
  

  /**
   *Hace la consulta a la BD de datos del reporte simplificado de transformacion. 
   *
   * @memberof TransformacionReporteSimplificadoComponent
   */
  consultarReporte( ){
      this._reporteProduccion.transformacionSimplificado().subscribe( (reporte)=>{
      this.reporte = reporte
      this.ultimaActualizacion = new Date();
    } )
  }

 

  /**
   *Da formato a una fecha de tipo string que se le pase como paramentro. Lo usamos
   como un hack para llamarlo desde el html. 
  
   *
   * @param {string} date La fecha a formatear. 
   * @returns {Date} La fecha formateada
   * @memberof TransformacionReporteSimplificadoComponent
   */
  formatearFecha( date: string ): Date{
    return new Date(date)
  }


  /**
   *Crea el objeto que contendra las fechas para cada maquina que se le pase como paramentro 
   y almacen el dato en el objetoContenedorDeTiempos()
   *
   * @param {string} date La fecha que se va a calcular. 
   * @param {string} maquina La clave de la maquina. 
   * @memberof TransformacionReporteSimplificadoComponent
   */
  calcularFecha( date: string, maquina: string  ){
    // Si existe el tiempo entoces guardamos un nuevo objeto que 
    // va a estar guardando el tiempo. 
    if( !this.objetoContenedorDeTiempos.hasOwnProperty( maquina )){
      if( !this.objetoContenedorDeTiempos.hasOwnProperty( maquina )){
        
        this.objetoContenedorDeTiempos[maquina] = {
          inicio: new Date( date ),
          transcurrido: ''
        }
      } 
    }
  }

  /**
   *Confirma que el objetoContenedorDeTiempos ya tenga registrada la key 
   que se le pase como parametro. Es un hack para hacerlo desde el html. 
   *
   * @param {string} key
   * @returns {boolean}
   * @memberof TransformacionReporteSimplificadoComponent
   */
  existePropiedad( key: string  ): boolean {
    return this.objetoContenedorDeTiempos.hasOwnProperty( key )
  }

   

}
