import { Component, OnInit } from '@angular/core';
import { BuscadorRapidoService } from './buscador-rapido.service';
import { BuscadorRapido } from '../../models/buscador-rapido.models';
import swal from 'sweetalert2';

@Component({
  selector: 'app-buscador-rapido',
  templateUrl: './buscador-rapido.component.html',
  styles: []
})
export class BuscadorRapidoComponent implements OnInit {


  constructor(
    public _ser: BuscadorRapidoService
  ) { }

  ngOnInit() {}

  // seleccionarModelo( objeto: BuscadorRapido) {
  //   // this._ser.elementoSeleccionado = objeto;
  //   // this._ser.leyenda = objeto.nombre;
  //   this._ser.seleccionarElemento(objeto);
  //   this._ser.callback(objeto.objeto);
  //   this._ser.limpiarLista();
  // }



}
