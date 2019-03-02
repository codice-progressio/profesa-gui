import { Trayecto } from "../../trayecto.models";
import { ModeloCompleto } from "../../modeloCompleto.modelo";
import { Usuario } from "../../usuario.model";
/**
 *La orden que coincide contra los datos que se generaron
 para el reporte de transformacion. 
 *
 * @export
 * @class OrdenReporteTransformacion
 */
export class OrdenReporteTransformacion {
    /**
     *La cantidad de departamentos antes de llegar al
     paso.
     *
     * @type {{
     *         [paso: number]: number;
     *     }}
     * @memberof OrdenReporteTransformacion
     */
    public get departamentosAntesDePaso(): {
        [paso: number]: number;
    } {
        return this._departamentosAntesDePaso;
    }
    public set departamentosAntesDePaso(value: {
        [paso: number]: number;
    }) {
        this._departamentosAntesDePaso = value;
    }
    /**
     *Los pasos que esta orden tiene pendientes por transformacion.
     *
     * @type {3}
     * @memberof OrdenReporteTransformacion
     */
    public get pasosPendientes(): number {
        return this._pasosPendientes;
    }
    public set pasosPendientes(value: number) {
        this._pasosPendientes = value;
    }
    /**
     *Los pasos que ya se finalizaron.
     *
     * @type {number}
     * @memberof OrdenReporteTransformacion
     */
    public get pasosRealizados(): number {
        return this._pasosRealizados;
    }
    public set pasosRealizados(value: number) {
        this._pasosRealizados = value;
    }
    /**
     *La ubicacion en tiempo real de esta orden.
     *
     * @type {Trayecto}
     * @memberof OrdenReporteTransformacion
     */
    public get ubicacionActual(): Trayecto {
        return this._ubicacionActual;
    }
    public set ubicacionActual(value: Trayecto) {
        this._ubicacionActual = value;
    }
    /**
     *El departamento al que se dirige esta orden despues
     de terminar en su ubicacion actual.
     *
     * @type {Trayecto}
     * @memberof OrdenReporteTransformacion
     */
    public get siguienteDepartamento(): Trayecto {
        return this._siguienteDepartamento;
    }
    public set siguienteDepartamento(value: Trayecto) {
        this._siguienteDepartamento = value;
    }
    /**
     *True si la orden se surtio desde almacen.
     *
     * @type {boolean}
     * @memberof OrdenReporteTransformacion
     */
    public get desdeAlmacen(): boolean {
        return this._desdeAlmacen;
    }
    public set desdeAlmacen(value: boolean) {
        this._desdeAlmacen = value;
    }
    /**
     *Observaciones que agregaron en el folio.
     *
     * @type {string}
     * @memberof OrdenReporteTransformacion
     */
    public get observacionesFolio(): string {
        return this._observacionesFolio;
    }
    public set observacionesFolio(value: string) {
        this._observacionesFolio = value;
    }
    /**
     *El id del folio como referencia.
     *
     * @type {string}
     * @memberof OrdenReporteTransformacion
     */
    public get idFolio(): string {
        return this._idFolio;
    }
    public set idFolio(value: string) {
        this._idFolio = value;
    }
    /**
     *Fecha de creacion del folio.
     *
     * @type {Date}
     * @memberof OrdenReporteTransformacion
     */
    public get fechaFolio(): Date {
        return this._fechaFolio;
    }
    public set fechaFolio(value: Date) {
        this._fechaFolio = value;
    }
    /**
     *El vendedor propietario del folio.
     *
     * @type {Usuario}
     * @memberof OrdenReporteTransformacion
     */
    public get vendedor(): Usuario {
        return this._vendedor;
    }
    public set vendedor(value: Usuario) {
        this._vendedor = value;
    }
    /**
     *El numero consecutivo de la orden.
     *
     * @type {string}
     * @memberof OrdenReporteTransformacion
     */
    public get orden(): string {
        return this._orden;
    }
    public set orden(value: string) {
        this._orden = value;
    }
    /**
     *El numero consecutivo del pedido al cual pertenece la orde.
     *
     * @type {string}
     * @memberof OrdenReporteTransformacion
     */
    public get pedido(): string {
        return this._pedido;
    }
    public set pedido(value: string) {
        this._pedido = value;
    }
    /**
     *El modelo completo de esta orden.
     *
     * @type {ModeloCompleto}
     * @memberof OrdenReporteTransformacion
     */
    public get modeloCompleto(): ModeloCompleto {
        return this._modeloCompleto;
    }
    public set modeloCompleto(value: ModeloCompleto) {
        this._modeloCompleto = value;
    }
    /**
     *El trayecto que ya recorrido esta orden.
     *
     * @type {Trayecto[]}
     * @memberof OrdenReporteTransformacion
     */
    public get trayectoRecorrido(): Trayecto[] {
        return this._trayectoRecorrido;
    }
    public set trayectoRecorrido(value: Trayecto[]) {
        this._trayectoRecorrido = value;
    }
    /**
     *El trayecto que se definio en primera instancia al crear el folio.
     *
     * @type {Trayecto[]}
     * @memberof OrdenReporteTransformacion
     */
    public get trayectoNormal(): Trayecto[] {
        return this._trayectoNormal;
    }
    public set trayectoNormal(value: Trayecto[]) {
        this._trayectoNormal = value;
    }
    /**
     *El porcentaje de produccion de la orden en base a los trayectos
     que tiene pendientes por cubrir.
     *
     * @type {number}
     * @memberof OrdenReporteTransformacion
     */
    public get porcentajeAvance(): number {
        return this._porcentajeAvance;
    }
    public set porcentajeAvance(value: number) {
        this._porcentajeAvance = value;
    }
    /**
     *El valor unitario de la orden. Puede ser .5 para media orden o 1.
     *
     * @type {number}
     * @memberof OrdenReporteTransformacion
     */
    public get unidad(): number {
        return this._unidad;
    }
    public set unidad(value: number) {
        this._unidad = value;
    }
    /**
     *Las observaciones propias de la orde.
     *
     * @type {string}
     * @memberof OrdenReporteTransformacion
     */
    public get observaciones(): string {
        return this._observaciones;
    }
    public set observaciones(value: string) {
        this._observaciones = value;
    }
    /**
     *True si ya esta terminada su produccion.
     *
     * @type {boolean}
     * @memberof OrdenReporteTransformacion
     */
    public get terminada(): boolean {
        return this._terminada;
    }
    public set terminada(value: boolean) {
        this._terminada = value;
    }
    /**
     *La cantidad de piezas que segun el estandar deberia generar esta orde.
     *
     * @type {number}
     * @memberof OrdenReporteTransformacion
     */
    public get piezasTeoricas(): number {
        return this._piezasTeoricas;
    }
    public set piezasTeoricas(value: number) {
        this._piezasTeoricas = value;
    }
    /**
     *El numero de orden con respecto a la cantidad que se genero. Ejemp #3 de 10
     *
     * @type {string}
     * @memberof OrdenReporteTransformacion
     */
    public get numeroDeOrden(): string {
        return this._numeroDeOrden;
    }
    public set numeroDeOrden(value: string) {
        this._numeroDeOrden = value;
    }
    /**
     *El id del registro de la orden dentro del arreglo del pedido.
     *
     * @type {string}
     * @memberof OrdenReporteTransformacion
     */
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    /**
     *La prioridad de produccion.
     *
     * @type {string}
     * @memberof OrdenReporteTransformacion
     */
    public get nivelDeUrgencia(): string {
        return this._nivelDeUrgencia;
    }
    public set nivelDeUrgencia(value: string) {
        this._nivelDeUrgencia = value;
    }
    constructor(private _nivelDeUrgencia: string, private _id: string, private _numeroDeOrden: string, private _unidad: number, private _piezasTeoricas: number, private _observaciones: string, private _terminada: boolean, private _porcentajeAvance: number, private _trayectoNormal: Trayecto[], private _trayectoRecorrido: Trayecto[], private _modeloCompleto: ModeloCompleto, private _pedido: string, private _orden: string, private _vendedor: Usuario, private _fechaFolio: Date, private _idFolio: string, private _observacionesFolio: string, private _desdeAlmacen: boolean, private _siguienteDepartamento: Trayecto, private _ubicacionActual: Trayecto, private _pasosRealizados: number, private _pasosPendientes: number, private _departamentosAntesDePaso: {
        [paso: number]: number;
    }) { }
}
