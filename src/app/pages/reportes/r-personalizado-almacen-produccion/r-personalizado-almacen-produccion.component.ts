import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ReportesProduccionService } from '../../../services/reportes/reportes-produccion.service'
import { Articulo } from 'src/app/models/almacenDeMateriaPrimaYHerramientas/articulo.modelo'
import { SalidaArticulo } from '../../../models/almacenDeMateriaPrimaYHerramientas/salidaArticulo.model'

@Component({
  selector: 'app-r-personalizado-almacen-produccion',
  templateUrl: './r-personalizado-almacen-produccion.component.html',
  styleUrls: ['./r-personalizado-almacen-produccion.component.css']
})
export class RPersonalizadoAlmacenProduccionComponent implements OnInit {
  reportes: Articulo[]
  cargando: boolean = false
  actualizacion: Date
  detalleSalida

  constructor(
    private activatedRoute: ActivatedRoute,
    private reportesService: ReportesProduccionService,
    private router: Router
  ) {}
  ngOnInit() {
    this.cargarReporte()
  }

  cargarReporte() {
    this.cargando = true
    this.activatedRoute.paramMap.subscribe(parametros => {
      this.reportesService
        .almacenProduccionPersonalizado(parametros.get('id'))
        .subscribe(
          articulos => {
            this.reportes = articulos
            this.cargando = false
            this.actualizacion = new Date()
          },
          err => {
            this.cargando = false
            this.router.navigate([
              '/reportes/almacenDeProduccion/personalizado/'
            ])
          }
        )
    })
  }

  imprimir(articulos: Articulo[]) {
    throw 'no definido'
  }
}
