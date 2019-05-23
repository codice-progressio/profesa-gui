import { Component, OnInit, Inject } from "@angular/core"
import { Folio } from "src/app/models/folio.models"
import { GrupoDeFiltroComponent } from "../../folios/grupo-de-filtro.component"
import { FolioNewService } from "../../../../services/folio/folio-new.service"
import { PaginadorService } from "src/app/components/paginador/paginador.service"
import { FiltrosFolio } from "src/app/services/utilidades/filtrosParaConsultas/FiltrosFolio"
import { FolioLinea } from "../../../../models/folioLinea.models"
import { Orden } from "src/app/models/orden.models"
import { RevisionDeOrdenesAbstractoComponent } from "../revision-de-ordenes-abstracto/revision-de-ordenes-abstracto.component"
import { ManejoDeMensajesService } from "src/app/services/utilidades/manejo-de-mensajes.service";

@Component({
  selector: "app-revision-de-folios",
  templateUrl: "./revision-de-folios.component.html",
  styles: [],
  providers: [{ provide: "paginadorFolios", useClass: PaginadorService }]
})
export class RevisionDeFoliosComponent implements OnInit {
  constructor(
    public _folioService: FolioNewService,
    @Inject("paginadorFolios") public _paginadorService: PaginadorService,
    public _msjService: ManejoDeMensajesService
  ) {
    this._paginadorService.callback = () => {
      if (this.esNecesarioReinciarPaginador) {
        this.cargarFolios()
      } else {
        this.aplicarFiltros(this.componenteFiltrador)
      }
    }

    this.cargarFolios()
  }
  folios: Folio[] = []
  componenteFiltrador: GrupoDeFiltroComponent
  verComoPedidos: boolean = false
  folioParaDetalle: Folio
  pedidoParaDetalle: FolioLinea
  ordenParaDetalle: Orden

  componenteRevisionDeOrdenes: RevisionDeOrdenesAbstractoComponent

  esNecesarioReinciarPaginador: boolean

  actualizarVista: boolean = false

  /**
   *El folio del cual se generaran ordenes.
   *
   * @type {Folio}
   * @memberof RevisionDeFoliosComponent
   */
  folioParaGenerarOrdenes: Folio = null

  ngOnInit() {
    new Promise((resolve) => {
      // Esperamos a que el componenete este disponible.
      const intervalo = setInterval(() => {
        if (this.componenteFiltrador) {
          clearInterval(intervalo)
          resolve()
        }
      }, 10)
    })
      .then(() => {
        // Definimos los componentes que deban existir.
        this.mostrarFiltros()
      })
      .catch((err) => {
        throw err
      })
  }

  mostrarFiltros(paraPedidos: boolean = false) {
    this.componenteFiltrador.limpiar()
    this.componenteFiltrador.seleccionarCamposVisibles.mostrarTodo()
    if (!paraPedidos) {
      this.componenteFiltrador.seleccionarCamposVisibles
        .setPedido(false)
        .setModelo(false)
        .setTamano(false)
        .setColor(false)
        .setTerminado(false)
    }

    this.componenteFiltrador.seleccionarCamposVisibles
      .setFechaDeEntregaEstimadaDesdeEl(false)
      .setFechaDeEntregaEstimadaHasta(false)
      .setFechaFinalizacionDelFolioHasta(false)
      .setFechaFinalizacionDelFolioDesdeEl(false)
      .setOrdenesGeneradas( false )
      .setEntregarAProduccion( false )
  }

  cambiarVerComoPedidos(val: boolean) {
    this.verComoPedidos = val
    this.mostrarFiltros(val)
  }

  reiniciarPaginador() {
    this._paginadorService.limite = 5
    this._paginadorService.desde = 0
    this._paginadorService.actual = 1
  }

  aplicarFiltros(componente: GrupoDeFiltroComponent) {
    this.actualizarVista = true
    if (this.esNecesarioReinciarPaginador) {
      this.reiniciarPaginador()
      this.esNecesarioReinciarPaginador = false
    }

    this._folioService
      .filtros(new FiltrosFolio(this._folioService))
      .setVendedor(
        componente.vendedorSeleccionado
          ? componente.vendedorSeleccionado._id
          : null
      )

      .setFolio(componente.folio ? componente.folio : null)
      .setPedido(componente.pedido ? componente.pedido : null)
      .setCliente(
        componente.clienteSeleccionado
          ? componente.clienteSeleccionado._id
          : null
      )

      // Estos solo se aplican cuando la opcion de este
      .setModelo(
        componente.modeloSeleccionado ? componente.modeloSeleccionado._id : null
      )
      .setTamano(
        componente.tamanoSeleccionado ? componente.tamanoSeleccionado._id : null
      )
      .setColor(
        componente.colorSeleccionado ? componente.colorSeleccionado._id : null
      )
      .setTerminado(
        componente.terminadoSeleccionado
          ? componente.terminadoSeleccionado._id
          : null
      )

      .setFechaDeCreacionDesdeEl(
        componente.fechaDeCreacionDesdeEl
          ? new Date(componente.fechaDeCreacionDesdeEl).toISOString()
          : null
      )
      .setFechaDeCreacionHasta(
        componente.fechaDeCreacionHasta
          ? new Date(componente.fechaDeCreacionHasta).toISOString()
          : null
      )
      // Defaults de revisioon de folios.
      // Debe tener la bandera de entrega a produccion.
      .setEntregarAProduccion(true)
      //  No debe de tener ordenes generedas.
      .setOrdenesGeneradas(false)

      // Paginador
      .setDesde(this._paginadorService.desde)
      .setLimite(this._paginadorService.limite)
      .setSortCampos([["fechaDeEntregaAProduccion", -1]])
      .servicio.todo()
      .subscribe((folios) => {
        this.folios = []
        this.folios = folios
        this._paginadorService.activarPaginador(this._folioService.total)
        this.actualizarVista = false
      })

  }
  /**
   *Filtra por los folios que ya se han mandado a producir. Hace la diferencia con los
   que todavia estan registrandose. 
   *
   * @memberof FoliosComponent
   */
  cargarFolios() {
    this.esNecesarioReinciarPaginador = true
    let interval = setInterval(() => {
      if (this.componenteFiltrador) {
        clearInterval(interval)
        this.aplicarFiltros(this.componenteFiltrador)
      }
    }, 10)
  }

  calcularTotalDePiezas(folio: Folio): number {
    let total = 0
    folio.folioLineas.map((ped) => {
      total += ped.cantidad
    })
    return total
  }

  /**
   *Retorna el control del folio al vendedor eliminando
   la fecha de producccion y la bandera de entregar a produccion. 
   *
   * @param {Folio} folio
   * @memberof RevisionDeFoliosComponent
   */
  retornarControlDeFolioAVendedor(folio: Folio) {
    const msj = `Vas a retornar el folio a ${folio.vendedor.nombre}. 
    Esto significa que la fecha para produccion se eliminara y 
    el vendedor tendra disponible el folio para editarlo. Quieres continuar?`

    this._msjService.confirmarAccion(msj, () => {
      this._folioService
        .iniciarProduccion(folio._id, false)
        .subscribe(() => {
          this.cargarFolios()
        })
    })
  }
  generarOrdenesDelFolio(folio: Folio) {
    this.folioParaGenerarOrdenes = folio
    folio.popularOrdenesDeTodosLosPedidos()
  }

  generarOrdenes(folio: Folio) {
    this.folios = []
    folio.ordenesGeneradas = true
    folio.limpiarParaOrdenesGeneradas()

    this._folioService
      .modificar(folio)
      .toPromise()
      .then(() => {
        setTimeout( ()=>{
          this.cargarFolios()

        }, 1000 )
      })
  }

  revisionDeOrdenesCargarComponente(com: RevisionDeOrdenesAbstractoComponent) {
    this.componenteRevisionDeOrdenes = com
  }

  customTB(index, folio) {
    return `${index}-${folio._id}`
  }
}
