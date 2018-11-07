import { Component, OnInit, Input } from '@angular/core';
import { PaginadorService } from './paginador.service';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styles: []
})
export class PaginadorComponent implements OnInit {

  constructor(
    public _s: PaginadorService
  ) { }



  ngOnInit() {

  }



}
