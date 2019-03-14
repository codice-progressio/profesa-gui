import { Component, OnInit } from '@angular/core';
import { Temporizador } from 'src/app/services/utilidades/Temporizador';
import { ReportesProduccionService } from 'src/app/services/reportes/reportes-produccion.service';
import { ReporteLaser } from 'src/app/models/reportes/laser/reporteLaser';

@Component({
  selector: 'app-laser-reporte',
  templateUrl: './laser-reporte.component.html',
  styles: []
})
export class LaserReporteComponent extends Temporizador  implements OnInit {

  
  reporteLaser: ReporteLaser
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
     this._reportesService.laser( ).subscribe( (reporteLaser)=>{
       this.reporteLaser = reporteLaser
       this.mostrarReporte = true
     } )
   }
}
