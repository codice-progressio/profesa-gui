import { Component, OnInit } from '@angular/core'
import { Departamento } from '../../models/departamento.models'
import { DepartamentoService } from '../../services/departamento/departamento.service'
import { PaginadorService } from '../../components/paginador/paginador.service'
import { ManejoDeMensajesService } from '../../services/utilidades/manejo-de-mensajes.service'
import { DepartamentoCrearModificarComponent } from './departamento-crear-modificar.component'
import { Paginacion } from 'src/app/utils/paginacion.util'

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styles: []
})
export class DepartamentoComponent implements OnInit {
  departamentoDetalle: Departamento = null
  departamentos: Departamento[] = []

  departamentoCrearModificarComponent: DepartamentoCrearModificarComponent = null

  cbBuscar = () => this.cargarDepartamentos()

  constructor(
    public departamento: DepartamentoService,
    public _msjService: ManejoDeMensajesService
  ) {
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
    this.departamento
      .findAll(new Paginacion(100, 0, 1, 'nombre'))
      .subscribe(departamentos => {
        this.departamentos = departamentos
      })
  }

  eliminar() {
    this._msjService.invalido(
      `Por el momento no es posible eliminar departamentos. Para mas informacion refierete con el administrador del sistema.`,
      'No esta permitido eliminar departamentos',
      10000
    )
  }
}
