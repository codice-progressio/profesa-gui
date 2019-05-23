import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.models';

@Component({
  selector: 'app-clientes-detalle',
  templateUrl: './clientes-detalle.component.html',
  styles: []
})
export class ClientesDetalleComponent implements OnInit {

  constructor() { }


  @Input() cliente: Cliente = null


  ngOnInit() {
  }

}
