import { Component, OnInit, Input } from '@angular/core'
import { Detalles_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/Detalles_GUI_CRUD'
import { Terminado } from 'src/app/models/terminado.models'

@Component({
  selector: 'app-terminados-detalle',
  templateUrl: './terminados-detalle.component.html',
  styles: []
})
export class TerminadosDetalleComponent implements OnInit {
  @Input() detalle: Terminado = null

  @Input() id: string = 'detalleModal'

  ngOnInit() {}
}
