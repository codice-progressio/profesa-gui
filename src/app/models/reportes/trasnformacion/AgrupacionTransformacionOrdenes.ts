import { OrdenReporteTransformacion } from "./OrdenReporteTransformacion";
import { Laser } from "../../laser.models";

/**
 *Acumula los datos para el pedido junto con sus ordenes. 
 *
 * @export
 * @class AgrupacionTransformacionOrdenes
 */
export class AgrupacionTransformacionOrdenes {
  idCollapse: string;

  

    /**
     * La cantidad de ordenes de la priodad mayor. 
     *
     * @type {number}
     * @memberof AgrupacionTransformacionOrdenes
     */
    public get cantidadDePrioridadMayor(): number {
        return this._cantidadDePrioridadMayor;
    }
    public set cantidadDePrioridadMayor(value: number) {
        this._cantidadDePrioridadMayor = value;
    }

    /**
     *Las observaciones del pedido. Se extraen desde el folio.
     *
     * @type {string}
     * @memberof AgrupacionTransformacionPedido
     */
    public get observaciones(): string {
        return this._observaciones;
    }
    public set observaciones(value: string) {
        this._observaciones = value;
    }
    /**
     *El cliente de este pedido. 
     *
     * @type {string}
     * @memberof AgrupacionTransformacionOrdenes
     */
    public get cliente(): string {
        return this._cliente;
    }
    public set cliente(value: string) {
        this._cliente = value;
    }
    /**
     *Las ordenes que pertenecen a este pedido. 
     *
     * @type {OrdenReporteTransformacion[]}
     * @memberof AgrupacionTransformacionOrdenes
     */
    public get ordenes(): OrdenReporteTransformacion[] {
        return this._ordenes;
    }
    public set ordenes(value: OrdenReporteTransformacion[]) {
        this._ordenes = value;
    }
    /**
     *La fecha de este pedido. 
     *
     * @type {Date}
     * @memberof AgrupacionTransformacionOrdenes
     */
    public get fechaDePedido(): Date {
        return this._fechaDePedido;
    }
    public set fechaDePedido(value: Date) {
        this._fechaDePedido = value;
    }
    /**
     *La prioridad mayor de este pedido. 
     *
     * @type {string}
     * @memberof AgrupacionTransformacionOrdenes
     */
    public get prioridadMayor(): string {
        return this._prioridadMayor;
    }
    public set prioridadMayor(value: string) {
        this._prioridadMayor = value;
    }
    constructor(
        private _prioridadMayor?: string, 
        private _fechaDePedido?: Date,
        private _ordenes: OrdenReporteTransformacion[] = [],
        private _cliente?: string,
        private _observaciones?: string, 
        private _cantidadDePrioridadMayor: number = 0,
    ) {
        
    }
}