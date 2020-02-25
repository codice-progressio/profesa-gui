import {
  Component,
  OnInit,
  ViewChildren,
  ViewChild,
  ElementRef
} from '@angular/core'
import { OrdenParaAsignacion } from 'src/app/services/programacion-transformacion.service'
import { DefaultsService } from '../../../services/configDefualts/defaults.service'
import { ProgramacionTransformacionService } from '../../../services/programacion-transformacion.service'
import { DefaultModelData } from '../../../config/defaultModelData'
import { MaquinaService } from '../../../services/maquina/maquina.service'
import { Maquina } from 'src/app/models/maquina.model'
import {
  CdkDragDrop,
  transferArrayItem,
  moveItemInArray
} from '@angular/cdk/drag-drop'
import { forkJoin } from 'rxjs'
import { ManejoDeMensajesService } from '../../../services/utilidades/manejo-de-mensajes.service'
import { OnDestroy } from '@angular/core'

@Component({
  selector: 'app-programacion-transformacion',
  templateUrl: './programacion-transformacion.component.html',
  styleUrls: ['./programacion-transformacion.component.css']
})
export class ProgramacionTransformacionComponent implements OnInit, OnDestroy {
  ordenes: OrdenParaAsignacion[] = []

  maquinas: Maquina[] = []

  cargandoOrdenes = false
  cargandoMaquinas = false
  totalOrdenesAsignadas: number = 0

  ultimaActualizacion: Date
  intervalo = null

  constructor(
    private msjService: ManejoDeMensajesService,
    private defaultService: DefaultsService,
    private programacionSerivce: ProgramacionTransformacionService,
    private maquinaService: MaquinaService
  ) {}

  ngOnInit() {
    this.actualizarTodo()

    this.intervalo = setInterval(() => {
      this.actualizarTodo()
    }, 1000 * 60 * 5)
  }

  ngOnDestroy() {}

  actualizarTodo() {
    this.cargarOrdenes()
    this.cargarMaquinas()
  }

  cargarMaquinas() {
    this.cargandoMaquinas = true
    this.defaultService.cargarDefaults().subscribe(
      d => {
        this.maquinaService
          .buscarMaquinasPorDepartamento(d.DEPARTAMENTOS.TRANSFORMACION)
          .subscribe(
            maquinas => {
              this.maquinas = maquinas.sort((a, b) =>
                a.clave > b.clave ? 1 : -1
              )

              this.totalOrdenesAsignadas = this.calcularOrdenesAsignadas(
                this.maquinas
              )

              this.cargandoMaquinas = false
              this.ultimaActualizacion = new Date()
            },
            err => (this.cargandoMaquinas = false)
          )
      },
      err => {
        console.log(err)
        this.cargandoMaquinas = false
      }
    )
  }

  calcularOrdenesAsignadas(maquinas: Maquina[]): number {
    return this.maquinas.reduce((a, b) => {
      return (a += b.pila.length)
    }, 0)
  }

  cargarOrdenes() {
    this.cargandoOrdenes = true
    this.defaultService.cargarDefaults().subscribe(def => {
      this.programacionSerivce
        .ordenesPorAsignar(def.DEPARTAMENTOS.TRANSFORMACION)
        .subscribe(
          ordenes => {
            this.ordenes = ordenes
            this.cargandoOrdenes = false
            this.ultimaActualizacion = new Date()
          },
          err => (this.cargandoOrdenes = false)
        )
    })
  }

  orden = 1
  ordenar(campo: string) {
    this.orden = this.orden * -1
    const cb = (a, b) => {
      return (a[campo] > b[campo] ? 1 : -1) * this.orden
    }
    if (this.filtroActivo) {
      this.ordenesFiltradas.sort(cb)
    } else {
      this.ordenes.sort(cb)
    }
  }

  filtroActivo = false
  ordenesFiltradas: OrdenParaAsignacion[]

  ordenesAMostrar: string[] = []
  filtrar(termino: string) {
    if (!termino.trim()) {
      this.limpiarFiltro()
      return
    }
    this.ordenesFiltradas = []
    this.filtroActivo = true
    this.ordenesAMostrar = this.ordenes
      .filter(x => {
        return (
          x.numeroDeOrden.toLowerCase().includes(termino) ||
          x.modeloCompleto.toLowerCase().includes(termino)
        )
      })
      .map(x => x.numeroDeOrden)
  }

  @ViewChild('input') inputTermino: ElementRef

  limpiarFiltro() {
    this.ordenesAMostrar = []
    this.ordenesFiltradas = undefined
    this.filtroActivo = false
    this.inputTermino.nativeElement.value = ''
  }

  idsMaquinas(): string[] {
    return this.maquinas.map(x => x._id).concat(['ordenes-por-asignar'])
  }

  drop(
    event: CdkDragDrop<OrdenParaAsignacion[]>,
    maquinaALaQueLlega: Maquina = null
  ) {
    const maquinaDeLaQueViene = event.item.data
    if (event.container !== event.previousContainer) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )

      //Dependiendo de lo que queramos hacer aqui vamos a guardar
      // o no las promesas.
      const promesas = []

      if (
        //Cuando el cambio es entre maquinas
        maquinaALaQueLlega && maquinaDeLaQueViene
          ? maquinaALaQueLlega.hasOwnProperty('clave') &&
            maquinaDeLaQueViene.hasOwnProperty('clave')
          : false
      ) {
        promesas.push(
          this.programacionSerivce.asignarOrdenes(maquinaALaQueLlega)
        )
        promesas.push(
          this.programacionSerivce.asignarOrdenes(maquinaDeLaQueViene)
        )
      } else if (
        // Se devuelve un elemento a la lista de ordenes
        // por asignar.
        maquinaALaQueLlega === null && maquinaDeLaQueViene
          ? maquinaDeLaQueViene.hasOwnProperty('clave')
          : false
      ) {
        //Se guarda la maquina a la que se le quito
        promesas.push(
          this.programacionSerivce.asignarOrdenes(maquinaDeLaQueViene)
        )
        //Se recargan las ordenes.
        this.cargarOrdenes()
      } else if (
        //Viene de la lista de ordenes y se asigna a una maquina
        maquinaDeLaQueViene === 'lista' && maquinaALaQueLlega
          ? maquinaALaQueLlega.hasOwnProperty('clave')
          : false
      ) {
        //Se guarda solo la maquina a la que se agrego.
        promesas.push(
          this.programacionSerivce.asignarOrdenes(maquinaALaQueLlega)
        )
      }
      //Ejecutamos todas las promesas juntas.
      forkJoin(promesas).subscribe(x => {})
    } else {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
      if (maquinaALaQueLlega) {
        this.programacionSerivce
          .asignarOrdenes(maquinaALaQueLlega)
          .subscribe(x => {})
      }
    }
  }

  ordenPila = -1
  ordenarPila(maquina: Maquina, campo: string): void {
    this.ordenPila *= -1

    maquina.pila.sort((a, b) => {
      return (a[campo] > b[campo] ? 1 : -1) * this.ordenPila
    })

    this.programacionSerivce.asignarOrdenes(maquina).subscribe(x => {})
  }

  reiniciarPila(maquina: Maquina) {
    this.msjService.confirmacionDeEliminacion(
      'Todas las ordenes volveran a la lista por asignar.',
      () => {
        maquina.pila = []
        this.programacionSerivce
          .asignarOrdenes(maquina)
          .subscribe(m => this.cargarOrdenes())
      }
    )
  }
}
