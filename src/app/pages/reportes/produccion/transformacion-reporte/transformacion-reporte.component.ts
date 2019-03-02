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


  constructor(
    public _reportesService: ReportesProduccionService
  ) { 
    this._reportesService.transformacion()
    .subscribe( (reporte)=>{
      this.reporte = reporte
    } )
  }

  ngOnInit() {
    
  }

}
