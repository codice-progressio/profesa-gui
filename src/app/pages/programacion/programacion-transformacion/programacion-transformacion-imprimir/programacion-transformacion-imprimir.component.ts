import { Component, OnInit, Input } from '@angular/core'
import { Maquina } from 'src/app/models/maquina.model'
import {
  ProgramacionTransformacionService,
  OrdenParaAsignacion
} from '../../../../services/programacion-transformacion.service'
import { DefaultsService } from '../../../../services/configDefualts/defaults.service'
import { Orden } from '../../../../models/orden.models'
import { Observable, forkJoin } from 'rxjs'
import { Departamento } from '../../../../models/departamento.models'
import { iEstaDisponible } from '../../../../services/programacion-transformacion.service'

@Component({
  selector: 'app-programacion-transformacion-imprimir',
  templateUrl: './programacion-transformacion-imprimir.component.html',
  styleUrls: ['./programacion-transformacion-imprimir.component.css']
})
export class ProgramacionTransformacionImprimirComponent implements OnInit {
  transformacion: string

  @Input() maquinas: Maquina[] = []

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

  ordenesDisponibles(
    maquinas: Maquina[],
    idTr: string
  ): Observable<iEstaDisponible>[] {
    const subs: Observable<iEstaDisponible>[] = []

    maquinas.forEach(m =>
      m.pila.forEach(p => {
        subs.push(this.ps.estaDisponible(p.orden, p.pedido, p.folio, idTr))
      })
    )

    return subs
  }
}
