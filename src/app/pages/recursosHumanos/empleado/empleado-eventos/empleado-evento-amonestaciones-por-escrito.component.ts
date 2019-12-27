import { Component, OnInit, Input } from '@angular/core'
import { AmonestacionPorEscrito } from '../../../../models/recursosHumanos/empleados/eventos/amonestacionPorEscrito.model'
import { VisorDeImagenesService } from 'src/app/services/visorDeImagenes/visor-de-imagenes.service'

@Component({
  selector: 'app-empleado-evento-amonestaciones-por-escrito',
  templateUrl: './empleado-evento-amonestaciones-por-escrito.component.html',
  styles: []
})
export class EmpleadoEventoAmonestacionesPorEscritoComponent implements OnInit {
  mensaje: string
  @Input() fecha: Date
  @Input() amonestacionPorEscrito: AmonestacionPorEscrito

  constructor(private _visor: VisorDeImagenesService) {
    this.mensaje = 'Amonestacion por escrito'
  }

  ngOnInit() {}

  mostrarImagen(src: string) {
    this._visor.mostrarImagen(src)
  }
}
