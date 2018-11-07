import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {


  progreso1: number = 20;
  progreso2: number = 30;
  constructor() { }

  ngOnInit() {
  }

  // Si queremos mandar por función el valor cuando se modifica.

  // actualizar( event: number ) {
  //   console.log( ' Evento: ', event);
  // }

}
