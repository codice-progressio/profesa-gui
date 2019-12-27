import { Component, OnInit } from "@angular/core"
import { AreaRH } from "../../../models/recursosHumanos/areas/areaRH.model"
import { AreasCrearModificarComponent } from "./areas-crear-modificar.component"
import { PaginadorService } from "src/app/components/paginador/paginador.service"
import { ManejoDeMensajesService } from "src/app/services/utilidades/manejo-de-mensajes.service"
import { AreaService } from "src/app/services/recursosHumanos/area.service"
import { AreaFiltros } from "src/app/services/utilidades/filtrosParaConsultas/area.filtros"

@Component({
  selector: "app-areas",
  templateUrl: "./areas.component.html",
  styles: []
})
export class AreasComponent implements OnInit {
  buscando: boolean = false
  areas: AreaRH[] = []
  areaDetalle: AreaRH = null
  areaModificar: AreaRH = null
  componenteCrearModificar: AreasCrearModificarComponent
  


  constructor(
    public _paginadorService: PaginadorService,
    public _areaService: AreaService,
    public _msjService: ManejoDeMensajesService
  ) {}

  ngOnInit() {
    this.cargarAreas()
    this._paginadorService.callback = ()=> this.cargarAreas()
  }

  cargarAreas() {
    this._areaService
      .filtros(new AreaFiltros(this._areaService))
      .setDesde(this._paginadorService.desde)
      .setLimite(this._paginadorService.limite)
      .setSortCampos([["nombre", 1]])

      .servicio.todo()
      .subscribe((divisas) => {
        this.areas = divisas
        this._paginadorService.activarPaginador(this._areaService.total)
      })
  }

  resultadoBusqueda(areas: AreaRH[]) {
    this.areas = areas
  }

  cancelado() {
    this.buscando = false
    this.cargarAreas()
  }

  error(error) {
    this._msjService.err(error)
    throw error
  }

  crear() {
    this.componenteCrearModificar.crear()
  }

  asignarDetalle(area: AreaRH) {
    this.areaDetalle = area
  }

  editar(area: AreaRH) {
    this.componenteCrearModificar.modificar(area)
  }

  eliminar(area: AreaRH) {
    let msj = "Esta accion no se puede deshacer."

    this._msjService.confirmacionDeEliminacion(msj, () => {
      this._areaService.eliminar(area._id).subscribe(() => {
        this.limpiar()
        this.cargarAreas()
      })
    })
  }

  limpiar() {
    this.areaDetalle = null
    this.areaModificar = null
  }

  guardar() {
    this.limpiar()
    this.cargarAreas()
  }
}
