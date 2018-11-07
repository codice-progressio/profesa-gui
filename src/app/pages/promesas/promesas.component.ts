import { Component, OnInit } from '@angular/core';
// import { resolve } from 'path';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    // tslint:disable-next-line:no-shadowed-variable


    // this.contarTres().then(
    //   (msj) => console.log('Termino!', msj)
    // ).catch( error => console.error('Error en la promesa', error) );
  }

  ngOnInit() {
  }

  // contarTres (): Promise<boolean> {
  //    return new Promise(( resolve, reject) => {
  //     let contador = 0;
  //     const intervalo = setInterval( () => {
  //       contador += 1;
  //       console.log( contador );

  //       if ( contador === 3) {
  //         resolve(true);
  //         clearInterval( intervalo );
  //       }
  //     }, 1000);
  //   });

  // }

}
