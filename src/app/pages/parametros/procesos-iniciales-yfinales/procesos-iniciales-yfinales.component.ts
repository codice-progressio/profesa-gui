import { Component, OnInit } from '@angular/core'
import { ParametrosService } from '../../../services/parametros.service'
import { LocalizacionDeOrdenes } from '../../../models/parametros/localizacionDeOrdenes.parametros.model'
import { Proceso } from 'src/app/models/proceso.model'
import { ProcesoService } from '../../../services/proceso/proceso.service'
import { Paginacion } from 'src/app/utils/paginacion.util'
import { Procesos } from '../../../models/procesos.model'
import { Location } from '@angular/common'
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  copyArrayItem
} from '@angular/cdk/drag-drop'

@Component({
  selector: 'app-procesos-iniciales-yfinales',
  templateUrl: './procesos-iniciales-yfinales.component.html',
  styleUrls: ['./procesos-iniciales-yfinales.component.css']
})
export class ProcesosInicialesYFinalesComponent implements OnInit {
  cargando = {}
  keys = Object.keys
  localizacionDeOrdenes: LocalizacionDeOrdenes = new LocalizacionDeOrdenes()
  procesos: Proceso[] = []
  constructor(
    public parametrosService: ParametrosService,
    public procesoService: ProcesoService,
    public location: Location
  ) {
    this.cargando['procesos'] = 'Cargando procesos'
    this.procesoService
      .findAll(new Paginacion(100, 0, 1, 'nombre'))
      .subscribe(procesos => {
        this.procesos = procesos
        this.limpiarBusqueda()
        delete this.cargando['procesos']
      })
  }

  ngOnInit(): void {
    this.cargando['parametros'] = 'Cargando procesos iniciales y finales'

    this.parametrosService.findAllLocalizacionDeOrdenes().subscribe(
      loca => {
        this.localizacionDeOrdenes = loca
        delete this.cargando['parametros']
      },
      err => delete this.cargando['parametros']
    )
  }

  drop(event: CdkDragDrop<Proceso[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    } else {
      if (event.item.data) {
        copyArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        )
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        )
      }
    }
  }

  removerItem(arreglo: Proceso[], i: number) {
    arreglo.splice(i, 1)
  }

  submit() {
    this.cargando['guardando'] =
      'Aplicando cambios a procesos iniciales y finales'

    this.parametrosService
      .saveLocalizacionDeOrdenes(this.localizacionDeOrdenes)
      .subscribe(
        () => {
          delete this.cargando['guardando']
        },
        () => {
          delete this.cargando['guardando']
        }
      )
  }

  mostrar = []
  termino = ''
  filtrarDisponibles() {
  
    if (this.termino) {
      this.mostrar = this.procesos
        .map(x => {
          return x.nombre
            .toLowerCase()
            .concat(' ')
            .concat(x.departamento.nombre.toLowerCase())
            .concat(' ')
            .concat('@@@' + x._id)
        })
        .filter(x => x.includes(this.termino.trim().toLowerCase()))
        .map(x => x.split('@@@')[1])
    } 
  }

  limpiarBusqueda() {
    this.mostrar = this.procesos.map(x => x._id)
    this.termino = ''
  }
}
