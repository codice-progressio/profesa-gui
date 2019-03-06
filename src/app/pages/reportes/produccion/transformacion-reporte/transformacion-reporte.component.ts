import { Component, OnInit } from '@angular/core';
import { ReporteTransformacion } from 'src/app/models/reportes/trasnformacion/trasformacion';
import { ReportesProduccionService } from '../../../../services/reportes/reportes-produccion.service';

@Component({
  selector: 'app-transformacion-reporte',
  templateUrl: './transformacion-reporte.component.html',
  styles: []
})
export class TransformacionReporteComponent implements OnInit {

  reporte: ReporteTransformacion;

  fechaYHora: string = ''
  
  pasosKey: string[ ] = []


  
  keys = Object.keys


  constructor(
    public _reportesService: ReportesProduccionService
  ) { 
    this._reportesService.transformacion()
    .subscribe( (reporte)=>{
      this.reporte = reporte
      this.pasosKey =  Object.keys( this.reporte.objetoContenedorDePasos )
    } )

    this.iniciarHoraYFecha();

  }

  ngOnInit() {
    
  }
  
  iniciarHoraYFecha( ){
    setInterval(()=>{
      this.fechaYHora = new Date().toISOString();
    }, 1000 )
  }
  

}
