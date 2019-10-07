import { Component, OnInit } from '@angular/core';
import { PaginadorService } from 'src/app/components/paginador/paginador.service';
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service';
import { ProveedorCrearModificarComponent } from './proveedor-crear-modificar.component'
import { Proveedor } from '../../models/proveedores/proveedor.model'
import { ProveedorService } from 'src/app/services/proveedor.service';
import { ProveedorFiltros } from '../../services/utilidades/filtrosParaConsultas/proveedor.filtros'

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styles: []
})
export class ProveedorComponent implements OnInit {

  buscando: boolean = false
  proveedores: Proveedor[] = []
  proveedorDetalle: Proveedor = null
  proveedorModificar: Proveedor = null
  componenteCrearModificar: ProveedorCrearModificarComponent
  constructor(
    public _paginadorService: PaginadorService,
    public _proveedorService: ProveedorService,
    public _msjService: ManejoDeMensajesService
  ) {
    this._paginadorService.callback = () => this.cargarProveedores()
  }



 

  ngOnInit() {
    this.cargarProveedores()
  }

  cargarProveedores() {
    this._proveedorService
      .filtros(new ProveedorFiltros(this._proveedorService))
      .setDesde(this._paginadorService.desde)
      .setLimite(this._paginadorService.limite)
      .setSortCampos([["nombre", 1]])

      .servicio.todo()
      .subscribe((divisas) => {
        this.proveedores = divisas
        this._paginadorService.activarPaginador(this._proveedorService.total)
      })
  }

  cbObserbable =  this._proveedorService.buscar

  resultadoBusqueda(proveedores: Proveedor[]) {
    this.proveedores = proveedores
  }

  cancelado() {
    this.buscando = false
    this.cargarProveedores()
  }

  error(error) {
    this._msjService.err(error)
    throw error
  }

  crear() {
    this.componenteCrearModificar.crear()
  }

  asignarDetalle(proveedor: Proveedor) {
    this.proveedorDetalle = proveedor
  }
  
  editar(proveedor: Proveedor) {
    
    this.componenteCrearModificar.modificar(proveedor)
  }

  eliminar(proveedor: Proveedor) {
    let msj =
      "Esta accion no se puede deshacer."

    this._msjService.confirmacionDeEliminacion(msj, () => {
      this._proveedorService.eliminar(proveedor._id).subscribe(() => {
        this.limpiar()
        this.cargarProveedores()
      })
    })
  }

  limpiar() {
    this.proveedorDetalle = null
    this.proveedorModificar = null
  }

  guardar() {
    this.limpiar()
    this.cargarProveedores()
  }
  

}
