import { Component, OnInit } from "@angular/core"
import { Curso } from "../../../models/recursosHumanos/cursos/curso.model"
import { CursosCrearModificarComponent } from "./cursos-crear-modificar.component"
import { PaginadorService } from "src/app/components/paginador/paginador.service"
import { CursoService } from "../../../services/recursosHumanos/curso.service"
import { ManejoDeMensajesService } from "src/app/services/utilidades/manejo-de-mensajes.service"
import { CursoFiltros } from "../../../services/utilidades/filtrosParaConsultas/curso.filtros"

@Component({
  selector: "app-cursos",
  templateUrl: "./cursos.component.html",
  styles: []
})
export class CursosComponent implements OnInit {
  buscando: boolean = false
  cursos: Curso[] = []
  cursoDetalle: Curso = null
  cursoModificar: Curso = null
  componenteCrearModificar: CursosCrearModificarComponent
  constructor(
    public _paginadorService: PaginadorService,
    public _cursoService: CursoService,
    public _msjService: ManejoDeMensajesService
  ) {
    this._paginadorService.callback = () => this.cargarCursos()
  }

  ngOnInit() {
    this.cargarCursos()
  }

  cargarCursos() {
    this._cursoService
      .filtros(new CursoFiltros(this._cursoService))
      .setDesde(this._paginadorService.desde)
      .setLimite(this._paginadorService.limite)
      .setSortCampos([["nombre", 1]])

      .servicio.todo()
      .subscribe((divisas) => {
        this.cursos = divisas
        this._paginadorService.activarPaginador(this._cursoService.total)
      })
  }

  cbObserbable = (termino) =>
    this._cursoService.buscar(termino)

  resultadoBusqueda(cursos: Curso[]) {
    this.cursos = cursos
  }

  cancelado() {
    this.buscando = false
    this.cargarCursos()
  }

  error(error) {
    this._msjService.err(error)
    throw error
  }

  crear() {
    this.componenteCrearModificar.crear()
  }

  asignarDetalle(curso: Curso) {
    this.cursoDetalle = curso
  }

  editar(curso: Curso) {
    this.componenteCrearModificar.modificar(curso)
  }

  eliminar(curso: Curso) {
    let msj = "Esta accion no se puede deshacer."

    this._msjService.confirmacionDeEliminacion(msj, () => {
      this._cursoService.eliminar(curso._id).subscribe(() => {
        this.limpiar()
        this.cargarCursos()
      })
    })
  }

  limpiar() {
    this.cursoDetalle = null
    this.cursoModificar = null
  }

  guardar() {
    this.limpiar()
    this.cargarCursos()
  }
}
