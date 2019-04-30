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
   * @param {Procesos[]} [procesos=[]]
   * @param {string} [observaciones]
   * @param {boolean} [terminado]
   * @param {boolean} [eliminar=false]
   * @param {Orden[]} [ordenes=[]]
   * @param {boolean} [ordenesGeneradas=false]
   * @param {boolean} [mostrandoInfo=false]
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
    public gui_generarComoMedias?: boolean
  ) {}

  deserialize(input: this): this {
    //console.log("x  ?.1");
    Object.assign(this, input)
    this.modeloCompleto = new ModeloCompleto().deserialize(input.modeloCompleto)
    //console.log("x  ?.2");
    this.laserCliente = new Laser().deserialize(input.laserCliente)
    this.coloresTenidos = input.coloresTenidos.map(color =>
      new ColoresTenidos().deserialize(color)
    )
    //console.log("x  ?.3");

    this.procesos = input.procesos.map(proceso =>
      new Procesos().deserialize(proceso)
    )

    //console.log("x  ?.4");
    this.ordenes = input.ordenes.map(orden => new Orden().deserialize(orden))
    //console.log("x  ?");
    return this
  }

  popularOrdenes(forzarMedias: boolean = false) {
    // Si las ordenes ya fueron generadas no
    // ejecutamos de nuevo.
    this.ordenes = []
    // Calculamos la cantidad de ordenes

    let ordenesConDecimales: number =
      this.cantidad / this.modeloCompleto.tamano.estandar

    let cantidadDeOrdenes = Math.trunc(ordenesConDecimales)

    // Si son medias ordenes multiplicamos la cantidad de ordenes por dos.
    cantidadDeOrdenes =
      this.modeloCompleto.medias || forzarMedias
        ? cantidadDeOrdenes * 2
        : cantidadDeOrdenes

    // Obtenemos el sobrante

    let decimalUltimaOrden = Number((ordenesConDecimales % 1).toFixed(4))

    let unidad = this.modeloCompleto.medias || forzarMedias ? 0.5 : 1

    for (let i = 0; i < cantidadDeOrdenes; i++) {
      let orden = new Orden()

      orden.unidad = unidad
      orden.piezasTeoricas = Math.round(
        this.modeloCompleto.tamano.estandar * unidad
      )
      orden.nivelDeUrgencia = this.nivelDeUrgencia

      this.ordenes.push(orden)
    }

    if (ordenesConDecimales % 1 > 0) {
      let orden = new Orden()
      orden.unidad = decimalUltimaOrden
      orden.piezasTeoricas = Math.round(
        this.modeloCompleto.tamano.estandar * decimalUltimaOrden
      )
      orden.nivelDeUrgencia = this.nivelDeUrgencia

      this.ordenes.push(orden)
    }

    for (let i = 0; i < this.ordenes.length; i++) {
      const orden = this.ordenes[i]
      orden.numeroDeOrden = i
    }
  }
}
