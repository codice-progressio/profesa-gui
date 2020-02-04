import { Component, OnInit } from '@angular/core'
import { Articulo } from '../../../models/almacenDeMateriaPrimaYHerramientas/articulo.modelo'
import { ReportePersonalizadoAlmacenProduccion } from '../../../models/reportePersonalizadoAlmacenProduccion/reportePersonalizadoAlmacenProduccion.model'
import { ReportesPersonalizadosAlmacenProduccionService } from '../../../services/reportes-personalizados-almacen-produccion.service'
import { Paginacion } from 'src/app/utils/paginacion.util'
import { iPaginadorData } from 'src/app/shared/paginador/paginador.component'
import { ManejoDeMensajesService } from '../../../services/utilidades/manejo-de-mensajes.service'
import { ArticuloService } from '../../../services/articulo/articulo.service'
import { ReportePersonalizadoAlmacenProduccionCrearModificarComponent } from '../../almacenes/reportePersonalizadoAlmacenProduccion/reporte-personalizado-almacen-produccion-crear-modificar.component'

@Component({
  selector: 'app-reporte-personalizado-almacen-produccion',
  templateUrl: './reporte-personalizado-almacen-produccion.component.html',
  styleUrls: ['./reporte-personalizado-almacen-produccion.component.css']
})
export class ReportePersonalizadoAlmacenProduccionComponent implements OnInit {
  totalDeElementos: number
  cargando: boolean = false
  reportes: ReportePersonalizadoAlmacenProduccion[] = []
  paginacion = new Paginacion(5, 0, 1, 'nombres')
  termino: string
  detalle: ReportePersonalizadoAlmacenProduccion = null
  reporteModificar: ReportePersonalizadoAlmacenProduccion
  crearModificarComponente: ReportePersonalizadoAlmacenProduccionCrearModificarComponent
  constructor(
    private repoService: ReportesPersonalizadosAlmacenProduccionService,
    private msjService: ManejoDeMensajesService,
    private articuloService: ArticuloService
  ) {}

  ngOnInit() {
    this.cargarReportes()
  }

  cargarReportes() {
    this.repoService.findAll(this.paginacion).subscribe(repos => {
      this.reportes = repos
      this.totalDeElementos = this.repoService.total
    })
  }

  cbObservable = termino =>
    this.repoService.find(termino, new Paginacion(5, 0, 1, 'nombre'))

  resultadoDeBusqueda(datos) {
    console.log(`datos`,datos)
    this.reportes = datos
    this.totalDeElementos = this.repoService.total
  }

  guardado() {
    this.cargarReportes()
  }
  cancelado() {
    this.cargarReportes()
  }
  error() {
    this.cargarReportes()
  }

  crear() {
    this.crearModificarComponente.crearFormulario()
  }

  actualizarConsulta(data: iPaginadorData = null) {
    this.cargando = true
    this.paginacion = data ? data.paginacion : this.paginacion

    const cb = reportes => {
      this.reportes = reportes
      this.cargando = false
    }
    const cancelado = err => (this.cargando = false)

    if (this.termino) {
      this.repoService
        .find(this.termino, this.paginacion)
        .subscribe(cb, cancelado)
    } else {
      this.repoService.findAll(data.paginacion).subscribe(cb, cancelado)
    }
  }

  modificar(reporte: ReportePersonalizadoAlmacenProduccion) {
    this.crearModificarComponente.crearFormulario(reporte)
  }

  eliminar(id: string) {
    this.msjService.confirmacionDeEliminacion(
      'Esta accion no se puede deshacer',
      () => {
        this.cargando = true
        this.repoService.delete(id).subscribe(
          repoEli => {
            this.cargarReportes()
            this.cargando = false
          },
          err => (this.cargando = false)
        )
      }
    )
  }

  articuloDetalle: Articulo = null
  buscarArticulo(id: string) {
    this.articuloService.buscarPorId(id).subscribe(articulo => {
      this.articuloDetalle = Object.assign(new Articulo(), articulo)
    })
  }
}
