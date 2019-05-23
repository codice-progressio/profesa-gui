import { OrdenReporteQuimica } from "./OrdenReporteQuimica";
import { Cliente } from "../../cliente.models";
import { ModeloCompleto } from "../../modeloCompleto.modelo";
import { Laser } from "../../laser.models";
/**
 *Esta clase almacena todas las ordenReporteQuimica de un pedido
 dividas en trabajando, disponibles y pendientes. 
 *
 * @export
 * @class PedidoReporteQuimica
 */
export class PedidoReporteQuimica {
    /**
     *El modelo completo. 
     *
     * @type {ModeloCompleto}
     * @memberof PedidoReporteQuimica
     */
    modeloCompleto: ModeloCompleto;
    /**
     *Denota si el pedido es de baston. 
     *
     * @type {boolean}
     * @memberof PedidoReporteQuimica
     */
    esBaston: boolean;
    /**
     *La marca laser que el cliente quiere laserar. 
     *
     * @type {Laser}
     * @memberof PedidoReporteQuimica
     */
    laserCliente: Laser;
    /**
     *El nivel de urgencia del pedido. 
     *
     * @type {string}
     * @memberof PedidoReporteQuimica
     */
    prioridad: string;
    /**
     *Las observaciones. 
     *
     * @type {string}
     * @memberof PedidoReporteQuimica
     */
    observaciones: string;
    
    /**
     *En si, es la fecha del folio. 
     *
     * @type {Date}
     * @memberof PedidoReporteQuimica
     */
    public get fechaPedido(): Date {
        return this._fechaPedido;
    }
    public set fechaPedido(value: Date) {
        this._fechaPedido = value;
    }
   
    public get cliente(): Cliente {
        return this._cliente;
    }
    public set cliente(value: Cliente) {
        this._cliente = value;
    }
   
    public get trabajando(): OrdenReporteQuimica[] {
        return this._trabajando;
    }
    public set trabajando(value: OrdenReporteQuimica[]) {
        this._trabajando = value;
    }
    public get disponibles(): OrdenReporteQuimica[] {
        return this._disponibles;
    }
    public set disponibles(value: OrdenReporteQuimica[]) {
        this._disponibles = value;
    }
    public get pendientes(): OrdenReporteQuimica[] {
        return this._pendientes;
    }
    public set pendientes(value: OrdenReporteQuimica[]) {
        this._pendientes = value;
    }
    constructor(
        private _pendientes: OrdenReporteQuimica[] = [], 
        private _disponibles: OrdenReporteQuimica[] = [], 
        private _trabajando: OrdenReporteQuimica[] = [],
        private _cliente?: Cliente,
        private _fechaPedido?: Date
        ) {
    }
}
