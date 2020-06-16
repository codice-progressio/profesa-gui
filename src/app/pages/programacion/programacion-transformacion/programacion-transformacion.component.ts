import {
  Component,
  OnInit,
  ViewChildren,
  ViewChild,
  ElementRef
} from '@angular/core'
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
import { ParametrosService } from '../../../services/parametros.service'
import { Departamento } from '../../../models/departamento.models'
import { OrdenLigera } from '../../../services/folio/folio-new.service'

@Component({
  selector: 'app-programacion-transformacion',
  templateUrl: './programacion-transformacion.component.html',
  styleUrls: ['./programacion-transformacion.component.css']
})
export class ProgramacionTransformacionComponent implements OnInit, OnDestroy {
  ordenes: OrdenLigera[] = []

  maquinas: Maquina[] = []

  cargando = {}
  keys = Object.keys

  // cargandoOrdenes = false
  // cargandoMaquinas = false
  totalOrdenesAsignadas: number = 0

  ultimaActualizacion: Date
  intervalo = null

  departamentoTransformacion: Departamento

  constructor(
    private msjService: ManejoDeMensajesService,
    private programacionSerivce: ProgramacionTransformacionService,
    private maquinaService: MaquinaService,
    public parametrosService: ParametrosService
  ) {}

  ngOnInit() {
    this.actualizarTodo()
  }

  ngOnDestroy() {}

  actualizarTodo() {
    this.cargando['parametros'] = 'Obteniendo parametros'

    this.parametrosService.findDepartamentoTransformacion().subscribe(
      depa => {
        this.departamentoTransformacion = depa
        this.cargarOrdenes()
        this.cargarMaquinas()
        delete this.cargando['parametros']
      },
      _ => delete this.cargando['parametros']
    )
  }

  cargarMaquinas() {
    this.cargando['maquinas'] = 'Obteniendo maquinas'
    this.maquinaService
      .buscarMaquinasPorDepartamento(this.departamentoTransformacion._id)
      .subscribe(
        maquinas => {
          this.maquinas = maquinas.sort((a, b) => (a.clave > b.clave ? 1 : -1))

          this.totalOrdenesAsignadas = this.calcularOrdenesAsignadas(
            this.maquinas
          )

          delete this.cargando['maquinas']
          this.ultimaActualizacion = new Date()
        },
        _ => delete this.cargando['maquinas']
      )
  }

  calcularOrdenesAsignadas(maquinas: Maquina[]): number {
    return this.maquinas.reduce((a, b) => {
      return (a += b.pila.length)
    }, 0)
  }

  cargarOrdenes() {
    this.cargando['ordenes'] = 'Obteniendo ordenes'

    this.programacionSerivce
      .ordenesPorAsignar(this.departamentoTransformacion._id)
      .subscribe(
        ordenes => {
          this.ordenes = ordenes
          delete this.cargando['ordenes']
          this.ultimaActualizacion = new Date()
        },
        _ => delete this.cargando['ordenes']
      )
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
  ordenesFiltradas: OrdenLigera[]

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
          x.sku.toLowerCase().includes(termino)
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
    event: CdkDragDrop<OrdenLigera[]>,
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
