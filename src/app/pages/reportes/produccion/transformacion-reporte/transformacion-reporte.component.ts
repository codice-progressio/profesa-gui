import { Component, OnInit } from '@angular/core';
import { ReporteTransformacionDetalle } from 'src/app/models/reportes/trasnformacion/ReporteTransformacionDetalle';
import { ReportesProduccionService } from '../../../../services/reportes/reportes-produccion.service';

@Component({
  selector: 'app-transformacion-reporte',
  templateUrl: './transformacion-reporte.component.html',
  styles: []
})
export class TransformacionReporteComponent implements OnInit {

  /**
   *El objeto que contiene el reporte a detalle. 
   *
   * @type {ReporteTransformacionDetalle}
   * @memberof TransformacionReporteComponent
   */
  reporte: ReporteTransformacionDetalle;

  /**
   *La fecha y hora que se muestra en el encabezado. 
   *
   * @type {string}
   * @memberof TransformacionReporteComponent
   */
  fechaYHora: string = ''
  
  /**
   *La lista de llaves para mostrar los pasos por separado. 
   *
   * @type {string[ ]}
   * @memberof TransformacionReporteComponent
   */
  pasosKey: string[ ] = []


  
  /**
   *El objeto keys que funcionara para itinerar sobre los pasos

   *
   * @memberof TransformacionReporteComponent
   */
  keys = Object.keys



  /**
   * Intercambia la visibilidad entre el reporte simplificado y el de 
   * detalle. Cuando esta en false se muestra el simplificado. 
   *
   * @type {boolean}
   * @memberof TransformacionReporteComponent
   */
  reporteADetalle: boolean = false;



  constructor(
    public _reportesService: ReportesProduccionService
  ) { 
    this._reportesService.transformacionDetalle()
    .subscribe( (reporte)=>{
      this.reporte = reporte
      this.pasosKey =  Object.keys( this.reporte.objetoContenedorDePasos )
    } )

    this.iniciarHoraYFecha();

  }

  ngOnInit() {
    
  }
  
  /**
   * Inicia el contador de fecha y hora. 
   *
   * @memberof TransformacionReporteComponent
   */
  iniciarHoraYFecha( ){
    setInterval(()=>{
      this.fechaYHora = new Date().toISOString();
    }, 1000 )
  }
  

}
