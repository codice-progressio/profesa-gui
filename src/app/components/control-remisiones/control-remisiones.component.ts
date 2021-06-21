import { Component, OnInit } from '@angular/core'
import { RemisionLigera } from '../../services/contabilidad.service'

@Component({
  selector: 'app-control-remisiones',
  templateUrl: './control-remisiones.component.html',
  styleUrls: ['./control-remisiones.component.css']
})
export class ControlRemisionesComponent implements OnInit {
  constructor() {}

  remisiones: RemisionLigera[] = []

  ngOnInit(): void {}
}
