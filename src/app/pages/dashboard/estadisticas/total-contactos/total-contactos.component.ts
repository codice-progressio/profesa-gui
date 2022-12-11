import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit
} from '@angular/core'
import { EstadisticasService } from 'src/app/services/estadisticas.service'
import { EstadisticaRecargarComponent } from '../estadistica-recargar/estadistica-recargar.component'
import { EstadisticaCarga } from '../estadistica-recargar/EstadisticaCarga'

@Component({
  selector: 'app-total-contactos',
  templateUrl: './total-contactos.component.html',
  styleUrls: ['./total-contactos.component.css']
})
export class TotalContactosComponent extends EstadisticaCarga {
  constructor(public eSer: EstadisticasService) {
    super()
  }

  cargar() {
    this.componenteCarga.cargando = true
    this.eSer.contarContactos().subscribe(
      total => {
        this.componenteCarga.cargando = false
      },
      () => (this.componenteCarga.cargando = false)
    )
  }
}
