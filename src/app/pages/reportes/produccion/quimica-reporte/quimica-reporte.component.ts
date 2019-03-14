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

  constructor(
    public _reportesService: ReportesProduccionService
  ) {
    super()

    this.funcionATemporizar =  ()=>{
      console.log( 'temporizador.')
      this.consultarReporte();
    } 
    this.intervalo = 1000
  }
  
  ngOnInit() {
    this.consultarReporte( )
  }


  consultarReporte( ) {
    this._reportesService.quimica( ).subscribe( ( reporteQuimica )=>{
      this.reporteQuimica = reporteQuimica
      this.mostrarReporte = true
    } )
  }

}
