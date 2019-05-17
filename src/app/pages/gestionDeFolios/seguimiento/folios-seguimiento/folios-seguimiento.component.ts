import { Component, OnInit, Inject } from "@angular/core"
import { Folio } from "src/app/models/folio.models"
import { PaginadorService } from "src/app/components/paginador/paginador.service"
import { GrupoDeFiltroComponent } from "../../folios/grupo-de-filtro.component"
import { FolioLinea } from "src/app/models/folioLinea.models"
import { Orden } from "src/app/models/orden.models"
import { RevisionDeOrdenesAbstractoComponent } from "../../revision/revision-de-ordenes-abstracto/revision-de-ordenes-abstracto.component"
import { FiltrosFolio } from "src/app/services/utilidades/filtrosParaConsultas/FiltrosFolio"
import { FolioNewService } from "src/app/services/folio/folio-new.service";
import { ManejoDeMensajesService } from "src/app/services/utilidades/manejo-de-mensajes.service";

@Component({
  selector: "app-folios-seguimiento",
  templateUrl: "./folios-seguimiento.component.html",
  providers: [{ provide: "paginadorFolios", useClass: PaginadorService }]
})
export class FoliosSeguimientoComponent implements OnInit {
  /**
   *La lista de folios resultado de la consulta.
   *
   * @type {Folio[]}
   * @memberof FoliosSeguimientoComponent
   */
  folios: Folio[] = []
  /**
   *El componente que funge como filtrador.
   *
   * @type {GrupoDeFiltroComponent}
   * @memberof FoliosSeguimientoComponent
   */
  componenteFiltrador: GrupoDeFiltroComponent
  /**
   *Bandera que senala si los pedidos se visualizan
  como tal o como el conjunto del folios. Sirve
  para desplegar en el html mas o menos opciones y
  tambien para definir los filtros que se van a mostrar
  en el grupo filtrador. 
   *
   * @type {boolean}
   * @memberof FoliosSeguimientoComponent
   */
  verComoPedidos: boolean = false
  /**
   *El folio seleccionado para detalle. No se carga
  desde la BD, si no que se obtiene de la lista de
  consultados. 
   *
   * @type {Folio}
   * @memberof FoliosSeguimientoComponent
   */
  folioParaDetalle: Folio
  /**
   *El pedido para mostrar detalle. Este lo emite
  el componente de folios detalle. 
   *
   * @type {FolioLinea}
   * @memberof FoliosSeguimientoComponent
   */
  pedidoParaDetalle: FolioLinea
  /**
   *La orden para mostrar el detalle. Esta lo emite
  el componente de pedidos detalle. 
   *
   * @type {Orden}
   * @memberof FoliosSeguimientoComponent
   */
  ordenParaDetalle: Orden

  /**
   *Bandera que senala cuando es necesario reiniciar el componente. 
  Cuando se pone en true el paginador se reinicia en la siguiente consulta. 
   *
   * @type {boolean}
   * @memberof FoliosSeguimientoComponent
   */
  esNecesarioReinciarPaginador: boolean

  /**
   *Bandera para activar animacion de boton actualizar.
   *
   * @type {boolean}
   * @memberof FoliosSeguimientoComponent
   */
  actualizarVista: boolean = false
  constructor(
    public _folioService: FolioNewService,
    @Inject("paginadorFolios") public _paginadorService: PaginadorService,
    public _msjService: ManejoDeMensajesService
  ) {
    
  }

  /**
   *El folio del cual se generaran ordenes.
   *
   * @type {Folio}
   * @memberof RevisionDeFoliosComponent
   */
  folioParaGenerarOrdenes: Folio = null

  ngOnInit() {
    new Promise((resolve, reject) => {
      // Esperamos a que el componenete este disponible.
      const intervalo = setInterval(() => {
        if (this.componenteFiltrador) {
          // Seteamos en false el componenete para que a la
          // hora de cargar los folios no nos traiga los terminados
          // hasta que el usuario asi lo defina
          // Esta linea tiene que ir aqui por que esperamos a sincronizar el componente para poder modificar sus propiedades.
          this.componenteFiltrador.folioTerminado = false
          // ---------------------------------------------

          this._paginadorService.callback = () => {
            if (this.esNecesarioReinciarPaginador) {
              this.cargarFolios()
            } else {
              this.aplicarFiltros(this.componenteFiltrador)
            }
          }
      
          this.cargarFolios()
          
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
    if (this.esNecesarioReinciarPaginador) {
      this.reiniciarPaginador()
      this.esNecesarioReinciarPaginador = false
    }

    // console.log("entregarAProduccion", componente.entregarAProduccion)
    // console.log("ordenesGeneradas", componente.ordenesGeneradas)
    // console.log(false)
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

      // Aqui este siempre debe ser true

      .setEntregarAProduccion(
        componente.entregarAProduccion !== null
          ? componente.entregarAProduccion
          : null
      )
      .setOrdenesGeneradas(
        componente.ordenesGeneradas !== null
          ? componente.ordenesGeneradas
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
      .setFoliosTerminados(componente.folioTerminado)

      // Paginador
      .setDesde(this._paginadorService.desde)
      .setLimite(this._paginadorService.limite)
      .setSortCampos([["fechaDeEntregaAProduccion", -1]])
      .servicio.todo()
      .subscribe((folios) => {
        this.folios = folios
        this._paginadorService.activarPaginador(this._folioService.total)
        this.actualizarVista = false

        this.esNecesarioReinciarPaginador = false
      })
  }
  /**
   *Filtra por los folios que ya se han mandado a producir. Hace la diferencia con los
   que todavia estan registrandose. 
   *
   * @memberof FoliosComponent
   */
  cargarFolios() {
    this.actualizarVista = true

    this.esNecesarioReinciarPaginador = true
    let intervalo = setInterval(() => {
      if (this.componenteFiltrador) {
        clearInterval(intervalo)
        this.aplicarFiltros(this.componenteFiltrador)
      }
    }, 10)
  }

  marcarImpreso() {
    // El timeout es para que no
    // salga impreso la notificaicion de error
    // o de success.
    setTimeout(() => {
      this._folioService
        .ordenesImpresas(this.folioParaDetalle._id)
        .subscribe(() => {
          this.folioParaDetalle.impreso = true
        })
    }, 500)
  }
}
