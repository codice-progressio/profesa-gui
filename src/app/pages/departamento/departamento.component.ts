import { Component, OnInit } from "@angular/core"
import { Departamento } from "../../models/departamento.models"
import { DepartamentoService } from "../../services/departamento/departamento.service"
import { PaginadorService } from "../../components/paginador/paginador.service"
import { ManejoDeMensajesService } from "../../services/utilidades/manejo-de-mensajes.service"
import { DepartamentoCrearModificarComponent } from "./departamento-crear-modificar.component"

@Component({
  selector: "app-departamento",
  templateUrl: "./departamento.component.html",
  styles: []
})
export class DepartamentoComponent implements OnInit {
  departamentoDetalle: Departamento = null
  departamentos: Departamento[] = []

  departamentoCrearModificarComponent: DepartamentoCrearModificarComponent = null

  cbBuscar = () => this.cargarDepartamentos()

  constructor(
    public _departamentoService: DepartamentoService,
    public _paginadorService: PaginadorService,
    public _msjService: ManejoDeMensajesService
  ) {
    this._paginadorService.callback = this.cbBuscar
  }

  ngOnInit() {
    this.cargarDepartamentos()
  }

  asignarDetalle(dep: Departamento) {
    this.departamentoDetalle = dep
  }

  editar(dep: Departamento) {
    this.departamentoCrearModificarComponent.crearOModificar(dep)
  }

  crear() {
    this.departamentoCrearModificarComponent.crearOModificar()
  }

  cargarDepartamentos() {
    this._departamentoService
      .todoAbstracto(
        this._paginadorService.desde,
        this._paginadorService.limite,
        Departamento,
        undefined
      )
      .subscribe((departamentos) => {
        this._paginadorService.activarPaginador(this._departamentoService.total)
        this.departamentos = departamentos
      })
  }

  eliminar() {
    this._msjService.invalido(
      `Por el momento no es posible eliminar departamentos. Para mas informacion refierete con el administrador del sistema.`,
      "No esta permitido eliminar departamentos",
      10000
    )
  }
}
