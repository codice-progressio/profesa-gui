import { ModeloCompleto } from './modeloCompleto.modelo'
import { Laser } from './laser.models'
import { Orden } from './orden.models'
import { Procesos } from './procesos.model'
import { ColoresTenidos } from './ColoresTenidos'
import { Proceso } from 'src/app/models/proceso.model'

export class FolioLinea {
  /**
   *Crea una instancia de un pedido
   * @param {string} [_id] El id de la base de datos
   * @param {ModeloCompleto} [modeloCompleto] El SKU que va relacionado al pedido
   * @param {number} [cantidad] La cantidad solicictada en el pedido. De aqui se generan las ordenes
   * @param {string} [nivelDeUrgencia] @deprecated
   * @param {Laser} [laserCliente] La marca laser que asigna el cliente
   * @param {boolean} [almacen=false] Si el pedido se surte de almacen o no
   * @param {Date} [createdAt] Fecha de creacion
   * @param {Date} [updatedAt] Fecha de ultima modificacion
   * @param {number} [porcentajeAvance] El porcentaje de avance. Se calcula en el backend y el la suma del avance de todas las ordennes de este pedido
   * @param {ColoresTenidos[]} [coloresTenidos=[]] @deprecated
   * @param {string} [pedido] El numero de pedido, es el orden del arreglo
   * @param {Procesos[]} [procesos=[]] @deprecated
   * @param {boolean} [trayectoGenerado] 'Define si ya se creo el trayecto de todas las ordenes
   * @param {Date} [fechaTerminado] La fecha en que se termina la ultima orden del pedido.
   * @param {number} [cantidadProducida] La cantidad total que se produjo del pedido. Es la suma de todas las ordenes.
   * @param {string} [observaciones] Las observaciones que vera produccion (Todas las estaciones)
   * @param {string} [observacionesVendedor] Las observaciones que solo vera control de produccion
   * @param {boolean} [terminado] Define si el pedido esta terminado
   * @param {boolean} [eliminar=false] @deprecated
   * @param {Orden[]} [ordenes=[]] Las ordenes del pedido
   * @param {boolean} [ordenesGeneradas=false] Define si ya se generaron las ordnees.
   * @param {boolean} [mostrandoInfo=false] No se que sea esto
   * @param {boolean} [gui_generarComoMedias]
   * @param {boolean} [requiereRevisionExtraordinaria=false]  Define si el pedido se debe revisar de manera extraoirdinaria
   * @param {Proceso[]} [procesosExraordinarios=[]] Deposito temporal para los proceoss extraordinarios.
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
    public requiereRevisionExtraordinaria: boolean = false,

    public procesosExraordinarios: Proceso[] = [],
    //Senala que para este pedido debemos utilizar la lista
    // de procesosExtraordinarios
    public usarProcesosExtraordinarios = false
  ) {}
}
