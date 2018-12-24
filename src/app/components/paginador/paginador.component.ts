import { Component, OnInit, Input } from '@angular/core';
import { PaginadorService } from './paginador.service';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styles: []
})
export class PaginadorComponent implements OnInit {

  @Input() paginador: PaginadorService = null;


  s: PaginadorService;
  constructor(
    public _s: PaginadorService
  ) { 
    
    
  }
  
  
  
  ngOnInit() {
    // Si no hay un paginador externo se usa el global
    // Esto sirve para que los paginadores se puedan reutilizar
    // en la misma pagina.
    if( this.paginador ){
      console.log(` Se usa el paginador externo `);
      this.s = this.paginador;
  
    }else{
      console.log(` Se ussa el paginador general `);
      this.s = this._s;
      
    }

  }



}
