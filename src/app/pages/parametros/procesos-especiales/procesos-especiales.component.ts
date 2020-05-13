import { Component, OnInit } from '@angular/core'
import { Proceso } from 'src/app/models/proceso.model'
import { constructor } from 'moment'
import { ParametrosService } from 'src/app/services/parametros.service'
import { ProcesoService } from 'src/app/services/proceso/proceso.service'
import { Paginacion } from 'src/app/utils/paginacion.util'
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  copyArrayItem
} from '@angular/cdk/drag-drop'

@Component({
  selector: 'app-procesos-especiales',
  templateUrl: './procesos-especiales.component.html',
  styleUrls: ['./procesos-especiales.component.css']
})
export class ProcesosEspecialesComponent implements OnInit {
  procesosSeleccionados: Proceso[] = []
  procesos: Proceso[] = []

  cargando = {}
  keys = Object.keys

  constructor(
    private parametrosServices: ParametrosService,
    private procesoService: ProcesoService
  ) {}

  ngOnInit(): void {
    this.cargando['especiales'] =
      'Obteniendo procesos definidos como especiales'
    this.parametrosServices.findAllProcesosEspeciales().subscribe(
      p => {
        this.procesosSeleccionados = p
        delete this.cargando['especiales']
      },
      _ => delete this.cargando['especiales']
    )
    this.cargarProcesos()
  }

  cargarProcesos() {
    this.cargando['procesos'] = ' Obteniendo procesos generales'
    this.procesoService.findAll(new Paginacion(100, 0, 1, 'nombre')).subscribe(
      procesos => {
        this.procesos = procesos
        this.mostrar = procesos.map(x => x._id)
        delete this.cargando['procesos']
      },
      _ => delete this.cargando['procesos']
    )
  }

  mostrar = []
  filtrarDisponibles(termino: string) {
    const tLimpio = termino.trim()
    if (tLimpio) {
      this.mostrar = this.procesos
        .map(x => {
          return x.nombre
            .toLowerCase()
            .concat(' ')
            .concat(x.departamento.nombre.toLowerCase())
            .concat(' ')
            .concat('@@@' + x._id)
        })
        .filter(x => x.includes(termino.toLowerCase()))
        .map(x => x.split('@@@')[1])
    } else {
      this.mostrar = this.procesos.map(x => x._id)
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    } else {
      if (event.item.data === 'copiar') {
        copyArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        )
      } else if (event.item.data === 'eliminar') {
        this.procesosSeleccionados.splice(event.previousIndex, 1)
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        )
      }
    }

    let proSL: Proceso[] = []
    Array.from(new Set(this.procesosSeleccionados.map(x => x._id))).forEach(
      id => {
        proSL.push(this.procesos.find(p => p._id === id))
      }
    )

    this.procesosSeleccionados = proSL
  }

  guardar() {
    this.cargando['guardar'] = 'Aplicando cambios'

    this.parametrosServices
      .saveProcesosEspeciales(this.procesosSeleccionados.map(x => x._id))
      .subscribe(
        _ => {
          delete this.cargando['guardar']
          this.cargarProcesos()
        },
        _ => delete this.cargando['guardar']
      )
  }
}
