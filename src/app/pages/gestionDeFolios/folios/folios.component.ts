import { Component, OnInit, OnDestroy } from '@angular/core'
import { Folio } from 'src/app/models/folio.models'
import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import 'moment-duration-format'
import { FolioNewService } from 'src/app/services/folio/folio-new.service'
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service'
import { UsuarioService } from 'src/app/services/usuario/usuario.service'
import {
  PedidosConsulta,
  FoliosPendientesDeEntregarAProduccion
} from '../../../services/folio/folio-new.service'
import { forkJoin } from 'rxjs'
import { Paginacion } from '../../../utils/paginacion.util'
import { Usuario } from '../../../models/usuario.model'
import { FolioService } from '../../../services/folio/folio.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-folios',
  templateUrl: './folios.component.html',
  styleUrls: ['./folios.component.css']
})
export class FoliosComponent implements OnInit {
  pedidosEnProceso: PedidosConsulta[] = []
  pedidosTerminados: PedidosConsulta[] = []
  foliosPorEnviarAProduccion: FoliosPendientesDeEntregarAProduccion[] = []

  filtros: string[] = []
  cargando = {}
  keys = Object.keys
  folioParaDetalle: Folio

  paginadorTerminados = new Paginacion(3000, 0, 1, 'pedido')
  paginadorEnProceso = new Paginacion(3000, 0, 1, 'pedido')
  paginadorPorEnviarProduccion = new Paginacion(3000, 0, 1, 'pedido')

  usuario: Usuario

  constructor(
    public foliosService: FolioNewService,
    public msjService: ManejoDeMensajesService,
    public usuarioService: UsuarioService,
    public router: Router
  ) {
    // Sobre escribimos el mensaje de eliminacion.
  }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario
    this.cargarPedidosEnProceso()
  }

  limpiarPedidos() {
    this.pedidosEnProceso = []
    this.pedidosTerminados = []
    this.foliosPorEnviarAProduccion = []
  }

  cargarPedidosEnProceso() {
    this.limpiarPedidos()
    this.cargando['enProceso'] = 'Cargando pedidos en proceso'

    const filtro = `vendedor=${this.usuario._id}`
      .concat(`&folioLineas.terminado=false`)
      .concat(`&ordenesGeneradas=true`)
      .concat(`&entregarAProduccion=true`)

    this.foliosService
      .find(this.paginadorEnProceso, filtro)
      .subscribe(pedidos => {
        this.pedidosEnProceso = pedidos
        if (pedidos) this.filtros = this.pedidosEnProceso.map(x => x.idPedido)
        delete this.cargando['enProceso']
      })
  }

  cargarFoliosPorEnviarAProduccion() {
    this.limpiarPedidos()
    this.cargando['porEnviarAProduccion'] =
      'Cargando folios pendientes de enviar a produccion'

    this.foliosService
      .foliosPendientesDeEntregarAProduccion(this.usuario._id)
      .subscribe(folios => {
        this.foliosPorEnviarAProduccion = folios
        if (folios)
          this.filtros = this.foliosPorEnviarAProduccion.map(x => x._id)
        delete this.cargando['porEnviarAProduccion']
      })
  }
  cargarPedidosTerminados() {
    this.limpiarPedidos()
    this.cargando['terminados'] = 'Cargando pedidos terminados'

    const filtro = `vendedor=${this.usuario._id}`
      .concat(`&folioLineas.terminado=true`)
      .concat(`&ordenesGeneradas=true`)
      .concat(`&entregarAProduccion=true`)

    this.foliosService
      .find(this.paginadorTerminados, filtro)
      .subscribe(pedidos => {
        this.pedidosTerminados = pedidos
        if (pedidos) this.filtros = this.pedidosTerminados.map(x => x.idPedido)
        delete this.cargando['terminados']
      })
  }

  filtrar(termino: string, arreglo: PedidosConsulta[]) {
    this.filtros = []
    termino = termino.trim()

    this.filtros = arreglo
      .map(x =>
        ''
          .concat(x.pedido)
          .concat(' ' + x.sku)
          .concat(' ' + x.cliente)
          .concat(' ' + x.vendedor)
          .concat(' ' + x.folio)
          .toLowerCase()
          .concat(' @@@' + x.idPedido)
      )
      .filter(x => x.includes(termino.toLowerCase()))
      .map(x => x.split('@@@')[1])
  }

  cargarFolioDetalle(id: string) {
    this.folioParaDetalle = null
    this.foliosService.findById(id).subscribe(fol => {
      this.folioParaDetalle = fol
    })
  }

  eliminar(id: string) {
    this.msjService.confirmacionDeEliminacion(
      'No podras recuperar la informacion que llevas. ',
      () => {
        this.cargando['eliminado'] = 'Eliminando folio en proceso'
        this.foliosService.delete(id).subscribe(
          fol => {
            this.cargarFoliosPorEnviarAProduccion()
            delete this.cargando['eliminado']
          },
          () => delete this.cargando['eliminado']
        )
      }
    )
  }

  editar(id: string) {
    this.router.navigate(['ventas', 'misFolios', 'editar', id])
  }

  /**
   * Envia a producir el folio que corresponda al id
   * que se pase como paramentro.
   *
   * @param {string} id
   * @memberof FoliosComponent
   */
  enviarAProduccion(id: string) {
    let mensajeDeConfirmacion = `Una vez que envies el folio a producion
    no sera posible hacer ninguna modificacion. Tampoco podras
    eliminarlo directamente. Sera necesario que control de produccion
    elimine el folio. Aun asi quieres continuar?`
    let mensajeDeCancelacion = `No se mando a produccion el folio.`
    this.msjService.confirmarAccion(mensajeDeConfirmacion, () => {
      this.cargando['mandarAProduccion'] = 'Enviando folio a produccion'
      this.foliosService.revision_iniciarProduccion(id).subscribe(() => {
        delete this.cargando['mandarAProduccion']
        this.cargarFoliosPorEnviarAProduccion()
      }, err=> delete this.cargando['mandarAProduccion']),
        mensajeDeCancelacion
    })
  }
}
