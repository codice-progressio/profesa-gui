import { ModeloCompleto } from "./modeloCompleto.modelo"
import { Laser } from "./laser.models"
import { Orden } from "./orden.models"
import { Procesos } from "./procesos.model"
import { ColoresTenidos } from "./ColoresTenidos"

export class FolioLinea {
  /**
   *Creates an instance of FolioLinea.
   * @param {string} [_id]
   * @param {ModeloCompleto} [modeloCompleto]
   * @param {number} [cantidad]
   * @param {string} [nivelDeUrgencia]
   * @param {Laser} [laserCliente]
   * @param {boolean} [almacen=false] Define si se surte desde almacen.
   * @param {Date} [createdAt]
   * @param {Date} [updatedAt]
   * @param {number} [porcentajeAvance]
   * @param {ColoresTenidos[]} [coloresTenidos=[]]
   * @param {string} [pedido]
   * @param {Procesos[]} [procesos=[]]
   * @param {boolean} [trayectoGenerado]
   * @param {Date} [fechaTerminado]
   * @param {number} [cantidadProducida]
   * @param {string} [observaciones]
   * @param {string} [observacionesVendedor]
   * @param {boolean} [terminado]
   * @param {boolean} [eliminar=false]
   * @param {Orden[]} [ordenes=[]]
   * @param {boolean} [ordenesGeneradas=false]
   * @param {boolean} [mostrandoInfo=false]
   * @param {boolean} [gui_generarComoMedias]
   * @param {boolean} [requiereRevisionExtraordinaria=true] Revisa si el pedido ya se reviso en el GUI a la hora de generar los pedidos.
   * @memberof FolioLinea
   */
  constructor(
    public _id?: string,
    public modeloCompleto?: ModeloCompleto,
    public cantidad?: number,
    public nivelDeUrgencia?: string,
    public laserCliente?: Laser,
    public almacen: boolean = false,
    public createdAt?: Date,
    public updatedAt?: Date,
    public porcentajeAvance?: number,
    public coloresTenidos: ColoresTenidos[] = [],
    public pedido?: string,
    public procesos: Procesos[] = [],
    public trayectoGenerado?: boolean,
    public fechaTerminado?: Date,
    public cantidadProducida?: number,
    public observaciones?: string,
    public observacionesVendedor?: string,
    public terminado?: boolean,
    // Esta es solo para eliminar con animación.
    public eliminar: boolean = false,
    public ordenes: Orden[] = [],
    public ordenesGeneradas: boolean = false,
    // Para mostrar la info
    public mostrandoInfo: boolean = false,
    public gui_generarComoMedias?: boolean,

    //Este public funciona
    public requiereRevisionExtraordinaria: boolean = false
  ) {}

  deserialize(input: this): this {
    //console.log("x  ?.1");
    Object.assign(this, input)
    this.modeloCompleto = new ModeloCompleto().deserialize(input.modeloCompleto)
    //console.log("x  ?.2");
    this.laserCliente = new Laser().deserialize(input.laserCliente)
    this.coloresTenidos = input.coloresTenidos.map((color) =>
      new ColoresTenidos().deserialize(color)
    )
    //console.log("x  ?.3");

    this.procesos = input.procesos.map((proceso) =>
      new Procesos().deserialize(proceso)
    )

    //console.log("x  ?.4");
    this.ordenes = input.ordenes.map((orden) => new Orden().deserialize(orden))
    //console.log("x  ?");
    if (this.ordenes.length > 0)
      this.ordenes = this.ordenarOrdenes(this.ordenes)
    return this
  }

  popularOrdenes(forzarMedias: boolean = false) {
    // Si las ordenes ya fueron generadas no
    // ejecutamos de nuevo.
    // Calculamos la cantidad de ordenes
    this.ordenes = []
    if (this.almacen) {
      this.generarOrdenesParaAlmacen()
    } else {
      this.generarOrdenes(forzarMedias)
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
  private generarOrdenesParaAlmacen() {
    // Generamos la orden en base a la cantidad de almacen y he ignoramos el
    // valor de generacion de medias ordenes.

    let orden = new Orden()
    orden.unidad = 1
    orden.piezasTeoricas = this.cantidad
    orden.nivelDeUrgencia = this.nivelDeUrgencia
    orden.numeroDeOrden = 0

    this.ordenes.push(orden)
  }

  /**
   *Genera las ordenes para divir la cantidad en base al estandar de produccion.
   *
   * @private
   * @param {boolean} forzarMedias
   * @memberof FolioLinea
   */
  private generarOrdenes(forzarMedias: boolean) {
    let ordenesConDecimales: number = this.comprobarCantidadDeOrdenes()

    let cantidadDeOrdenes = Math.trunc(ordenesConDecimales)

    // Si son medias ordenes multiplicamos la cantidad de ordenes por dos.
    cantidadDeOrdenes = this.comprobarMediasOrdenesEnCantidad(
      cantidadDeOrdenes,
      forzarMedias
    )

    // Obtenemos el sobrante

    let decimalUltimaOrden = Number((ordenesConDecimales % 1).toFixed(4))

    let unidad = this.calcularUnidad(forzarMedias)

    for (let i = 0; i < cantidadDeOrdenes; i++) {
      this.ordenes.push(this.popularOrden(new Orden(), unidad))
    }

    if (ordenesConDecimales % 1 > 0) {
      this.ordenes.push(this.popularOrden(new Orden(), decimalUltimaOrden))
    }

    for (let i = 0; i < this.ordenes.length; i++) {
      const orden = this.ordenes[i]
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
  private popularOrden(orden: Orden, unidad: number): Orden {
    orden.unidad = unidad
    orden.piezasTeoricas = Math.round(
      this.modeloCompleto.tamano.estandar * orden.unidad
    )
    orden.nivelDeUrgencia = this.nivelDeUrgencia
    return orden
  }

  /**
   * Retorna la cantidad de ordenes en base a el estandar junto con decimales
   *
   * @private
   * @returns {number} La cantidad de ordenes con decimales.
   * @memberof FolioLinea
   */
  private comprobarCantidadDeOrdenes(): number {
    return this.cantidad / this.modeloCompleto.tamano.estandar
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
    forzarMedias: boolean
  ): number {
    return this.modeloCompleto.medias || forzarMedias
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
  private calcularUnidad(forzarMedias: boolean): number {
    return this.modeloCompleto.medias || forzarMedias ? 0.5 : 1
  }

  /**
   *Chequeca si requiere una revision extraordinaria a la hora de generar las 
   ordenes. Las cosas que revisa son: 
   * * 1.- Viene de almacen.
   * * 2.- Viene de almacen y se lasera.
   * * 3.- Se va a producir y a laserar pero no tiene el departamento laser en *la familia de procesos.
   * 
   * Esta funcion modifica la propiedad ```this.requiereRevisionExtraordinara```
   * que es la que se debe de usar para comprobar si el pedido requiere la revison. Esta revision se debe de llamar cuando se generan las ordenes del 
   * folio de manera temporal para revisarlas. 
   *
   * @private
   * @param {string} idProcesoLaser El id del proceso laser
   * @returns
   * @memberof FolioLinea
   */
  revisarSiRequiereRevisionExtraordinaria(idProcesoLaser: string) {
    // Solo se puede editar procesos en alguno de estos casos.
    // 1- Viene de almacen.
    // 2- Viene de almacen y se lasera.
    if (this.almacen) {
      return this.almacen
    }
    // 3- Se va a producir y a laserar pero no tiene el departamento laser en la familia de procesos.

    return this.comprobarLaserEnFamiliaDeProcesos(this, idProcesoLaser)
  }

  private comprobarLaserEnFamiliaDeProcesos(
    pedido: FolioLinea,
    idProcesoLaser: string
  ): boolean {
    // Tiene marca laser
    if (pedido.laserCliente.laser) {
      // No incluye el proceso de laser dentro de sus procesos en la familia.
      let l = pedido.modeloCompleto.familiaDeProcesos.procesos.find(
        (p) => idProcesoLaser == p.proceso._id
      )

      // Solo si no tiene el departamento de laser agregado se puede modificar.
      return !l
    }
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
  ordenesSegunEstandar(): number {
    let estandar = this.modeloCompleto.tamano.estandar
    let totalDePedido = this.cantidad

    return totalDePedido / estandar
  }

  ordenarOrdenes(ordenes: Orden[]): Orden[] {
    return ordenes.sort((a, b) => {
      let an = Number(a.orden.split("-")[2])
      let bn = Number(b.orden.split("-")[2])
      return an - bn
    })
  }
}
