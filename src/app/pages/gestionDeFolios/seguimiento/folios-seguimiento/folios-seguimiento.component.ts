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
    private msjService: ManejoDeMensajesService
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

  async imprimirFolio(idFolio: string, pedido: iPedidosConsulta) {
    let idPedido = pedido.idPedido
    if (this.departamentoService.pool.length === 0)
      await this.departamentoService.findAllPoolObservable().toPromise()

    this.folioService.findById(idFolio).subscribe(folio => {
      folio.folioLineas
        .find(x => x._id === idPedido)
        .ordenes.forEach(x => {
          x.ruta.forEach(r =>
            this.departamentoService.popularRutaConDepartamento(r)
          )
        })

      let ordenes = folio.folioLineas
        .find(x => x._id === idPedido)
        .ordenes.map(x => x._id)

      this.impresionService.ordenes(ordenes).seleccionarFolio(folio).imprimir()

      window.onafterprint = () => {
        this.folioService
          .marcarPedidosComoImpresos([
            {
              folio: idFolio,
              pedidos: [idPedido]
            }
          ])
          .subscribe(() => {
            pedido.impreso = true
          })
      }
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
        // this.impresionService.ordenesVariosPedidos(ordenes).imprimir()

        // throw ' No se a defindo la marca de impresos'
        // window.onafterprint = () => {
        //   this.folioService
        //     .marcarPedidosComoImpresos([
        //       {
        //         folio: idFolio,
        //         pedidos: [idPedido]
        //       }
        //     ])
        //     .subscribe(() => {
        //       pedido.impreso = true
        //     })
        // }
      })
  }
}
