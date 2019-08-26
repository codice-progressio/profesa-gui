import { Component, OnInit } from "@angular/core"
import { Divisa } from "src/app/models/divisas/divisa.model"
import { PaginadorService } from "src/app/components/paginador/paginador.service"
import { DivisaService } from "../../services/divisa.service"
import { FiltrosDivisas } from "../../services/utilidades/filtrosParaConsultas/FiltrosDivisas"
import { ManejoDeMensajesService } from "../../services/utilidades/manejo-de-mensajes.service"
import { DivisaCrearModificarComponent } from "./divisa-crear-modificar.component"

@Component({
  selector: "app-divisa",
  templateUrl: "./divisa.component.html",
  styles: []
})
export class DivisaComponent implements OnInit {
  buscando: boolean = false
  divisas: Divisa[] = []
  divisaDetalle: Divisa = null
  divisaModificar: Divisa = null
  componenteCrearModificar: DivisaCrearModificarComponent
  constructor(
    public _paginadorService: PaginadorService,
    public _divisaService: DivisaService,
    public _msjService: ManejoDeMensajesService
  ) {
    this._paginadorService.callback = () => this.cargarDivisas()
  }
 

  ngOnInit() {
    this.cargarDivisas()
  }

  cargarDivisas() {
    this._divisaService
      .filtros(new FiltrosDivisas(this._divisaService))
      .setDesde(this._paginadorService.desde)
      .setLimite(this._paginadorService.limite)
      .setSortCampos([["nombre", 1]])

      .servicio.todo()
      .subscribe((divisas) => {
        this.divisas = divisas
        this._paginadorService.activarPaginador(this._divisaService.total)
      })
  }

  resultadoBusqueda(divisas: Divisa[]) {
    this.divisas = divisas
  }

  cancelado() {
    this.buscando = false
    this.cargarDivisas()
  }

  error(error) {
    this._msjService.err(error)
    throw error
  }

  crear() {
    this.componenteCrearModificar.crear()
  }

  asignarDetalle(divisa: Divisa) {
    this.divisaDetalle = divisa
  }
  
  editar(divisa: Divisa) {
    
    this.componenteCrearModificar.modificar(divisa)
  }

  eliminar(divisa: Divisa) {
    let msj =
      "Esta accion no se puede deshacer."

    this._msjService.confirmacionDeEliminacion(msj, () => {
      this._divisaService.eliminar(divisa._id).subscribe(() => {
        this.limpiar()
        this.cargarDivisas()
      })
    })
  }

  limpiar() {
    this.divisaDetalle = null
    this.divisaModificar = null
  }

  guardar() {
    this.limpiar()
    this.cargarDivisas()
  }
}
