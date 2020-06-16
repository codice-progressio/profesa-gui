import { Component, OnInit } from '@angular/core'
import { Folio } from 'src/app/models/folio.models'
import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import { FolioNewService } from 'src/app/services/folio/folio-new.service'
import { iPedidosConsulta } from '../../../../services/folio/folio-new.service'
import { Paginacion } from '../../../../utils/paginacion.util'
import { ImpresionService } from '../../../../services/impresion.service'

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
    private impresionService: ImpresionService
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

  imprimirFolio(idFolio: string, idPedido: string) {
    this.folioService.findById(idFolio).subscribe(folio => {
      let ordenes = folio.folioLineas
        .find(x => x._id === idPedido)
        .ordenes.map(x => x._id)

      this.impresionService.ordenes(ordenes).seleccionarFolio(folio).imprimir()
    })
  }
}
