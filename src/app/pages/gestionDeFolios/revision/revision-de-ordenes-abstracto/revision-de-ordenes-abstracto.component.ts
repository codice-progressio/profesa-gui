import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { Folio } from '../../../../models/folio.models'
import { FolioLinea } from 'src/app/models/folioLinea.models'
import { Orden } from 'src/app/models/orden.models'
import { DefaultsService } from '../../../../services/configDefualts/defaults.service'
import { DefaultModelData } from '../../../../config/defaultModelData'
import { ActivatedRoute } from '@angular/router'
import { FolioNewService } from '../../../../services/folio/folio-new.service'
import { ModeloCompletoGestorDeProcesosEspecialesComponent } from '../../../../shared/modelo-completo-gestor-de-procesos-especiales/modelo-completo-gestor-de-procesos-especiales.component'
import { Location } from '@angular/common'
import { ParametrosService } from '../../../../services/parametros.service'
import { Proceso } from 'src/app/models/proceso.model'

declare var $: any
@Component({
  selector: 'app-revision-de-ordenes-abstracto',
  templateUrl: './revision-de-ordenes-abstracto.component.html',
  styleUrls: ['./revision-de-ordenes-abstracto.component.css']
})
export class RevisionDeOrdenesAbstractoComponent implements OnInit {
  cargando = {}
  keys = Object.keys
  folio: Folio
  pedidoParaSurtirOLaserar: FolioLinea
  modeloCompletoGestor: ModeloCompletoGestorDeProcesosEspecialesComponent

  procesosEspeciales: Proceso[] = []

  constructor(
    private parametrosServices: ParametrosService,
    private activatedRoute: ActivatedRoute,
    public folioService: FolioNewService,
    public location: Location
  ) {}

  ngOnInit() {
    this.cargando['especiales'] = 'Cargando procesos especiales'
    this.parametrosServices.findAllProcesosEspeciales().subscribe(
      procesos => {
        this.procesosEspeciales = procesos
        delete this.cargando['especiales']
        this.cargarFolio()
      },
      _ => delete this.cargando['especiales']
    )
  }

  cargarFolio() {
    this.cargando['folio'] = 'Cargando datos del folio'
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    this.folioService.findById(id).subscribe(folio => {
      this.folio = folio

      let contador = 0
      this.folio.folioLineas.forEach(pedido => {
        this.listaDeMuestra[pedido.pedido] = false
        pedido.pedido = this.folio.numeroDeFolio + '-' + contador
        this.popularOrdenes(pedido.gui_generarComoMedias, pedido)
        pedido.requiereRevisionExtraordinaria = this.revisarSiRequiereRevisionExtraordinaria(
          this.procesosEspeciales.map(x => x._id),
          pedido
        )

        contador++
      })

      delete this.cargando['folio']
    })
  }

  /**
   *Emite un evento que contiene el folio 
   modificado para que se generen las ordenes 
   desde el componenete externo. 
   *
   * @memberof RevisionDeOrdenesAbstractoComponent
   */
  guardarCambios() {
    this.cargando['liberando'] = 'Procesando folio para produccion'
    this.folioService.revision_liberarParaProduccion(this.folio).subscribe(
      folio => this.location.back(),
      err => delete this.cargando['liberando']
    )
  }

  surtirOLaserar(pedido: FolioLinea) {
    this.pedidoParaSurtirOLaserar = pedido
  }

  permitirEdicionDeProcesos(pedido: FolioLinea): boolean {
    return this.revisarSiRequiereRevisionExtraordinaria(
      this.procesosEspeciales.map(x => x._id),
      pedido
    )
  }

  /**
   *Chequeca si requiere una revision extraordinaria a la hora de generar las 
   ordenes. Las cosas que revisa son: 
   * * 1.- Viene de almacen.
   * * 2.- Viene de almacen y contiene un proceso "especial".
   * 
   * Esta funcion modifica la propiedad ```this.requiereRevisionExtraordinara```
   * que es la que se debe de usar para comprobar si el pedido requiere la revison. Esta revision se debe de llamar cuando se generan las ordenes del 
   * folio de manera temporal para revisarlas. 
   *
   * @private1
   * @param {string} procesosEspeciales Un arreglo con los ids de los procesos especiales. 
   * @returns
   * @memberof FolioLinea
   */
  revisarSiRequiereRevisionExtraordinaria(
    procesosEspeciales: string[],
    pedido: FolioLinea
  ) {
    // Solo se puede editar procesos en alguno de estos casos.
    // 1- Viene de almacen.
    // 2- Viene de almacen y contiene procesos especiales.
    if (pedido.almacen) {
      return pedido.almacen
    }
    // 3- Se va a producir y a laserar pero no tiene el departamento laser en la familia de procesos.
    return this.comprobarProcesosEspeciales(pedido, procesosEspeciales)
  }

  private comprobarProcesosEspeciales(
    pedido: FolioLinea,
    procesosEspeciales: string[]
  ): boolean {
    // Tiene marca laser
    if (pedido.laserCliente.laser) {
      // No incluye ninguno de los procesos especiales dentro de sus procesos en la familia.
      let incluyeProcesosEspeciales = false

      pedido.procesos.forEach(x => {
        if (procesosEspeciales.includes(x.proceso._id))
          //Si incluye un proceso especial, entonces no necesita modificarse.
          incluyeProcesosEspeciales = true
      })

      // Solo si no tiene el departamento de laser agregado se puede modificar.
      return !incluyeProcesosEspeciales
    }

    return false
  }

  popularOrdenes(forzarMedias: boolean = false, pedido: FolioLinea) {
    // Si las ordenes ya fueron generadas no
    // ejecutamos de nuevo.
    // Calculamos la cantidad de ordenes
    pedido.ordenes = []
    if (pedido.almacen) {
      this.generarOrdenesParaAlmacen(pedido)
    } else {
      this.generarOrdenes(forzarMedias, pedido)
    }
  }

  /**
   * Genera las ordenes para dividir la cantidaad en base al total solicitado
   * por el pedido. Se hace de esta manera por que no requerimos ordenes para
   * surtir desde el almacen.
   *
   * @private
   * @memberof FolioLinea
   */
  private generarOrdenesParaAlmacen(pedido: FolioLinea) {
    // Generamos la orden en base a la cantidad de almacen y he ignoramos el
    // valor de generacion de medias ordenes.

    let orden = new Orden()
    orden.unidad = 1
    orden.piezasTeoricas = pedido.cantidad
    orden.nivelDeUrgencia = pedido.nivelDeUrgencia
    orden.numeroDeOrden = 0

    pedido.ordenes.push(orden)
  }

  /**
   *Genera las ordenes para divir la cantidad en base al estandar de produccion.
   *
   * @private
   * @param {boolean} forzarMedias
   * @memberof FolioLinea
   */
  private generarOrdenes(forzarMedias: boolean, pedido: FolioLinea) {
    let ordenesConDecimales: number = this.comprobarCantidadDeOrdenes(pedido)

    let cantidadDeOrdenes = Math.trunc(ordenesConDecimales)

    // Si son medias ordenes multiplicamos la cantidad de ordenes por dos.
    cantidadDeOrdenes = this.comprobarMediasOrdenesEnCantidad(
      cantidadDeOrdenes,
      forzarMedias,
      pedido
    )

    // Obtenemos el sobrante

    let decimalUltimaOrden = Number((ordenesConDecimales % 1).toFixed(4))

    let unidad = this.calcularUnidad(forzarMedias, pedido)

    for (let i = 0; i < cantidadDeOrdenes; i++) {
      pedido.ordenes.push(this.popularOrden(new Orden(), unidad, pedido))
    }

    if (ordenesConDecimales % 1 > 0) {
      pedido.ordenes.push(
        this.popularOrden(new Orden(), decimalUltimaOrden, pedido)
      )
    }

    for (let i = 0; i < pedido.ordenes.length; i++) {
      const orden = pedido.ordenes[i]
      orden.numeroDeOrden = i
    }
  }

  /**
   * Popula una orden para la generacion de las mismas dentro de los pedidos.
   *
   * @private
   * @param {Orden} orden El objeto a popular
   * @param {number} unidad La unidad que tendra la orden.
   * @returns {Orden}
   * @memberof FolioLinea
   */
  private popularOrden(
    orden: Orden,
    unidad: number,
    pedido: FolioLinea
  ): Orden {
    orden.unidad = unidad
    orden.piezasTeoricas = Math.round(
      pedido.modeloCompleto.tamano.estandar * orden.unidad
    )
    orden.nivelDeUrgencia = pedido.nivelDeUrgencia
    return orden
  }

  /**
   * Retorna la cantidad de ordenes en base a el estandar junto con decimales
   *
   * @private
   * @returns {number} La cantidad de ordenes con decimales.
   * @memberof FolioLinea
   */
  private comprobarCantidadDeOrdenes(pedido: FolioLinea): number {
    return pedido.cantidad / pedido.modeloCompleto.tamano.estandar
  }

  /**
   * Revisa la cantidad de ordenes que se van a generar en base a si se
   * seleccionaron medias ordenes o completas. Si es el caso de un
   * folio que se va a surtir de alamacen entonces unicamente permite que se
   * genere una orden
   *
   * @private
   * @param {number} cantidadDeOrdenes El numero de ordenes que ya se calcularon
   * @param {boolean} forzarMedias Obliga a la construccion de medias. Este
   * valor se ignora si es un folio de almacen.
   *
   * @returns {number}
   * @memberof FolioLinea
   */
  private comprobarMediasOrdenesEnCantidad(
    cantidadDeOrdenes: number,
    forzarMedias: boolean,
    pedido: FolioLinea
  ): number {
    return pedido.modeloCompleto.medias || forzarMedias
      ? cantidadDeOrdenes * 2
      : cantidadDeOrdenes
  }

  /**
   *Retorna el valor de la unidad segun corresponda a medias u ordenes
   *
   * @private
   * @param {boolean} forzarMedias
   * @returns {number}
   * @memberof FolioLinea
   */
  private calcularUnidad(forzarMedias: boolean, pedido: FolioLinea): number {
    return pedido.modeloCompleto.medias || forzarMedias ? 0.5 : 1
  }

  /**
   *Retorna la cantidad de ordenes segun el estandar. 
   Esta cantidad varia contra el contedo de ordenes del
   pedido por que las medias ordenes se contemplan como 
   una. Cuando se hace el calculo contra el estandar lo 
   que retorna enrealidad es la cantidad de ordenes 
   en laminas. Si son 
   *
   * @returns {number}
   * @memberof FolioLinea
   */
  ordenesSegunEstandar(pedido): number {
    let estandar = pedido.modeloCompleto.tamano.estandar
    let totalDePedido = pedido.cantidad

    return totalDePedido / estandar
  }

  listaDeMuestra = []
  collapse(id: string) {
    this.listaDeMuestra[id] = !this.listaDeMuestra[id]

    $('.' + id).collapse('toggle')
  }

  collapsado: boolean = false
  collapseAll() {
    this.collapsado = !this.collapsado

    for (const key in this.listaDeMuestra) {
      if (this.listaDeMuestra.hasOwnProperty(key)) {
        this.listaDeMuestra[key] = this.collapsado
      }
    }

    $(`.collapse.revisionDeFolios`).collapse(this.collapsado ? 'hide' : 'show')
  }
}
