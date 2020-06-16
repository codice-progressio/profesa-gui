import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { ModeloCompleto } from '../../models/modeloCompleto.modelo'
import { ModeloCompletoService } from '../../services/modelo/modelo-completo.service'
import { Proceso } from 'src/app/models/proceso.model'
import { FamiliaDeProcesosService } from '../../services/proceso/familia-de-procesos.service'
import { ProcesoService } from '../../services/proceso/proceso.service'
import { FolioLinea } from '../../models/folioLinea.models'
import { Paginacion } from '../../utils/paginacion.util'
import { ParametrosService } from '../../services/parametros.service'
import { ManejoDeMensajesService } from '../../services/utilidades/manejo-de-mensajes.service'
import { Procesos } from '../../models/procesos.model'
import {
  CdkDragDrop,
  moveItemInArray,
  copyArrayItem
} from '@angular/cdk/drag-drop'

@Component({
  selector: 'app-modelo-completo-gestor-de-procesos-especiales',
  templateUrl: './modelo-completo-gestor-de-procesos-especiales.component.html'
})
export class ModeloCompletoGestorDeProcesosEspecialesComponent
  implements OnInit {
  cargando = {}
  keys = Object.keys

  almacen = {}

  _pedido: FolioLinea
  @Input() set pedido(pedido: FolioLinea) {
    if (pedido) {
      console.log(`pedido._id`, pedido._id)
      this._pedido = pedido

      this.inicializar()
      this.discriminarAcciones(pedido)
    }
  }

  get pedido() {
    return this._pedido
  }

  procesos: iDeshabilitar[] = []

  procesosSeleccionados: iDeshabilitar[] = []
  procesosEspeciales: Proceso[] = []

  mostrarIniciales = false
  procesosIniciales: Proceso[] = []
  mostrarInicialesAlmacen = false
  procesosInicialesAlmacen: Proceso[] = []
  procesosFinales: Proceso[] = []

  mostrarProcesos = []
  /**
   *Este modelo completo temporal nos sirve para estructurar los procesos
   * y obtener el orden de los especiales. Es necesario definirlo.
   *
   * @type {ModeloCompleto}
   * @memberof ModeloCompletoGestorDeProcesosEspecialesComponent
   */
  mctemp: ModeloCompleto = null

  /**
   *Retorna este componente.
   *
   * @memberof ModeloCompletoGestorDeProcesosEspecialesComponent
   */
  @Output() esteComponente = new EventEmitter<this>()

  constructor(
    public smc: ModeloCompletoService,
    public familiaService: FamiliaDeProcesosService,
    public procesoService: ProcesoService,
    public parametrosService: ParametrosService,
    public msjService: ManejoDeMensajesService
  ) {}

  ngOnInit() {
    this.esteComponente.emit(this)
  }

  inicializar() {
    this.cargando['localizacion'] = 'Cargando procesos por defecto'
    this.parametrosService.findAllLocalizacionDeOrdenes().subscribe(
      datos => {
        this.procesosIniciales = datos.procesosIniciales
        this.procesosInicialesAlmacen = datos.procesosInicialesAlmacen
        this.procesosFinales = datos.procesosFinales

        delete this.cargando['localizacion']
      },
      () => delete this.cargando['localizacion']
    )
    //En caso de que el pedido venga de almacen y no este laserado
    // se deben enlistar todos los procesos.

    this.cargando['parametros'] = 'Buscando procesos especiales'

    // Si el pedido es de almacen y pero no va laserado
    // mostramos todos los procesos por que puede llevar cualquier proceso
    this.procesoService.findAll(new Paginacion(100, 0, 1, 'nombre')).subscribe(
      procesos => {
        this.procesos = procesos.map(x => {
          this.mostrarProcesos.push(x._id)
          return { proceso: x, disabled: false } as iDeshabilitar
        })
        delete this.cargando['parametros']
      },

      _ => delete this.cargando['parametros']
    )

    this.cargando['especiales'] = 'Cargando procesos especiales'

    this.parametrosService.findAllProcesosEspeciales().subscribe(
      procesos => {
        this.procesosEspeciales = procesos
        delete this.cargando['especiales']
      },
      _ => delete this.cargando['especiales']
    )
  }

  revisarPedido() {




    //Por defecto copiamos todos los procesos seleccionados al campo de procesos
    // extraordinarios. Este campo nos va a permitir generar de manera mas facil las ordenes. 
    this.pedido.procesosExtraordinarios = this.procesosSeleccionados.map(
      x => x.proceso
    )
    //Que los pedidos no aceptados tengan por lo menos un
    // proceso de los senalados como especiales, pero en el caso
    // de que sea de almacen y no vaya laserado, pues no se ocupa esta
    // validacion


    //La excepcion es que no este laserado y que sea de almacen
    if (!this.pedido.laserCliente?.laser && this.pedido.almacen) {
      // En este caso solo invertimos requiereRevisionExtraordinaria
      // para acpetar y rechar el pedido sin hacer ninguna otra
      // comprobacion extra.
      this.pedido.requiereRevisionExtraordinaria = !this.pedido
        .requiereRevisionExtraordinaria
      return
    }

    if (!this.pedido.requiereRevisionExtraordinaria) {
      this.pedido.requiereRevisionExtraordinaria = true
      return
    }

    let incluyeProcesoEspeciales = this.procesosSeleccionados.some(
      (element: iDeshabilitar) =>
        this.procesosEspeciales.map(x => x._id).includes(element.proceso._id)
    )

    if (incluyeProcesoEspeciales) {
      //Todo esta bien, ya no requiere...
      this.pedido.requiereRevisionExtraordinaria = false
    } else {
      let msj =
        'El pedido aun no cumple las condiciones necesarias para ser aceptado. Debes de definir por lo menos un proceso senalado como especial.<br> Estos son los procesos senalados como especiales actualmente:'

      msj += `<table  class="table table-hover text-left">
      <thead>
        <tr>
          <th>Proceso</th>
          <th>Departamento</th>
        </tr>
      </thead>
      <tbody>
         `

      msj += this.procesosEspeciales
        .map(
          x =>
            `<tr><td>${x.nombre}</td> <td>${x.departamento.nombre}</td> </tr>`
        )
        .join(' ')

      msj += ` 
        </tbody>
      </table>`

      this.msjService.invalido(msj, 'Falta definir procesos', 15000)
    }
  }

  filtrarDisponibles(termino: string) {
    const tLimpio = termino.trim()
    if (tLimpio) {
      this.mostrarProcesos = this.procesos
        .map(x => {
          return x.proceso.nombre
            .toLowerCase()
            .concat(' ')
            .concat(x.proceso.departamento.nombre.toLowerCase())
            .concat(' ')
            .concat('@@@' + x.proceso._id)
        })
        .filter(x => x.includes(termino.toLowerCase()))
        .map(x => x.split('@@@')[1])
    } else {
      this.mostrarProcesos = this.procesos.map(x => x.proceso._id)
    }
  }

  drop(e: CdkDragDrop<iDeshabilitar[]>) {
    if (!this.pedido.requiereRevisionExtraordinaria) {
      this.msjService.invalido(
        'El pedido ya fue aceptado y no se puede modificar hasta que se rechace.',
        'Accion no permitida',
        7000
      )
      return
    }

    if (e.container !== e.previousContainer) {
      let r = (a, b) => a.concat(' ' + b._id)
      let pF: string = this.procesosFinales.reduce(r, '')
      let pI: string = this.procesosIniciales.reduce(r, '')
      let pro = this.procesos[e.previousIndex]

      if (pF.includes(pro.proceso._id) || pI.includes(pro.proceso._id)) {
        this.msjService.confirmarAccion(
          'Este proceso esta incluido en los procesos de inicializacion o finalizacion, Aun asi quieres agregarlo?',
          () => {
            this.continuarAgregandoProceso(e)
          }
        )
      } else {
        this.continuarAgregandoProceso(e)
      }
    } else {
      moveItemInArray(e.container.data, e.previousIndex, e.currentIndex)
    }

    this.almacen[this.pedido._id] = this.procesosSeleccionados
  }

  continuarAgregandoProceso(event: CdkDragDrop<iDeshabilitar[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    } else {
      if (event.item.data === 'eliminar-al-transferir') {
        this.procesosSeleccionados.splice(event.previousIndex, 1)
        return
      }

      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    }
  }

  discriminarAcciones(pedido: FolioLinea) {
    //Se surte de almacen?
    this.procesosSeleccionados = []

    this.mostrarIniciales = !pedido.almacen
    this.mostrarInicialesAlmacen = !this.mostrarIniciales

    // Si se surte de almacen no es necesario que busquemos el modelo
    // completo, por que solo vamos a agregar procesos especiales.

    if (pedido.almacen) {
      //Comprobamos si hay almacenamiento
      if (this.almacen.hasOwnProperty(pedido._id))
        this.procesosSeleccionados = this.almacen[pedido._id]
      return
    }

    this.cargando['modeloCompleto'] = 'Cargando datos del SKU'

    this.smc.findById(pedido.modeloCompleto._id).subscribe(
      mc => {
        this.mctemp = mc
        delete this.cargando['modeloCompleto']

        if (this.almacen.hasOwnProperty(pedido._id)) {
          this.procesosSeleccionados = this.almacen[pedido._id]
        } else {
          this.procesosSeleccionados = mc.familiaDeProcesos.procesos.map(x => {
            return { proceso: x.proceso, disabled: true }
          })
        }
      },
      _ => delete this.cargando['modeloCompleto']
    )
  }
}

interface iDeshabilitar {
  proceso: Proceso
  disabled: boolean
}
