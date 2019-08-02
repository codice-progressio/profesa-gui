import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core"
import { ModeloCompleto } from "../../models/modeloCompleto.modelo"
import { ModeloCompletoService } from "../../services/modelo/modelo-completo.service"
import { OrganizadorDragAndDropService } from "../../components/organizador-drag-and-drop/organizador-drag-and-drop.service"
import { Proceso } from "src/app/models/proceso.model"
import { DndObject } from "src/app/components/organizador-drag-and-drop/models/dndObject.model"
import { FamiliaDeProcesosService } from "../../services/proceso/familia-de-procesos.service"
import { ProcesoService } from "../../services/proceso/proceso.service"
import { PaginadorAbstractoComponent } from "../paginador-abstracto/paginador-abstracto.component"
import { FolioLinea } from "../../models/folioLinea.models"
import { DefaultsService } from "../../services/configDefualts/defaults.service"
import { DefaultModelData } from "../../config/defaultModelData"

@Component({
  selector: "app-modelo-completo-gestor-de-procesos-especiales",
  templateUrl: "./modelo-completo-gestor-de-procesos-especiales.component.html"
})
export class ModeloCompletoGestorDeProcesosEspecialesComponent
  implements OnInit {
  /**
   *Este modelo completo temporal no sirve para estructurar los procesos
   * y obtener el orden de los especiales. Es necesario definirlo.
   *
   * @type {ModeloCompleto}
   * @memberof ModeloCompletoGestorDeProcesosEspecialesComponent
   */
  @Input() mctemp: ModeloCompleto = null

  /**
   *Retorna este componente.
   *
   * @memberof ModeloCompletoGestorDeProcesosEspecialesComponent
   */
  @Output() esteComponente = new EventEmitter<this>()

  /**
   *La lista de procesos cargados desde la bd
   *
   * @type {Proceso[]}
   * @memberof ModeloCompletoGestorDeProcesosEspecialesComponent
   */
  procesos: Proceso[] = null

  /**
   *El paginador abstracto.
   *
   * @type {PaginadorAbstractoComponent}
   * @memberof ModeloCompletoGestorDeProcesosEspecialesComponent
   */
  paginador: PaginadorAbstractoComponent

  /**
   *La lista de procesos seleccionados.
   *
   * @type {Proceso[]}
   * @memberof ModeloCompletoGestorDeProcesosEspecialesComponent
   */
  procesosEspecialesSeleccionados: Proceso[] = []

  /**
   *Bandera para mostrar la informacion de debugueo.
   *
   * @type {boolean}
   * @memberof ModeloCompletoGestorDeProcesosEspecialesComponent
   */
  @Input() debug: boolean = false

  @Input() pedido: FolioLinea

  defaultModelData: DefaultModelData

  leyenda: string = " Arrastra procesos de la lista para agregarlos."

  constructor(
    public _smc: ModeloCompletoService,
    public _dndService: OrganizadorDragAndDropService<Proceso>,
    public _familiaService: FamiliaDeProcesosService,
    public _procesoService: ProcesoService,
    public _defaultsService: DefaultsService
  ) {}

  ngOnInit() {
    this.esteComponente.emit(this)
  }

  inicializar() {
    this._defaultsService.cargarDefaults().subscribe((d) => {
      this.defaultModelData = d
      this._procesoService
        .todoAbstracto(1, 5, Proceso)
        .subscribe(this.primeraCargaDeProcesos)
    })

    this._dndService.leyendaListaSeleccionable = this.leyenda
  }

  primeraCargaDeProcesos = (procesos) => {
    this.procesos = procesos

    this.cargarProcesos(this.procesos)

    // Preparando paginador.
    let intervaloDeEsperaPaginador = setInterval(() => {
      if (this.paginador) {
        clearInterval(intervaloDeEsperaPaginador)
        this.paginador.totalDeElementos = this._procesoService.total
        this.paginador.inciarPaginador()
        this.paginador.cargandoDatos = false
      }
    }, 100)

    // Necesitamos saber si este pedido tiene alguno de los siguientes trayectos.

    /**
     * x. Es de almacen y no va laserado.
     * x. Es de almacen y va laserado.
     * x. No es de almacen y va laserado.
     *
     *
     */

    this.comprobarProcesosACargar()
  }

  comprobarProcesosACargar() {
    console.log(`this.comprobarProcesosACargar()`)
    let cb = null

    let surtir = !!this.pedido.almacen
    let laserar = !!this.pedido.laserCliente.laser

    if (surtir) {
      cb = this.comprobarSiSeLaseraCuandoSeSurte(laserar)
    } else {
      cb = laserar ? this.noSeSurteDeAlmacenYVaLaserado : null
    }

    // Si no se surte o no se lasera no se debe de mostrar
    // el componente.

    if (cb) {
      cb(this)
    }
  }

  comprobarSiSeLaseraCuandoSeSurte(laserado: boolean): any {
    // Se surte
    return laserado
      ? this.seSurteDeAlmacenYVaLaserado
      : this.seSurteDeAlmacenYNoVaLaserado
  }

  seSurteDeAlmacenYNoVaLaserado(self: this) {
    console.log(`entro`)

    let keyArea = "1"
    let organizador = self._dndService.nuevaArea(keyArea)
    organizador
      .setPadre()
      .setEliminable(false)
      .setLeyenda("Procesos para este pedido")
      .setOrden('0')




    organizador.hijos
      .addFijo()
      .setEliminable(false)
      .setLeyenda("Hijo fijo")

    self._dndService.actualizarPropiedadOrden()

    console.log(`seSurteDeAlmacenYNoVaLaserado`)
  }
  seSurteDeAlmacenYVaLaserado() {
    console.log(`seSurteDeAlmacenYVaLaserado`)
  }


  noSeSurteDeAlmacenYVaLaserado() {
    console.log(`noSeSurteDeAlmacenYVaLaserado`)
  }

  /**
   *Genera los datos del paginador para el modelo seleccionado.
   *
   * @param {ModeloCompleto} mc
   * @memberof ModeloCompletoGestorDeProcesosEspecialesComponent
   */
  cargarLosProcesosPorDefault(mc: ModeloCompleto) {
    // Este es con fines de debugueo

    // this.mctemp = mc
    // ---------------------------
    this._dndService.leyendaListaSeleccionable =
      "Arrastra procesos de la lista para agregarlos."
    mc.familiaDeProcesos.procesos.forEach((procesos) => {
      let keyArea = procesos.orden.toString().split(".")[0]
      this._dndService
        .nuevaArea(keyArea)
        .setPadre()
        .setEliminable(false)
        .setLeyenda(procesos.proceso.nombre + " " + keyArea)
        .setLeyendaOptativa(procesos.proceso.departamento.nombre)
        .setOrden(procesos.orden)
        .setObjeto(procesos.proceso)
    })
    this._dndService.actualizarPropiedadOrden()
  }

  /**
   *Genera la lista del paginador para seleccionar.
   *
   * @param {Proceso[]} procesos
   * @memberof ModeloCompletoGestorDeProcesosEspecialesComponent
   */
  cargarProcesos(procesos: Proceso[]) {
    this._dndService.limpiarListaDeElementos()
    procesos.forEach((proceso) => {
      let a = new DndObject<Proceso>()
      a.setEliminable(true)
        .setLeyenda(proceso.nombre)
        .setLeyendaOptativa(proceso.departamento.nombre)
        .setObjeto(proceso)
      this._dndService.listaDeElementos.push(a)
    })
  }

  /**
   *Carga los dato de la lista a procesosEspecialesSeleccionados.
   *
   * @memberof ModeloCompletoGestorDeProcesosEspecialesComponent
   */
  dropSuccess() {
    this._dndService.actualizarPropiedadOrden()
    this.procesosEspecialesSeleccionados = []
    this._dndService.obtenerHijosOrdenables().forEach((dnd) => {
      this.procesosEspecialesSeleccionados.push(dnd.objeto)
    })
  }

  /**
   *Ejecuta los procesos necesario y consultas para hacer el cambio de pagina
   en la lista de elementos del dnd.
   *
   * @param {{ ["limite"]: number; ["desde"]: number }} e
   * @memberof ModeloCompletoGestorDeProcesosEspecialesComponent
   */
  cambiarPagina(e: { ["limite"]: number; ["desde"]: number }) {
    this._procesoService
      .todoAbstracto(e.desde, e.limite, Proceso)
      .subscribe((datos) => {
        this.procesos = datos
        this._dndService.limpiarListaDeElementos()
        this.cargarProcesos(datos)
        this.paginador.totalDeElementos = this._procesoService.total
        this.paginador.cargaDePaginador(false)
      })
  }
}
