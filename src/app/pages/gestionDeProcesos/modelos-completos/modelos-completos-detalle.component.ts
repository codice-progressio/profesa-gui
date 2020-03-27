import { Component, OnInit, Input } from '@angular/core'
import { Detalles_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/Detalles_GUI_CRUD'
import { ModeloCompleto } from 'src/app/models/modeloCompleto.modelo'

@Component({
  selector: 'app-modelos-completos-detalle',
  templateUrl: './modelos-completos-detalle.component.html',
  styles: []
})
export class ModelosCompletosDetalleComponent implements OnInit {
  @Input() detalle: ModeloCompleto = null

  @Input() id: string = 'detalleModal'

  constructor() {}

  ngOnInit() {}
}
