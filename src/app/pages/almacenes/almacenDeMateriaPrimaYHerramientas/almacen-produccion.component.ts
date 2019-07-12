import { Component, OnInit, Inject } from "@angular/core"
import { Articulo } from "src/app/models/almacenDeMateriaPrimaYHerramientas/articulo.modelo"
import { ArticuloService } from "../../../services/articulo/articulo.service"
import { FiltrosArticulos } from "../../../services/utilidades/filtrosParaConsultas/FiltrosArticulos"
import { PaginadorService } from "../../../components/paginador/paginador.service"
import { ManejoDeMensajesService } from "../../../services/utilidades/manejo-de-mensajes.service"
import { ArticuloCrearModificarComponent } from "../articulo/articulo-crear-modificar.component"
import { Observable } from "rxjs"

@Component({
  selector: "app-almacen-produccion",
  templateUrl: "./almacen-produccion.component.html",
  styles: [],
  providers: [{ provide: "paginadorFolios", useClass: PaginadorService }]
})
export class AlamacenProduccion implements OnInit {
  articulos: Articulo[] = []
  buscando: boolean = false
  // articuloCrearEditar: Articulo = null
  articuloDetalle: Articulo = null
  articuloEntrada: Articulo = null
  articuloSalida: Articulo = null
  componenteCrearModificar: ArticuloCrearModificarComponent

  observableAMandar: Observable<Articulo[]>
  termino: string = ""

  cbObserbable = (termino) => {
    this.buscando = true
    return this._articuloService.buscar(termino)
  }

  busqueda(articulos: Articulo[]) {

    this.articulos = articulos
  }

  cancelado() {
    this.buscando = false
    this.cargarArticulos()
  }

  error(error: string) {
    this._msjService.err(error)
    throw error
  }

  constructor(
    public _articuloService: ArticuloService,
    @Inject("paginadorFolios") public _paginadorService: PaginadorService,
    public _msjService: ManejoDeMensajesService
  ) {
    this._paginadorService.callback = () => this.cargarArticulos()
  }

  ngOnInit() {
    this.cargarArticulos()
    this.observableAMandar = this._articuloService.buscar(this.termino)
  }

  cargarArticulos() {
    this._articuloService
      .filtros(new FiltrosArticulos(this._articuloService))
      .setDesde(this._paginadorService.desde)
      .setLimite(this._paginadorService.limite)
      .setSortCampos([["nombre", -1]])

      .servicio.todo()
      .subscribe((articulos) => {
        this.articulos = articulos
        this._paginadorService.activarPaginador(this._articuloService.total)
      })
  }

  comprobarExistencias(ar: Articulo): number {
    return ar.existencia
  }
  asignarDetalle(ar: Articulo) {
    this.articuloDetalle = ar
  }
  asignarEntradaOSalida(ar: Articulo, esEntrada: boolean) {
    if (esEntrada) {
      this.articuloEntrada = ar
    } else {
      this.articuloSalida = ar
    }
  }

  guardado() {
    this.limpiar()
    this.cargarArticulos()
  }

  limpiar() {
    this.articuloDetalle = null
    this.articuloEntrada = null
    this.articuloSalida = null
  }

  crear() {
    this.componenteCrearModificar.crear()
  }

  editar(ar: Articulo) {
    this.componenteCrearModificar.modificar(ar)
  }

  entradaSalidaGuardada() {
    this.cargarArticulos()
  }

  entradaSalidaCancelada() {
    this.cargarArticulos()
  }

  eliminar(ar: Articulo) {
    let msj1 = `Si eliminas el articulo '${
      ar.nombre
    }' perderas los datos y toda la informacion relacionada a el. Esta operacion no se puede deshacer.`

    let msj2 = `De verdad estas muy seguro? Es puede perjudicar tu inventario.`

    this._msjService.confirmacionDeEliminacion(msj1, () =>
      this._msjService.confirmacionDeEliminacion(msj2, () => {
        this._articuloService
          .eliminar(ar._id)
          .subscribe((articulo) => this.cargarArticulos())
      })
    )
  }
}
