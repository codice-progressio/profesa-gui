import { Component, OnInit, Input } from '@angular/core'
import { Maquina } from 'src/app/models/maquina.model'
import {
  ProgramacionTransformacionService,
  OrdenParaAsignacion
} from '../../../../services/programacion-transformacion.service'
import { DefaultsService } from '../../../../services/configDefualts/defaults.service'

@Component({
  selector: 'app-programacion-transformacion-imprimir',
  templateUrl: './programacion-transformacion-imprimir.component.html',
  styleUrls: ['./programacion-transformacion-imprimir.component.css']
})
export class ProgramacionTransformacionImprimirComponent implements OnInit {
  transformacion: string

  @Input() maquinas: Maquina[] = []

  ordenDetalle: OrdenParaAsignacion = null
  termino = {
    1: 'er',
    2: 'do',
    3: 'er',
    4: 'to',
    5: 'to'
  }

  constructor(
    public ps: ProgramacionTransformacionService,
    public dfs: DefaultsService
  ) {}

  ngOnInit(): void {}

}
