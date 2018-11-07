import { Component, OnInit } from '@angular/core';
import { ListaDeOrdenesService } from './lista-de-ordenes.service';

@Component({
  selector: 'app-lista-de-ordenes',
  templateUrl: './lista-de-ordenes.component.html',
  styles: []
})
export class ListaDeOrdenesComponent implements OnInit {
  
  constructor(
    public _s: ListaDeOrdenesService
  ) { }

  ngOnInit() {
  }

}
