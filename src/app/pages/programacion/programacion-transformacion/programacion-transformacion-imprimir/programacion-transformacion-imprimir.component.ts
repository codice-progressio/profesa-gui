import { Component, OnInit, Input } from '@angular/core'
import { Maquina } from 'src/app/models/maquina.model'
import {
  ProgramacionTransformacionService,
  OrdenParaAsignacion
} from '../../../../services/programacion-transformacion.service'
import { DefaultsService } from '../../../../services/configDefualts/defaults.service'
import { Orden } from '../../../../models/orden.models'

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
  ) {
    dfs.cargarDefaults().subscribe(def => {
      this.transformacion = def.DEPARTAMENTOS.TRANSFORMACION
    })
  }

  ngOnInit(): void {
    const interval = setInterval(
      () => {
        if (this.maquinas.length > 0 && this.transformacion) {
          clearInterval(interval)
          this.ordenesDisponibles(this.maquinas, this.transformacion)
        }
      },

      10
    )
  }

  ordenesDisponibles(maquinas: Maquina[], idTr: string) {
    maquinas
      .filter(m => m.pila.length > 0)
      .reduce((a, b) => a.concat(b.pila), new Array<OrdenParaAsignacion>())
      .forEach(x => {
        this.ps
          .estaDisponible(x.orden, x.pedido, x.folio, idTr)
          .subscribe(a => (x.disponible = a))
      })
  }
}
