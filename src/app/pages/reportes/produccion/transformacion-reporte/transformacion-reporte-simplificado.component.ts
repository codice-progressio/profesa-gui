import { Component, OnInit } from '@angular/core';
import { ReporteTransformacionSimplificado } from 'src/app/models/reportes/trasnformacion/ReporteTransformacionSimplificado';
import { ReportesProduccionService } from 'src/app/services/reportes/reportes-produccion.service';

@Component({
  selector: 'app-transformacion-reporte-simplificado',
  templateUrl: './transformacion-reporte-simplificado.component.html',
  styles: []
})
export class TransformacionReporteSimplificadoComponent implements OnInit {


  reporte: ReporteTransformacionSimplificado
  keys = Object.keys

  constructor(
    public _reporteProduccion: ReportesProduccionService
  ) { 
  this._reporteProduccion.transformacionSimplificado().subscribe( (reporte)=>{
      this.reporte = reporte
    } )
  }

  ngOnInit() {
  }




}
