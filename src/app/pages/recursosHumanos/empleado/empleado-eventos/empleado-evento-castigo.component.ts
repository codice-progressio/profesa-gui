import { Component, OnInit, Input } from '@angular/core'
import { VisorDeImagenesService } from 'src/app/services/visorDeImagenes/visor-de-imagenes.service'
import { Castigo } from '../../../../models/recursosHumanos/empleados/eventos/castigo.model'

@Component({
  selector: 'app-empleado-evento-castigo',
  templateUrl: './empleado-evento-castigo.component.html',
  styles: []
})
export class EmpleadoEventoCastigoComponent implements OnInit {
  mensaje: string
  @Input() fecha: Date
  @Input() castigo: Castigo

  constructor(private _visor: VisorDeImagenesService) {
    this.mensaje = 'Castigo - Acta administrativa'
  }

  ngOnInit() {}

  mostrarImagen(src: string) {
    this._visor.mostrarImagen(src)
  }
}
