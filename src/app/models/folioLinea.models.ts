import { ModeloCompleto } from './modeloCompleto.modelo'
import { Laser } from './laser.models'
import { Orden } from './orden.models'
import { Procesos } from './procesos.model'
import { ColoresTenidos } from './ColoresTenidos'

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
    Object.assign(this, input)
    this.modeloCompleto = new ModeloCompleto().deserialize(input.modeloCompleto)

    this.laserCliente = new Laser().deserialize(input.laserCliente)

    if (input.coloresTenidos) {
      this.coloresTenidos = input.coloresTenidos.map(color =>
        new ColoresTenidos().deserialize(color)
      )
    }

    if (input.procesos) {
      this.procesos = input.procesos.map(proceso =>
        new Procesos().deserialize(proceso)
      )
    }

    this.ordenes = input.ordenes.map(orden => new Orden().deserialize(orden))

    if (this.ordenes.length > 0)
      this.ordenes = this.ordenarOrdenes(this.ordenes)
    return this
  }

 

  ordenarOrdenes(ordenes: Orden[]): Orden[] {
    return ordenes.sort((a, b) => {
      let an = Number(a.orden.split('-')[2])
      let bn = Number(b.orden.split('-')[2])
      return an - bn
    })
  }
}
