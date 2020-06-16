import { Component, OnInit, Input } from '@angular/core'
import { Modelo } from 'src/app/models/modelo.models'

@Component({
  selector: 'app-modelos-detalle',
  templateUrl: './modelos-detalle.component.html',
  styles: []
})
export class ModelosDetalleComponent implements OnInit {
  @Input() detalle: Modelo = null

  @Input() id: string = 'detalleModal'

  constructor() {}

  ngOnInit() {}
}
