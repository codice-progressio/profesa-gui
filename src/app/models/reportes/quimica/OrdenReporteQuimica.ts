import { Trayecto } from "src/app/models/trayecto.models";
import { ModeloCompleto } from "src/app/models/modeloCompleto.modelo";
import { Usuario } from "src/app/models/usuario.model";
import { Cliente } from "../../cliente.models";
import { Laser } from "../../laser.models";
/**
 *La orden con los valores exactos para que coincida con el reporte de quimica.
 *
 * @class OrdenReporteQuimica
 */
export class OrdenReporteQuimica {
    
    /**
     *La marca laser del cliente. 
     *
     * @type {Laser}
     * @memberof OrdenReporteQuimica
     */
    laserCliente: Laser;
    
    
    public get cliente(): Cliente {
        return this._cliente;
    }
    public set cliente(value: Cliente) {
        this._cliente = value;
    }

    /**
     *El id de la orden.
     *
     * @type {string}
     * @memberof OrdenReporteQuimica
     */
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    /**
     *La ubicacion actual de la orden.
     *
     * @type {Trayecto}
     * @memberof OrdenReporteQuimica
     */
    public get ubicacionActual(): Trayecto {
        return this._ubicacionActual;
    }
    public set ubicacionActual(value: Trayecto) {
        this._ubicacionActual = value;
    }
    /**
     *El departamento al que se dirige la orden.
     *
     * @type {Trayecto}
     * @memberof OrdenReporteQuimica
     */
    public get siguienteDepartamento(): Trayecto {
        return this._siguienteDepartamento;
    }
    public set siguienteDepartamento(value: Trayecto) {
        this._siguienteDepartamento = value;
    }
    /**
     *True si la orden se surtio desde el almacen de producto terminado.
     *
     * @type {boolean}
     * @memberof OrdenReporteQuimica
     */
    public get desdeAlmacen(): boolean {
        return this._desdeAlmacen;
    }
    public set desdeAlmacen(value: boolean) {
        this._desdeAlmacen = value;
    }
    /**
     *El id del folio. Es solo un string.
     *
     * @type {string}
     * @memberof OrdenReporteQuimica
     */
    public get idFolio(): string {
        return this._idFolio;
    }
    public set idFolio(value: string) {
        this._idFolio = value;
    }
    /**
     *La fecha que se genero el folio.
     *
     * @type {Date}
     * @memberof OrdenReporteQuimica
     */
    public get fechaFolio(): Date {
        return this._fechaFolio;
    }
    public set fechaFolio(value: Date) {
        this._fechaFolio = value;
    }
    /**
     *El vendedor.
     *
     * @type {Usuario}
     * @memberof OrdenReporteQuimica
     */
    public get vendedor(): Usuario {
        return this._vendedor;
    }
    public set vendedor(value: Usuario) {
        this._vendedor = value;
    }
    /**
     *EL numero de la orden generado para seguimiento. 10-0-1
     *
     * @type {string}
     * @memberof OrdenReporteQuimica
     */
    public get orden(): string {
        return this._orden;
    }
    public set orden(value: string) {
        this._orden = value;
    }
    /**
     *El numero de pedido.
     *
     * @type {string}
     * @memberof OrdenReporteQuimica
     */
    public get pedido(): string {
        return this._pedido;
    }
    public set pedido(value: string) {
        this._pedido = value;
    }
    /**
     *El modelo completo de la orden.
     *
     * @type {ModeloCompleto}
     * @memberof OrdenReporteQuimica
     */
    public get modeloCompleto(): ModeloCompleto {
        return this._modeloCompleto;
    }
    public set modeloCompleto(value: ModeloCompleto) {
        this._modeloCompleto = value;
    }
    /**
     *El trayecto que ha recorrido la orden.
     *
     * @type {Trayecto[]}
     * @memberof OrdenReporteQuimica
     */
    public get trayectoRecorrido(): Trayecto[] {
        return this._trayectoRecorrido;
    }
    /**
     *El trayecto que ya ha recorrido la orden.
     *
     * @memberof OrdenReporteQuimica
     */
    public set trayectoRecorrido(value: Trayecto[]) {
        this._trayectoRecorrido = value;
    }
    /**
     *El trayecto normal que ya ha recorrido
     *
     * @type {Trayecto[]}
     * @memberof OrdenReporteQuimica
     */
    public get trayectoNormal(): Trayecto[] {
        return this._trayectoNormal;
    }
    public set trayectoNormal(value: Trayecto[]) {
        this._trayectoNormal = value;
    }
    /**
     *El porcentaje
     *
     * @type {number}
     * @memberof OrdenReporteQuimica
     */
    public get porcentajeAvance(): number {
        return this._porcentajeAvance;
    }
    public set porcentajeAvance(value: number) {
        this._porcentajeAvance = value;
    }
    /**
     *Define si esta orden ya se termino de producir.
     *
     * @type {boolean}
     * @memberof OrdenReporteQuimica
     */
    public get terminada(): boolean {
        return this._terminada;
    }
    public set terminada(value: boolean) {
        this._terminada = value;
    }
    /**
     *Las observaciones de la orden.
     *
     * @type {string}
     * @memberof OrdenReporteQuimica
     */
    public get observaciones(): string {
        return this._observaciones;
    }
    public set observaciones(value: string) {
        this._observaciones = value;
    }
    /**
     *Piezas teoricas que debe tener la orden.
     *
     * @type {number}
     * @memberof OrdenReporteQuimica
     */
    public get piezasTeoricas(): number {
        return this._piezasTeoricas;
    }
    public set piezasTeoricas(value: number) {
        this._piezasTeoricas = value;
    }
    /**
     *La unidad. 1, .5 o decimal.
     *
     * @type {number}
     * @memberof OrdenReporteQuimica
     */
    public get unidad(): number {
        return this._unidad;
    }
    public set unidad(value: number) {
        this._unidad = value;
    }
    /**
     *El numero de orden.
     *
     * @type {number}
     * @memberof OrdenReporteQuimica
     */
    public get numeroDeOrden(): number {
        return this._numeroDeOrden;
    }
    public set numeroDeOrden(value: number) {
        this._numeroDeOrden = value;
    }
    /**
     *El nivel de prioridad de la orden.
     *
     * @type {string}
     * @memberof OrdenReporteQuimica
     */
    public get nivelDeUrgencia(): string {
        return this._nivelDeUrgencia;
    }
    public set nivelDeUrgencia(value: string) {
        this._nivelDeUrgencia = value;
    }
    constructor(
        private _nivelDeUrgencia?: string, 
        private _id?: string, 
        private _numeroDeOrden?: number, 
        private _unidad?: number, 
        private _piezasTeoricas?: number, 
        private _observaciones?: string, 
        private _terminada?: boolean, 
        private _porcentajeAvance?: number, 
        private _trayectoNormal?: Trayecto[], 
        private _trayectoRecorrido?: Trayecto[], 
        private _modeloCompleto?: ModeloCompleto, 
        private _pedido?: string, 
        private _orden?: string, 
        private _vendedor?: Usuario, 
        private _fechaFolio?: Date, 
        private _idFolio?: string, 
        private _desdeAlmacen?: boolean, 
        private _siguienteDepartamento?: Trayecto, 
        private _ubicacionActual?: Trayecto,
        private _cliente?: Cliente) {
    }
}
