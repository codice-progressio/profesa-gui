import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { RequisicionCamposParaMostrarEnFiltro } from './requisicion-campos-para-mostrar-en-filtro'
import { Usuario } from '../../../../models/usuario.model'
import { ArticuloService } from '../../../../services/articulo/articulo.service'
import { DataListComponent } from '../../../../shared/data-list/data-list.component'
import { Dato } from 'src/app/shared/data-list/dato.model'
import { Articulo } from 'src/app/models/almacenDeMateriaPrimaYHerramientas/articulo.modelo'
import { UsuarioService } from '../../../../services/usuario/usuario.service'
import { Paginacion } from 'src/app/utils/paginacion.util'

@Component({
  selector: 'app-requisicion-filtros',
  templateUrl: './requisicion-filtros.component.html',
  styles: []
})
export class RequisicionFiltrosComponent implements OnInit {
  /**
   *Emite los datos que se seleccionaron para filtrar cuando se pulsa el boton de filtro.
   *
   * @memberof RequisicionFiltrosComponent
   */
  @Output() obtenerFiltros = new EventEmitter<string>()

  @Output() obtenerEsteComponente = new EventEmitter<this>()

  seleccionarCamposVisibles = new RequisicionCamposParaMostrarEnFiltro()

  /**
   * Numero de folio desde el cual se va a empezar a buscar.
   *
   * @type {number}
   * @memberof RequisicionFiltrosComponent
   */
  folioDesde: number = null
  /**
   *Numero de folio hasta el cual se va a limitar la busqueda
   *
   * @type {number}
   * @memberof RequisicionFiltrosComponent
   */
  folioHasta: number = null
  /**
   *El id del usuario que hizo la modificacion.(Se toma desde el historial)
   *
   * @type {Usuario}
   * @memberof RequisicionFiltrosComponent
   */
  usuario: Usuario = null
  /**
   *Es materia prima
   *
   * @type {boolean}
   * @memberof RequisicionFiltrosComponent
   */
  materiaPrima: boolean = null
  /**
   *Es un consumible
   *
   * @type {boolean}
   * @memberof RequisicionFiltrosComponent
   */
  consumibles: boolean = null
  /**
   *Es un gasto y servicio.
   *
   * @type {boolean}
   * @memberof RequisicionFiltrosComponent
   */
  gastosYServicios: boolean = null

  /**
   *El id del articulo.
   *
   * @type {Articulo}
   * @memberof RequisicionFiltrosComponent
   */
  articulo: Articulo = null
  /**
   *Estatus actual requisicion.
   *
   * @type {boolean}
   * @memberof RequisicionFiltrosComponent
   */
  estatus_esRequisicion: boolean = null
  /**
   *Estatus actual es orden de compra.
   *
   * @type {boolean}
   * @memberof RequisicionFiltrosComponent
   */
  estatus_esOrdenDeCompra: boolean = null
  /**
   *Si es orde de compra fecha desde la cual se genero
   *
   * @type {Date}
   * @memberof RequisicionFiltrosComponent
   */
  estatus_fechaDeGeneracionDeOrdenDeCompraDesde: Date = null
  /**
   *Si es orden de compra fecha hasta la cual limitar
   *
   * @type {Date}
   * @memberof RequisicionFiltrosComponent
   */
  estatus_fechaDeGeneracionDeOrdenDeCompraHasta: Date = null
  /**
   *Si es terminada fecha de entrada de almacen desde.
   *
   * @type {Date}
   * @memberof RequisicionFiltrosComponent
   */
  estatus_fechaTerminoYEntradaAlmacenDesde: Date = null
  /**
   *Si es terminada fecha de entrada desde el almacen.
   *
   * @type {Date}
   * @memberof RequisicionFiltrosComponent
   */
  estatus_fechaTerminoYEntradaAlmacenHasta: Date = null
  /**
   *Es entrega parcual
   *
   * @type {boolean}
   * @memberof RequisicionFiltrosComponent
   */
  estatus_esEntregaParcial: boolean = null
  estatus_fechaEntregaParcialidadDesde: Date = null
  estatus_fechaEntregaParcialidadHasta: Date = null
  estatus_cantidadEntregadaALaFecha: number = null
  estatus_esTerminada: boolean = null
  estatus_fechaTerminadaDesde: Date = null
  estatus_fechaTerminadaHasta: Date = null
  estatus_esCancelada: boolean = null
  estatus_fechaCancelacionDesde: Date = null
  estatus_fechaCancelacionHasta: Date = null

  articuloDataList: DataListComponent
  usuarioDataList: DataListComponent

  constructor(
    public articuloService: ArticuloService,
    public _usuarioService: UsuarioService
  ) {
    this.seleccionarCamposVisibles.mostrarTodo()
  }

  ngOnInit() {}

  ejecutarOperacionesdeBusquedaArticulos(pay) {
    if (!pay) return

    this.articuloService
      .findByTerm(pay.termino, new Paginacion(10, 0, 1, 'nombre'))
      .subscribe(articulos => {
        let dat: Dato[] = []
        articulos.forEach((art: Articulo) => {
          dat.push(this.crearDatoParaDataListArticulo(art))
        })

        pay.dataList.terminoBusqueda(dat)
      })
  }

  private crearDatoParaDataListArticulo(art: Articulo): Dato {
    let d = new Dato()
    d.leyendaPrincipal = art.nombre
    d.leyendaSecundaria = art.existencia * art.kgPorUnidad + ' kg '
    d.descripcionPrincipal = art.descripcion
    d.descripcionSecundaria = 'Unidades de almacenamiento en: ' + art.unidad
    d.objeto = art
    return d
  }

  articuloSeleccionado(dato: Dato) {
    if (dato) this.articulo = <Articulo>dato.objeto
  }

  ejecutarOperacionesdeBusquedaUsuarios(pay) {
    if (!pay) return

    this._usuarioService
      .findByTerm(pay.termino, new Paginacion(15, 0, 1, 'nombre'))
      .subscribe(usuarios => {
        let datos: Dato[] = []
        usuarios.forEach((us: Usuario) => {
          datos.push(this.crearDatoParaDataListUsuario(us))
        })

        pay.dataList.terminoBusqueda(datos)
      })
  }

  private crearDatoParaDataListUsuario(us: Usuario): Dato {
    let d = new Dato()
    d.leyendaPrincipal = us.nombre
    d.objeto = us
    return d
  }

  usuarioSeleccionado(dato: Dato) {
    if (dato) this.usuario = <Usuario>dato.objeto
  }

  private reiniciarTipoDeMaterial() {
    this.materiaPrima = false
    this.consumibles = false
    this.gastosYServicios = false
  }
  seleccionarTipoDeMaterial(sCampo: string) {
    if (this[sCampo]) {
      this.reiniciarTipoDeMaterial()
    } else {
      this.reiniciarTipoDeMaterial()
      this[sCampo] = true
    }
  }

  private reiniciarEstatus() {
    this.estatus_esRequisicion = false
    this.estatus_esOrdenDeCompra = false
    this.estatus_esEntregaParcial = false
    this.estatus_esTerminada = false
    this.estatus_esCancelada = false
  }

  seleccionarEstatus(sCampo: string) {
    if (this[sCampo]) {
      this.reiniciarEstatus()
    } else {
      this.reiniciarEstatus()
      this[sCampo] = true
    }
  }

  filtrar() {
    let f = []
    let s = this

    f.push(s.folioDesde ? `[folio][$gte]=${s.folioDesde}` : '')
    f.push(s.folioHasta ? `[folio][$lte]=${s.folioHasta}` : '')
    f.push(s.usuario ? `usuario=${s.usuario._id}` : '')
    f.push(s.materiaPrima ? `materiaPrima=${s.materiaPrima}` : '')
    f.push(s.consumibles ? `consumibles=${s.consumibles}` : '')
    f.push(s.gastosYServicios ? `gastosYServicios${s.gastosYServicios}` : '')
    f.push(s.articulo ? `articulo=${s.articulo._id}` : '')
    f.push(
      s.estatus_esRequisicion
        ? `[estatus.esRequisicion]=${s.estatus_esRequisicion}`
        : ''
    )
    f.push(
      s.estatus_esOrdenDeCompra
        ? `[estatus.esOrdenDeCompra]=${s.estatus_esOrdenDeCompra}`
        : ''
    )
    f.push(
      s.estatus_esEntregaParcial
        ? `[estatus.esEntregaParcial]=${s.estatus_esEntregaParcial}`
        : ''
    )
    f.push(
      s.estatus_esTerminada
        ? `[estatus.esTerminada]=${s.estatus_esTerminada}`
        : ''
    )
    f.push(
      s.estatus_esCancelada
        ? `[estatus.esCancelada]=${s.estatus_esCancelada}`
        : ''
    )

    this.obtenerFiltros.emit(f.filter(x=> x!=='').join('&'))
  }

  limpiar() {
    this.reiniciarEstatus()
    this.reiniciarTipoDeMaterial()
    this.folioDesde = null
    this.folioHasta = null
    this.usuario = null
    this.materiaPrima = null
    this.consumibles = null
    this.gastosYServicios = null
    this.articulo = null
    this.estatus_esRequisicion = null
    this.estatus_esOrdenDeCompra = null
    this.estatus_fechaDeGeneracionDeOrdenDeCompraDesde = null
    this.estatus_fechaDeGeneracionDeOrdenDeCompraHasta = null
    this.estatus_fechaTerminoYEntradaAlmacenDesde = null
    this.estatus_fechaTerminoYEntradaAlmacenHasta = null
    this.estatus_esEntregaParcial = null
    this.estatus_fechaEntregaParcialidadDesde = null
    this.estatus_fechaEntregaParcialidadHasta = null
    this.estatus_cantidadEntregadaALaFecha = null
    this.estatus_esTerminada = null
    this.estatus_fechaTerminadaDesde = null
    this.estatus_fechaTerminadaHasta = null
    this.estatus_esCancelada = null
    this.estatus_fechaCancelacionDesde = null
    this.estatus_fechaCancelacionHasta = null

    this.articuloDataList.limpiarParaNuevo()
    this.usuarioDataList.limpiarParaNuevo()
  }
}
