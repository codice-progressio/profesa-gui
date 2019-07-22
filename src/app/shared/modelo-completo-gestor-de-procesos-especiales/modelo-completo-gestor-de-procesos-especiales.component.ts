import { Component, OnInit, Input } from "@angular/core"
import { ModeloCompleto } from "../../models/modeloCompleto.modelo"
import { ModeloCompletoService } from "../../services/modelo/modelo-completo.service"
import { OrganizadorDragAndDropService } from "../../components/organizador-drag-and-drop/organizador-drag-and-drop.service"
import { Proceso } from "src/app/models/proceso.model"
import { DndObject } from "src/app/components/organizador-drag-and-drop/models/dndObject.model"
import { FamiliaDeProcesosService } from "../../services/proceso/familia-de-procesos.service"
import { ProcesoService } from "../../services/proceso/proceso.service"
import { PaginadorAbstractoComponent } from "../paginador-abstracto/paginador-abstracto.component"

@Component({
  selector: "app-modelo-completo-gestor-de-procesos-especiales",
  templateUrl: "./modelo-completo-gestor-de-procesos-especiales.component.html"
})
export class ModeloCompletoGestorDeProcesosEspecialesComponent
  implements OnInit {
  mctemp: ModeloCompleto = null
  procesos: Proceso[] = null

  paginador: PaginadorAbstractoComponent

  @Input() debug: boolean = false

  constructor(
    public _smc: ModeloCompletoService,
    public _dndService: OrganizadorDragAndDropService<Proceso>,
    public _familiaService: FamiliaDeProcesosService,
    public _procesoService: ProcesoService
  ) {
    this._smc.todo().subscribe((mcs) => this.cargarModeloCompleto(mcs.pop()))
    this._procesoService.todo().subscribe((procesos) => {
      this.procesos = procesos
      this.cargarProcesos(this.procesos)

      // Preparando paginador.
      let intervaloDeEsperaPaginador = setInterval(() => {
        if (this.paginador) {
          this.paginador.totalDeElementos = this._procesoService.total
          this.paginador.inciarPaginador()
          this.paginador.cargandoDatos = false
          clearInterval(intervaloDeEsperaPaginador)
        }
      }, 100)
    })
  }

  cargarModeloCompleto(mc: ModeloCompleto) {
    // Este es con fines de debugueo
    this.mctemp = mc
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

  cargarProcesos(procesos: Proceso[]) {
    procesos.forEach((proceso) => {
      let a = new DndObject<Proceso>()
      a.setEliminable(true)
        .setLeyenda(proceso.nombre)
        .setLeyendaOptativa(proceso.departamento.nombre)
        .setObjeto(proceso)
      this._dndService.listaDeElementos.push(a)
    })
  }

  dropSuccess() {
    let hijos: Proceso[] = []
    this._dndService.actualizarPropiedadOrden()
    this._dndService
      .obtenerHijosOrdenables()
      .forEach((dnd) =>{
       
        throw 'Falta definir el orden del proceso especial que debe de ir en el pedido'
         
    })
  }

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

  ngOnInit() {}
}
