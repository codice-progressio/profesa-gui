import {
  Component,
  OnInit,
  ViewChildren,
  ViewChild,
  ElementRef
} from '@angular/core'
import { OrdenParaAsignacion } from 'src/app/services/programacion-transformacion.service'
import { DefaultsService } from '../../../services/configDefualts/defaults.service'
import { ProgramacionTransformacionService } from '../../../services/programacion-transformacion.service'
import { DefaultModelData } from '../../../config/defaultModelData'

@Component({
  selector: 'app-programacion-transformacion',
  templateUrl: './programacion-transformacion.component.html',
  styleUrls: ['./programacion-transformacion.component.css']
})
export class ProgramacionTransformacionComponent implements OnInit {
  verComoPedido = false

  ordenes: OrdenParaAsignacion[]

  constructor(
    private defaultService: DefaultsService,
    private programacionSerivce: ProgramacionTransformacionService
  ) {}

  ngOnInit() {
    this.cargarOrdenes()
  }

  cargarOrdenes() {
    this.defaultService.cargarDefaults().subscribe(def => {
      this.programacionSerivce
        .ordenesPorAsignar(def.DEPARTAMENTOS.TRANSFORMACION)
        .subscribe(ordenes => (this.ordenes = ordenes))
    })
  }

  orden = 1
  ordenar(campo: string) {
    this.orden = this.orden * -1
    const cb = (a, b) => {
      return (a[campo] > b[campo] ? 1 : -1) * this.orden
    }
    if (this.filtroActivo) {
      this.ordenesFiltradas.sort(cb)
    } else {
      this.ordenes.sort(cb)
    }
  }

  filtroActivo = false
  ordenesFiltradas: OrdenParaAsignacion[]
  filtrar(termino: string) {
    if (!termino.trim()) {
      this.limpiarFiltro()
      return
    }

    this.filtroActivo = true
    this.ordenesFiltradas = this.ordenes.filter(x => {
      return (
        x.numeroDeOrden.toLowerCase().includes(termino) ||
        x.modeloCompleto.toLowerCase().includes(termino)
      )
    })
  }

  @ViewChild('input', { static: false }) inputTermino: ElementRef

  limpiarFiltro() {
    this.ordenesFiltradas = undefined
    this.filtroActivo = false
    this.inputTermino.nativeElement.value = ''
  }

  ordenesEnPedidos: {
    ['string']: {
      pedido: string
      ordenes: OrdenParaAsignacion[]
    }
  }

  ordenarEnPedidos() {
    this.ordenes.forEach(x => {
      let o = this.ordenesEnPedidos[x.pedido]
      if (!o) o = { pedido: x.numeroDeOrden.split('-'), ordenes: [] }
    })
  }
}
