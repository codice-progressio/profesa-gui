import { Component, OnInit, Input } from '@angular/core';
import { FolioLinea } from '../../models/folioLinea.models';
import { ModeloCompleto } from '../../models/modeloCompleto.modelo';

@Component({
  selector: 'app-modelo-completo',
  templateUrl: './modelo-completo.component.html',
  styles: []
})
export class ModeloCompletoComponent implements OnInit {
  
  @Input() linea: FolioLinea = null;
  @Input() modeloCompleto: ModeloCompleto = null;

  
  constructor() { 
   
  }

  ngOnInit() {
  }

}
