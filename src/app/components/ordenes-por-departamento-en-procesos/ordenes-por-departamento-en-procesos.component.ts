import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  EventEmitter,
  Output
} from '@angular/core'
import { FormControl } from '@angular/forms'
import { Folio } from '../../models/folio.models'
import {
  OrdenLigera,
  FolioNewService
} from '../../services/folio/folio-new.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-ordenes-por-departamento-en-procesos',
  templateUrl: './ordenes-por-departamento-en-procesos.component.html',
  styleUrls: ['./ordenes-por-departamento-en-procesos.component.css']
})
export class OrdenesPorDepartamentoEnProcesosComponent
  implements OnInit, OnDestroy {
  ordenes: OrdenLigera[] = []
  cargando = {}
  keys = Object.keys
  idDep: string
  folioDetalle: Folio

  @Input() set idDepartamento(id: string) {
    this.idDep = id
    this.cargarDatos(id)
  }

  @Input() actualizar: Observable<void>

  constructor(public folioService: FolioNewService) {}

  intervaloDeRecarga = null
  tiempoDeRecargaEnMinutos = 5 //Cada 5 minutos
  ultimaActualizacion = new Date()

  inputBuscador = new FormControl()
  mostrar: OrdenLigera[] = []

  ngOnDestroy() {
    clearInterval(this.intervaloDeRecarga)
  }

  ngOnInit() {
    this.intervaloDeRecarga = setInterval(_ => {
      this.cargarDatos(this.idDepartamento)
    }, this.tiempoDeRecargaEnMinutos * 1000 * 60)

    this.inputBuscador.valueChanges.subscribe(termino => {
      if (!termino.trim()) {
        this.mostrar = this.ordenes
        return
      }

      this.mostrar = this.ordenes
        .map(x => {
          let busqueda = ''
            .concat(x.procesoActual)
            .concat(x.numeroDeOrden)
            .concat(x.sku)
            .concat(x.laser)
            .concat(x.laserAlmacen)
            .concat(x.observacionesFolio)
            .concat(x.observacionesPedido)
            .concat(x.observacionesOrden)
            .toLowerCase()

          return {
            busqueda: busqueda,
            objeto: x
          }
        })
        .filter(x => x.busqueda.includes(termino.toLowerCase()))
        .map(x => x.objeto)
    })

    this.actualizar.subscribe(_ => {
      this.cargarDatos(this.idDep)
    })
  }

  cargarDatos(id) {
    if (!id) return

    this.cargando['ordenes'] = 'Obteniendo ordenes del departamento'

    this.folioService.findAllOrdenesPorDeparatmento(id).subscribe(
      ordenes => {
        delete this.cargando['ordenes']
        this.ordenes = ordenes
        this.ultimaActualizacion = new Date()
        this.mostrar = ordenes
      },
      _ => delete this.cargando['ordenes']
    )
  }

  cargarFolio(id: string) {
    this.cargando['folio'] = 'Obteniendo detalle de folio'

    this.folioService.findById(id).subscribe(
      f => {
        this.folioDetalle = f
        delete this.cargando['folio']
      },
      _ => delete this.cargando['folio']
    )
  }
}
