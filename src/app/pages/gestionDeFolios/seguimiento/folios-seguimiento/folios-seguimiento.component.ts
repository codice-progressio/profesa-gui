import { Component, OnInit } from '@angular/core'
import { Folio } from 'src/app/models/folio.models'
import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import { FolioNewService } from 'src/app/services/folio/folio-new.service'
import {
  iPedidosConsulta,
  OrdenImpresion
} from '../../../../services/folio/folio-new.service'
import { Paginacion } from '../../../../utils/paginacion.util'
import { ImpresionService } from '../../../../services/impresion.service'
import { DepartamentoService } from '../../../../services/departamento/departamento.service'
import { ManejoDeMensajesService } from '../../../../services/utilidades/manejo-de-mensajes.service'
import { ReportesProduccionService } from '../../../../services/reportes/reportes-produccion.service'
import { ExcelService } from '../../../../services/excel.service'

@Component({
  selector: 'app-folios-seguimiento',
  templateUrl: './folios-seguimiento.component.html',
  providers: [{ provide: 'paginadorFolios', useClass: PaginadorService }]
})
export class FoliosSeguimientoComponent implements OnInit {
  cargando = {}
  keys = Object.keys
  pedidos: iPedidosConsulta[] = []

  paginacion = new Paginacion(5000, 0, 1, 'fechaDeEntregaAProduccion')
  folioDetalle: Folio

  constructor(
    public folioService: FolioNewService,
    private impresionService: ImpresionService,
    private departamentoService: DepartamentoService,
    private msjService: ManejoDeMensajesService,
    private reporteService: ReportesProduccionService,
    private excelService: ExcelService
  ) {}

  ngOnInit() {
    this.cargarPedidos()
  }

  cargarPedidos() {
    this.cargando['cargando'] = 'Cargando pedidos en proceso'

    let filtros = [
      'folioLineas.ordenesGeneradas=true',
      'folioLineas.terminado=false'
      // 'terminado=false'
    ]

    this.folioService.findAll(this.paginacion, filtros.join('&')).subscribe(
      pedidos => {
        this.pedidos = pedidos

        this.mostrar = pedidos.map(x => x.pedido)
        this.pedidos = this.pedidos.map(x => {
          x.laserCliente = x.laserCliente ? x.laserCliente : x.laserSKU
          return x
        })

        delete this.cargando['cargando']
      },
      _ => delete this.cargando['cargando']
    )
  }

  mostrar = []

  filtrar(termino: string) {
    let t = termino.trim().toLowerCase()
    if (!t) {
      this.mostrar = this.pedidos.map(x => x.pedido)
    }

    this.mostrar = this.pedidos
      .map(x => {
        return (
          x.pedido +
          '@@@' +
          x.folio +
          '@@@' +
          x.cliente +
          '@@@' +
          x.idCliente +
          '@@@' +
          x.vendedor +
          '@@@' +
          x.cantidadProducidaFolio +
          '@@@' +
          x.cantidadProducidaPedido +
          '@@@' +
          x.sku +
          '@@@' +
          x.laserCliente
        ).toLowerCase()
      })
      .filter(x => x.includes(termino))
      .map(x => x.split('@@@')[0])
  }

  detalleFolio(id) {
    this.folioDetalle = null
    this.folioService.findById(id).subscribe(folio => {
      this.folioDetalle = folio
    })
  }

  imprimirFolio(folio: string, pedido: string) {
    this.folioService
      .findAllOrdenesDePedidos([{ folio, pedido }])
      .subscribe(ordenes => {
        this.impresionService.ordenesVariosPedidos(ordenes).imprimir()

        let datos = this.ordenesParaMarcarImpreso(ordenes)
        this.marcarPedidosComoImpresos(datos)
      })
  }

  imprimiendoVarios = false

  listaPorImprimir: {
    folio: string
    pedido: string
    iPedido: iPedidosConsulta
  }[] = []

  imprimirVarios() {
    this.imprimiendoVarios = !this.imprimiendoVarios
    this.listaPorImprimir = []
  }
  existeRegistroImprimir(folio, pedido): boolean {
    return !!this.listaPorImprimir.find(
      x => x.folio === folio && x.pedido === pedido
    )
  }

  agregarPedido(folio: string, iPedido: iPedidosConsulta) {
    let pedido = iPedido.idPedido
    let existeRegistro = this.existeRegistroImprimir(folio, pedido)
    if (!existeRegistro) {
      this.listaPorImprimir.push({ pedido, folio, iPedido })
    } else {
      this.listaPorImprimir = this.listaPorImprimir.filter(
        x => !(x.folio === folio && x.pedido === pedido)
      )
    }
  }

  datos: OrdenImpresion[]
  async imprimirSeleccionados() {
    if (this.listaPorImprimir.length === 0) {
      this.msjService.invalido('No has seleccionado pedidos para imprimir')

      return
    }

    this.folioService
      .findAllOrdenesDePedidos(
        this.listaPorImprimir.map(x => {
          return { folio: x.folio, pedido: x.pedido }
        })
      )
      .subscribe(ordenes => {
        this.datos = ordenes
        this.impresionService.ordenesVariosPedidos(ordenes).imprimir()

        let datosParaMarcar = this.ordenesParaMarcarImpreso(ordenes)
        this.marcarPedidosComoImpresos(datosParaMarcar)
      })
  }

  private ordenesParaMarcarImpreso(
    ordenes: OrdenImpresion[]
  ): {
    folio: string
    pedidos: string[]
  }[] {
    let datosImpresos = ordenes.reduce((a, b) => {
      if (!a.hasOwnProperty(b.idFolio)) a[b.idFolio] = []
      a[b.idFolio].push(b.idPedido)
      return a
    }, {})

    let datosParaMarcar = Object.keys(datosImpresos).map(k => {
      return {
        folio: k,
        pedidos: datosImpresos[k]
      }
    })

    return datosParaMarcar
  }

  private marcarPedidosComoImpresos(datosParaMarcar) {
    window.onafterprint = () => {
      this.folioService
        .marcarPedidosComoImpresos(datosParaMarcar)
        .subscribe(() => {
          datosParaMarcar.forEach(x => {
            this.pedidos
              .filter(ped => x.pedidos.includes(ped.idPedido))
              .forEach(ped => (ped.impreso = true))
          })
        })
    }
  }

  limiteInferior: Date
  limiteSuperior: Date

  generarReporteTiemposDeProceso() {
    if (!this.limiteInferior || !this.limiteSuperior) {
      this.msjService.toastErrorMensaje('Debes definir los limites del rango')
      return
    }

    this.reporteService
      .tiemposDeProceso(this.limiteInferior, this.limiteSuperior)
      .subscribe(ordenes => {
        this.excelService.exportAsExcelFile(ordenes, 'Tiempos de Proceso')
      })
  }
}
