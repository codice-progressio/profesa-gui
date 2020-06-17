import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import {
  ParametrosService,
  ScannerDepartamentoGestion
} from '../../../services/parametros.service'
import { MaquinaLigera } from '../../../services/maquina/maquina.service'
import { ProgramacionTransformacionService } from '../../../services/programacion-transformacion.service'
import { FolioService } from '../../../services/folio/folio.service'
import { FolioNewService } from '../../../services/folio/folio-new.service'
import { OrdenEscaneada } from '../scanner-formulario-dinamico.component'

@Component({
  selector: 'app-scanner-formulario-dinamico-maquinas',
  templateUrl: './scanner-formulario-dinamico-maquinas.component.html',
  styleUrls: ['./scanner-formulario-dinamico-maquinas.component.css']
})
export class ScannerFormularioDinamicoMaquinasComponent implements OnInit {
  maquinas: MaquinaLigera[] = []
  maquinaSeleccionada: MaquinaLigera

  _escaner: ScannerDepartamentoGestion

  cargando = {}
  keys = Object.keys

  @Input() set estacion(e: ScannerDepartamentoGestion) {
    this.maquinas = e.maquinas
    this._escaner = e
  }

  @Input() orden: OrdenEscaneada

  @Output() cancelar = new EventEmitter<null>()

  constructor(private folioService: FolioNewService) {}

  ngOnInit(): void {}

  guardar() {
    this.cargando['guardando'] = 'Aplicando cambios a maquinas'

    this.folioService
      .ponerOrdenATrabajarEnMaquina(
        this.orden.idOrden,
        this.orden.idPedido,
        this.orden.idFolio,
        this.maquinaSeleccionada._id,
        this._escaner.departamento._id
      )
      .subscribe(
        () => {
          delete this.cargando['guardando']
        },
        _ => delete this.cargando['guardando']
      )
  }
}
