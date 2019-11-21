import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../../models/recursosHumanos/empleados/empleado.model'
import { EmpleadoService } from '../../../services/recursosHumanos/empleado.service'
import { PaginadorService } from '../../../components/paginador/paginador.service'
import { EmpleadoFiltros } from 'src/app/services/utilidades/filtrosParaConsultas/empleado.filtros';
import { EmpleadoFiltrosComponent } from './empleado-filtros/empleado-filtros.component'

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styles: []
})
export class EmpleadoComponent implements OnInit {

  empleadoDetalle: Empleado
  empleados: Empleado[] = []
  empleadoModificar: Empleado = null
  buscando: boolean = false

  empleadoFiltrosComponent: EmpleadoFiltrosComponent


  cbObservable = (termino)=>{
    this.empleadoFiltrosComponent.limpiar()
    this.cargarEmpleados( termino )}


  constructor(
    private _empleadoService: EmpleadoService,
    public _paginadorService: PaginadorService
  ) { 


  }

  ngOnInit() {
  }

  cargarEmpleados( termino: string = null ) {
    this.buscando = false

    this.aplicarFiltros(
      this._empleadoService.filtros(
        new EmpleadoFiltros( this._empleadoService)
      ),
        this.empleadoFiltrosComponent
    )
    .servicio
    .todo()
    .subscribe((empleados) => {
      this.empleados = empleados
    })
  }

  private aplicarFiltros(
    filtros: EmpleadoFiltros<EmpleadoService>,
    c: EmpleadoFiltrosComponent
  ): EmpleadoFiltros<EmpleadoService> {
  
    if( !c ) return filtros


    return filtros

  
  
  
  
  }

  guardar() {
    this.cargarEmpleados()
  }

}
