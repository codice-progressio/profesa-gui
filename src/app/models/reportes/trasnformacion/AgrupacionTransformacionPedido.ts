import { OrdenReporteTransformacion } from './OrdenReporteTransformacion';
import { AgrupacionTransformacionOrdenes } from './AgrupacionTransformacionOrdenes';
/**
 *Agrupa las ordenes en base a su  por pedido.
 *
 * @class AgrupacionTransformacionPedido
 */
export class AgrupacionTransformacionPedido {
    idCollapse: string;
    public get cantidadDePrioridadMayor(): number {
        return this._cantidadDePrioridadMayor;
    }
    public set cantidadDePrioridadMayor(value: number) {
        this._cantidadDePrioridadMayor = value;
    }
    /**
     *El objeto que almacena la clave del pedido para guardar las ordenes.
     *
     * @type {{
     *         [pedido: string]: AgrupacionTransformacionOrdenes[];
     *     }}
     * @memberof AgrupacionTransformacionPedido
     */
    public get pedido(): {
        [pedido: string]: AgrupacionTransformacionOrdenes;
    } {
        return this._pedido;
    }
    public set pedido(value: {
        [pedido: string]: AgrupacionTransformacionOrdenes;
    }) {
        this._pedido = value;
    }
    /**
     *El total de ordenes del pedido que estan en ese paso.
     *
     * @type {number}
     * @memberof AgrupacionTransformacionPedido
     */
    public get totalDeOrdenes(): number {
        return this._totalDeOrdenes;
    }
    public set totalDeOrdenes(value: number) {
        this._totalDeOrdenes = value;
    }
    
    /**
     *La prioridad de mayor valor del folio.
     *
     * @type {string}
     * @memberof AgrupacionTransformacionPedido
     */
    public get prioridadMayor(): string {
        return this._prioridadMayor;
    }
    public set prioridadMayor(value: string) {
        this._prioridadMayor = value;
    }
    /**
     *La fecha de creacion del pedido.
     *
     * @type {string}
     * @memberof AgrupacionTransformacionPedido
     */
    public get fechaDePedido(): Date {
        return this._fechaDePedido;
    }
    public set fechaDePedido(value: Date) {
        this._fechaDePedido = value;
    }
   
    constructor(
        private _fechaDePedido?: Date, 
        private _prioridadMayor?: string, 
       
        private _totalDeOrdenes: number = 0, 
        private _pedido?: {
        [pedido: string]: AgrupacionTransformacionOrdenes;
    }, 
    private _cantidadDePrioridadMayor: number = 0) {
    }
}
