import { Component, OnInit } from '@angular/core'
import { AlmacenDescripcion } from '../../../models/almacenDeMateriaPrimaYHerramientas/almacen-descripcion.model'
import { AlmacenDescripcionService } from '../../../services/almacenDeMateriaPrimaYHerramientas/almacen-descripcion.service'
import { PaginadorService } from '../../../components/paginador/paginador.service'
import { ManejoDeMensajesService } from '../../../services/utilidades/manejo-de-mensajes.service'
import { AlmacenDescripcionCrearModificarComponent } from './almacen-descripcion-crear-modificar.component'
import { AlmacenDescripcionFiltros } from '../../../services/utilidades/filtrosParaConsultas/almacenDescripcion.filtros'

@Component({
  selector: 'app-almacen-descripcion',
  templateUrl: './almacen-descripcion.component.html',
  styles: []
})
export class AlmacenDescripcionComponent implements OnInit {
  almacenesDescripcion: AlmacenDescripcion[] = []
  almacenDescripcionDetalle: AlmacenDescripcion = null
  almacenDescripcionEditar: AlmacenDescripcion = null
  componenteCrearModificar: AlmacenDescripcionCrearModificarComponent

  constructor(
    public _almacenDescripcionServices: AlmacenDescripcionService,
    public _paginadorService: PaginadorService,
    public _msjService: ManejoDeMensajesService
  ) {
    this._paginadorService.callback = () => this.cargarAlmacenes()
  }

  ngOnInit() {
    this.cargarAlmacenes()
  }

  cargarAlmacenes() {
    this._almacenDescripcionServices
      .filtros(new AlmacenDescripcionFiltros(this._almacenDescripcionServices))
      .setDesde(this._paginadorService.desde)
      .setLimite(this._paginadorService.limite)
      .setSortCampos([['nombre', 1]])
      .servicio.todo()
      .subscribe(almacenes => {
        this.almacenesDescripcion = almacenes
        this._paginadorService.activarPaginador(
          this._almacenDescripcionServices.total
        )
      })
  }

  guardar(ad: AlmacenDescripcion) {
    this._almacenDescripcionServices
      .guardar(ad)
      .subscribe(() => this.cargarAlmacenes())
  }

  modificar(ad: AlmacenDescripcion) {
    this._almacenDescripcionServices
      .modificar(ad)
      .subscribe(() => this.cargarAlmacenes())
  }

  eliminarAlmacen(ad: AlmacenDescripcion) {
    let msj = `Si eliminas el almacen ${ad.nombre} tambien se borraran los articulos que esten relacionados a el. Aun asi quieres continuar?`

    let msj2 = `Que pena, pero esto es muy serio.  Si eliminas ${ad.nombre} no podras recuperar esta informacion y se afectara el costo del inventario, las estadisticas de uso, etc, etc, etc. Piensalo bien antes de continuar.`

    let msj3 = `ULTIMA OPORTUNIDAD!! Si haces esto podrias desestabilizar el sistema completamente. ... Quieres continuar?`

    this._msjService.confirmacionDeEliminacion(msj, () =>
      this._msjService.confirmacionDeEliminacion(msj2, () =>
        this._msjService.confirmacionDeEliminacion(msj3, () => {
          this._almacenDescripcionServices
            .eliminar(ad._id)
            .subscribe(() => this.cargarAlmacenes())
        })
      )
    )
  }

  crear() {
    this.asignarEdicion(new AlmacenDescripcion())
  }

  asignarDetalle(a: AlmacenDescripcion) {
    this.almacenDescripcionDetalle = a
  }

  asignarEdicion(ad: AlmacenDescripcion) {
    this.almacenDescripcionEditar = ad
    // Necesita que este cargado el almacendescripcionEditar
    this.componenteCrearModificar.cargarDatos()
  }

  asignarComponente(evento) {
    this.componenteCrearModificar = evento
  }
}
