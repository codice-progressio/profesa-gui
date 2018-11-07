import { Injectable } from '@angular/core';
import { BuscadorRapido } from '../../models/buscador-rapido.models';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class BuscadorRapidoService {

  // El nombre del elemento que se va a listar. Este se usa
  // cuando la lista esta vacia y pone una leyanda de tipo "No se a seleccionado ningún XXX ."
  nombreDeElemento: string;

  // Los elementos que se van a mostrar en la lista.
  elementos: BuscadorRapido[] = [];

  // seleccionado: string;

  // Rellena el cuadro de elemento seleccionado con esta leyenda.
  elementoSeleccionado: BuscadorRapido;

  // Esta es la función que se activara cuando se
  // haga click sobre el elemento seleccionado de la lista.
  callback: ( objeto: any) => void;

  leyenda = `No se ha seleccionado ningún ${this.nombreDeElemento}.`;


  constructor() {}

  limpiarLista() {
    this.elementos = [];
  }

  seleccionarElemento( elemento: BuscadorRapido, leyenda?: string, objeto?: any) {
    if ( elemento) {
      // Si se define un solo 'elemento' quiere decir que estamos llamando desde el componente.
      this.leyenda = elemento.nombre;
      this.elementoSeleccionado = elemento;
      this.callback(elemento.objeto);
      this.limpiarLista();
    } else {
      // Si no lo definimos entonces quiere decir que estamos actualizando con el objeto
       // y necesitamos crear un nuevo buscardoRapido para mostrarlo y alamacenarlo.
      this.leyenda = leyenda;
      this.elementoSeleccionado = new BuscadorRapido(leyenda, objeto);
    }
  }

  reiniciar() {
    this.leyenda = `No se ha seleccionado ningún ${this.nombreDeElemento}.`;
    this.elementoSeleccionado = new BuscadorRapido(this.leyenda, null);
    this.limpiarLista();
  }



}
