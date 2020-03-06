import { Component, OnInit, Input } from '@angular/core'
import { Trayecto } from 'src/app/models/trayecto.models'

@Component({
  selector: 'app-orden-detalle-producto-terminado',
  templateUrl: './orden-detalle-producto-terminado.component.html',
  styleUrls: ['./orden-detalle-producto-terminado.component.css']
})
export class OrdenDetalleProductoTerminadoComponent implements OnInit {
  @Input() trayecto: Trayecto = null
  constructor() {}

  ngOnInit(): void {}
}
