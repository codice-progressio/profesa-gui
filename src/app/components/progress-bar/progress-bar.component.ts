import { Component, OnInit, Input } from '@angular/core';
import { NIVEL } from 'src/app/config/nivelesDeUrgencia';
import { UtilidadesService } from 'src/app/services/utilidades/utilidades.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styles: []
})
export class ProgressBarComponent implements OnInit {

  @Input() porcentaje: number =0;
  @Input() nivel :string = "PRODUCCIÓN";
  colores = {
    ALMACEN : {bg: 'bg-info', text: 'text-info'},
    PRODUCCIÓN : {bg: 'bg-inverse', text: 'text-inverse'},
    URGENTE : {bg: 'bg-danger', text: 'text-danger'},
    MUESTRA : {bg: 'bg-warning', text: 'text-warning'},
  }
 

  conteoPorcentaje: number = 0;

  
  constructor(
    public _util: UtilidadesService
  ) { 

  }


  
  ngOnInit() {
  
  }

  getColor( ) {
    return this.colores[this.nivel];
  }

  

}
