import { Component, OnInit, Input } from '@angular/core'
import { Usuario } from '../../../../../models/usuario.model'

@Component({
  selector: 'app-empleado-evento-plantilla',
  templateUrl: './empleado-evento-plantilla.component.html',
  styles: []
})
export class EmpleadoEventoPlantillaComponent implements OnInit {
  _icono: string
  @Input() set icono(value: string) {
    this._icono = value
  }

  get icono(): string {
    return this._icono
  }
  @Input() mensaje: string
  @Input() fecha: string

  constructor() {}

  ngOnInit() {}
}
