import { Component, OnInit, Input } from '@angular/core'
import { FelicitacionPorEscrito } from '../../../../models/recursosHumanos/empleados/eventos/felicitacionesPorEscrito.model'
import { VisorDeImagenesService } from '../../../../services/visorDeImagenes/visor-de-imagenes.service'

@Component({
  selector: 'app-empleado-evento-felicitaciones-por-escrito',
  templateUrl: './empleado-evento-felicitaciones-por-escrito.component.html',
  styles: []
})
export class EmpleadoEventoFelicitacionesPorEscritoComponent implements OnInit {
  mensaje: string
  @Input() fecha: Date
  @Input() felicitacionPorEscrito: FelicitacionPorEscrito

  constructor(private _visor: VisorDeImagenesService) {
    this.mensaje = 'Felicitaciones por escrito'
  }

  ngOnInit() {}

  mostrarImagen(src: string) {
    this._visor.mostrarImagen(src)
  }
}
