import { Component, OnInit, Inject } from '@angular/core'
import { Folio } from 'src/app/models/folio.models'
import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import { GrupoDeFiltroComponent } from '../../folios/grupo-de-filtro.component'
import { FolioLinea } from 'src/app/models/folioLinea.models'
import { Orden } from 'src/app/models/orden.models'
import { RevisionDeOrdenesAbstractoComponent } from '../../revision/revision-de-ordenes-abstracto/revision-de-ordenes-abstracto.component'
import { FiltrosFolio } from 'src/app/services/utilidades/filtrosParaConsultas/FiltrosFolio'
import { FolioNewService } from 'src/app/services/folio/folio-new.service'
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service'
import { iPedidosConsulta } from '../../../../services/folio/folio-new.service'
import { Paginacion } from '../../../../utils/paginacion.util'

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

  constructor(public folioService: FolioNewService) {}

  ngOnInit() {
    this.cargarPedidos()
  }

  cargarPedidos() {
    this.cargando['cargando'] = 'Cargando pedidos en proceso'

    let filtros = [
      'folioLineas.ordenesGeneradas=true',
      'folioLineas.terminado=false',
      'terminado=false'
    ]

    this.folioService.findAll(this.paginacion, filtros.join('&')).subscribe(
      pedidos => {
        this.pedidos = pedidos

        this.mostrar = pedidos.map(x => x.pedido)

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
}
