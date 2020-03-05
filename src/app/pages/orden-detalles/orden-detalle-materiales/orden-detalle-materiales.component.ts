import { Component, OnInit, Input } from '@angular/core';
import { Trayecto } from '../../../models/trayecto.models'

@Component({
  selector: 'app-orden-detalle-materiales',
  templateUrl: './orden-detalle-materiales.component.html',
  styleUrls: ['./orden-detalle-materiales.component.css']
})
export class OrdenDetalleMaterialesComponent implements OnInit {

  @Input() trayecto:Trayecto = null
  constructor() { }

  ngOnInit(): void {
  }

}
