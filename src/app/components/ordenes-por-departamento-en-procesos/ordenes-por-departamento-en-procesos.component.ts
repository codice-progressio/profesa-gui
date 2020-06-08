import { Component, OnInit, Input } from '@angular/core'
import {
  OrdenParaScanner,
  FolioNewService
} from '../../services/folio/folio-new.service'

@Component({
  selector: 'app-ordenes-por-departamento-en-procesos',
  templateUrl: './ordenes-por-departamento-en-procesos.component.html',
  styleUrls: ['./ordenes-por-departamento-en-procesos.component.css']
})
export class OrdenesPorDepartamentoEnProcesosComponent implements OnInit {
  ordenes: OrdenParaScanner[] = []
  cargando = {}
  keys = Object.keys

  @Input() set idDepartamento(id: string) {
    this.cargando['ordenes'] = 'Obteniendo ordenes del departamento'

    this.folioService.findAllOrdenesPorDeparatmento(id).subscribe(
      ordenes => {
        delete this.cargando['ordenes']
        this.ordenes = ordenes
      },
      _ => delete this.cargando['ordenes']
    )
  }

  constructor(public folioService: FolioNewService) {}

  ngOnInit(): void {}
}
