import { AgrupacionTransformacionPedido } from './AgrupacionTransformacionPedido';
/**
 * Agrupa las ordenes por modelos.
 *
 * @class AgrupacionTransformacionModelo
 */
export class AgrupacionTransformacionModelo {
    /**
     *La cantidad de ordenes que tienen la prioridad mayor. 
     Asi sabemos que si hay urgenes cuantas sin necesidad de desplegar
     mas informacion. 
     *
     * @type {number}
     * @memberof AgrupacionTransformacionModelo
     */
    public get cantidadDePrioridadMayor(): number {
        return this._cantidadDePrioridadMayor;
    }
    public set cantidadDePrioridadMayor(value: number) {
        this._cantidadDePrioridadMayor = value;
    }
    /**
     *El nombre del modelo completo que es a la vez
     llave y nombre.
     *
     * @type {{
     *         [key: string]: AgrupacionTransformacionPedido;
     *     }}
     * @memberof AgrupacionTransformacionModelo
     */
    public get modeloCompleto(): {
        [key: string]: AgrupacionTransformacionPedido;
    } {
        return this._modeloCompleto;
    }
    public set modeloCompleto(value: {
        [key: string]: AgrupacionTransformacionPedido;
    }) {
        this._modeloCompleto = value;
    }
    /**
     *La prioridad de mayor nivel.
     *
     * @type {string}
     * @memberof AgrupacionTransformacionModelo
     */
    public get prioridadMayor(): string {
        return this._prioridadMayor;
    }
    public set prioridadMayor(value: string) {
        this._prioridadMayor = value;
    }
    /**
     *La suma de las ordenes que estan disponibles de este modelo.
     *
     * @type {number}
     * @memberof AgrupacionTransformacionModelo
     */
    public get totalDeOrdenes(): number {
        return this._totalDeOrdenes;
    }
    public set totalDeOrdenes(value: number) {
        this._totalDeOrdenes = value;
    }
    constructor(private _totalDeOrdenes: number = 0, private _prioridadMayor?: string, private _modeloCompleto?: {
        [key: string]: AgrupacionTransformacionPedido;
    }, private _cantidadDePrioridadMayor: number = 0) {
    }
}
