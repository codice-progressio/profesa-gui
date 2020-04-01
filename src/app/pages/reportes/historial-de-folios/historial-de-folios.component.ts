import { Component, OnInit, Inject } from "@angular/core"
import { PaginadorService } from "src/app/components/paginador/paginador.service"
import { Folio } from "src/app/models/folio.models"
import { GrupoDeFiltroComponent } from "../../gestionDeFolios/folios/grupo-de-filtro.component"
import { FolioLinea } from "src/app/models/folioLinea.models"
import { Orden } from "src/app/models/orden.models"
import { RevisionDeOrdenesAbstractoComponent } from "../../gestionDeFolios/revision/revision-de-ordenes-abstracto/revision-de-ordenes-abstracto.component"
import { FiltrosFolio } from "src/app/services/utilidades/filtrosParaConsultas/FiltrosFolio"
import { FolioNewService } from "src/app/services/folio/folio-new.service";
import { ManejoDeMensajesService } from "src/app/services/utilidades/manejo-de-mensajes.service";
import { UsuarioService } from '../../../services/usuario/usuario.service'
import { _ROLES } from "src/app/config/roles.const";

@Component({
  selector: "app-historial-de-folios",
  templateUrl: "./historial-de-folios.component.html",
  styles: [],
  providers: [{ provide: "paginadorFolios", useClass: PaginadorService }]
})
export class HistorialDeFoliosComponent implements OnInit {
  constructor(
    public _folioService: FolioNewService,
    @Inject("paginadorFolios") public _paginadorService: PaginadorService,
    public _msjService: ManejoDeMensajesService,
    public _usuarioService: UsuarioService
  ) {
    
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
    new Promise((resolve, reject) => {
      // Esperamos a que el componenete este disponible.
      const intervalo = setInterval(() => {
        if (this.componenteFiltrador) {
          clearInterval(intervalo)
          resolve()
        }
      }, 10)
    })
      .then(() => {
        //Solo mostrar en el historial de folios los que 
        // ya se entregaron a produccion. 
        this.componenteFiltrador.entregarAProduccion = true
        // Dejamos por defecto que aparezcan solo los terminados. 
        this.componenteFiltrador.folioTerminado = true

        this._paginadorService.callback = () => {
          if (this.esNecesarioReinciarPaginador) {
            this.cargarFolios()
          } else {
            this.aplicarFiltros(this.componenteFiltrador)
          }
        }
    
        this.cargarFolios()
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
        .setFechaDeEntregaEstimadaDesdeEl(false)
        .setFechaDeEntregaEstimadaHasta(false)
    }

    // Quitamos la opcion de filtrar los entregados 
    // a produccion por que confunden un poco. 
    this.componenteFiltrador.seleccionarCamposVisibles
      .setEntregarAProduccion(false)
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

      .setEntregarAProduccion(componente.entregarAProduccion || null)
      //  No debe de tener ordenes generedas.
      .setOrdenesGeneradas(componente.ordenesGeneradas || null)

      .setFoliosTerminados(componente.folioTerminado)

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

    // this._msjService.confirmarAccion(msj, () => {
    //   this._folioService
    //     .iniciarProduccion(folio._id, false)
    //     .subscribe((folio) => {
    //       this.cargarFolios()
    //     })
    // })
  }
  generarOrdenesDelFolio(folio: Folio) {
    this.folioParaGenerarOrdenes = folio
    folio.popularOrdenesDeTodosLosPedidos(null)
  }

  generarOrdenes(folio: Folio) {
    this.folios = []
    folio.ordenesGeneradas = true
    folio.limpiarParaOrdenesGeneradas()

    this._folioService
      .modificar(folio)
      .toPromise()
      .then((folio) => {
        setTimeout(() => {
          this.cargarFolios()
        }, 1000)
      })
  }

  revisionDeOrdenesCargarComponente(com: RevisionDeOrdenesAbstractoComponent) {
    this.componenteRevisionDeOrdenes = com
  }

  customTB(index, folio) {
    return `${index}-${folio._id}`
  }

  tienePermiso(): boolean {
    return this._usuarioService.usuario.role.includes(
      _ROLES.ADMINISTRADOR_FOLIOS_ELIMINAR_POR_COMPLETO
    )
  }

  eliminarFolio(folio: Folio) {
    let msj =
      "Esta accion no se puede deshacer. Estas seguro que la quieres llevar a cabo. "

    let msj1 =
      "Eliminar este folio debe ser siempre la ultima opcion. Aun asi deseas continuar?"

    this._msjService.confirmacionDeEliminacion(msj, () => {
      this._msjService.confirmacionDeEliminacion(msj1, () => {
        this._folioService
          .eliminar(folio._id)
          .subscribe(() => this.cargarFolios())
      })
    })
  }
}
