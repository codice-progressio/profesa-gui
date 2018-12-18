import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nivel-urgencia',
  templateUrl: './nivel-urgencia.component.html',
  styles: [`
    .badge {
      min-width: 100px !important;
      display: inline-block !important;
    }
    
  `]
})
export class NivelUrgenciaComponent implements OnInit {
  
  @Input() nivel: string;
  @Input() animar: boolean = true;
  @Input() atenuar: boolean = false;

  colores = {
    ALMACEN : {solid: 'bg-info', ligth: 'text-info'},
    PRODUCCIÓN : {solid: 'bg-inverse', ligth: 'text-inverse'},
    URGENTE : {solid: 'bg-danger', ligth: 'text-danger'},
    MUESTRA : {solid: 'bg-warning', ligth: 'text-warning'},
  }
  constructor() { }

  ngOnInit() {
  }


}
