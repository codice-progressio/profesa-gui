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

  constructor() { }

  ngOnInit() {
  }

}
