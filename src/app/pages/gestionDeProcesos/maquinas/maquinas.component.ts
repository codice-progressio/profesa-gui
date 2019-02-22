import { Component, OnInit } from '@angular/core';
import { MaquinaService } from 'src/app/services/service.index';
import { Maquina } from 'src/app/models/maquina.model';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-maquinas',
  templateUrl: './maquinas.component.html',
  styles: []
})
export class MaquinasComponent implements OnInit {


  /**
   * Obtiene la lista de las maquinas. 
   *
   * @type {Maquina []}
   * @memberof MaquinasComponent
   */
  maquinas: Maquina [] = null;

  /**
   *Oculta todos los elementos para mostrar 
   el componente de creacion de maquinas. 
   *
   * @type {boolean}
   * @memberof MaquinasComponent
   */
  crearModificar: boolean = false;

  /**
   *El id del elemento que se va a modificar. 
   Si este elemento esta en null entonces se crea 
   uno nuevo en el componente crear-modificar. 
   *
   * @type {string}
   * @memberof MaquinasComponent
   */
  idModificar: string = null;

  mostrarLista: boolean = true;
  mostrarCrearModificar: boolean = false;
  /**
   *El tiempo que dura en ocultar el componente
   completamente. Se toma del tiempo de la clase
   faster que es de 500 milisegundos. 
   *
   * @type {number}
   * @memberof MaquinasComponent
   */
  tiempoDeTransicion: number = 500;





  /**
   *Este componente. 
   *
   * @type {MaquinasComponent}
   * @memberof MaquinasComponent
   */
  esteComponente: MaquinasComponent = this;

  constructor(
    public _maquinaService: MaquinaService
  ) {

    this._maquinaService.todo().subscribe( maquinas => {
      this.maquinas = maquinas;
    });

  }


  ngOnInit() {
  }

  /**
   *Muestra el componente de detalles. 
   *
   * @param {string} id
   * @memberof MaquinasComponent
   */
  mostrarDetalle( id: string ) {

  }

  /**
   *Edita la maquina. 
   *
   * @param {string} id
   * @memberof MaquinasComponent
   */
  editar( id:string ){

  }

  /**
   * Crea una nueva maquina. 
   *
   * @memberof MaquinasComponent
   */
  crear ( ){
    this.animar();


  }

  animar( ){
    this.crearModificar = !this.crearModificar;
    setTimeout( ()=>{
      this.mostrarLista = !this.mostrarLista;
      this.mostrarCrearModificar = !this.mostrarCrearModificar;

    }, this.tiempoDeTransicion );
  }

  /**
   *Elimina una maquina. 
   *
   * @param {string} id
   * @memberof MaquinasComponent
   */
  eliminar( id: string ){

  }



}
