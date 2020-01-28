import { Component, OnInit } from '@angular/core';
import { ReportesProduccionService } from 'src/app/services/reportes/reportes-produccion.service';
import { Temporizador } from 'src/app/services/utilidades/Temporizador';
import { ReporteQuimica } from 'src/app/models/reportes/quimica/reporteQuimica';

@Component({
  selector: 'app-quimica-reporte',
  templateUrl: './quimica-reporte.component.html',
  styles: []
})
export class QuimicaReporteComponent extends Temporizador implements OnInit {

  /**
   *El reporte de quimica. 
   *
   * @type {ReporteQuimica}
   * @memberof QuimicaReporteComponent
   */
  reporteQuimica: ReporteQuimica 
  mostrarReporte: boolean = false

  keys = Object.keys

  ultimaActualizacion: Date =  new Date()

  constructor(
    public _reportesService: ReportesProduccionService
  ) {
    super()

    this.funcionATemporizar =  ()=>{
      this.ultimaActualizacion = new Date();
      this.consultarReporte();
    } 
    // Se actualiza cada 5 minutos
    this.intervalo = 1000*60*5
    this.consultarReporte( )
  }

  consultarReporte( ) {
    throw "No definido";
    
  }

}
