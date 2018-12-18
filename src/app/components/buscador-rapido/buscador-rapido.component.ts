import { Input, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BuscadorRapidoService } from '../buscador-rapido/buscador-rapido.service';

@Component({
  selector: 'app-buscador-rapido',
  templateUrl: './buscador-rapido.component.html'
})
export class BuscadorRapidoComponent implements OnInit {
  
  @Input() input:boolean = false;
  @Input() lista:boolean = false;

  constructor(
    public s: BuscadorRapidoService
  ) {
  }
  ngOnInit() {
   }

  


}