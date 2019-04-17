import { ModeloCompleto } from './modeloCompleto.modelo';
import { Laser } from './laser.models';
import { Orden } from './orden.models';
import { Procesos } from "./procesos.model";
import { ColoresTenidos } from './ColoresTenidos';

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
        public ordenes: Orden[] = [] ,
        public ordenesGeneradas: boolean = false,

        // Para mostrar la info 
        public mostrandoInfo: boolean = false
    ) {}
}



