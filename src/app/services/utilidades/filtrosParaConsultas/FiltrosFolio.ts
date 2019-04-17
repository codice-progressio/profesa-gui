import { FiltrosDeConsultas } from "./FiltrosDeConsultas";

/**
 *Esta clase se encarga de gestionar los filtros validos para los folios. Todas las propiedades que se crean
 en el constructor se toman de manera dinamica para para retornar un objeto con los campos no nulos. 
 Es necesario entonces, llamar a la funcion obtenerFiltros()

 Esta clase trabaja con la notacion de punto. 
 *
 * @export
 * @class FiltrosFolio <T>
 */
export class FiltrosFolio <T> extends FiltrosDeConsultas<T>  {
    
    
    public get fechaDeEntregaAProduccionHasta(): string {
        return this._fechaDeEntregaAProduccionHasta;
    }
    public setFechaDeEntregaAProduccionHasta(value: string):  FiltrosFolio <T> {
        this._fechaDeEntregaAProduccionHasta = value;
        return this
    }
    public get fechaDeEntregaAProduccionDesdeEl(): string {
        return this._fechaDeEntregaAProduccionDesdeEl;
    }
    public setFechaDeEntregaAProduccionDesdeEl(value: string):  FiltrosFolio <T> {
        this._fechaDeEntregaAProduccionDesdeEl = value;
        return this
    }
    public get entregarAProduccion(): string {
        return this._entregarAProduccion;
    }
    public setEntregarAProduccion(value: boolean):  FiltrosFolio <T> {
        this._entregarAProduccion =value? '1': value === null ? null: '0';
        return this
    }
   
   
    
    constructor(
        // OJO, ESTE PARAMENTRO SE OMITE EN LA BUSQUEDA. TIENES QUE SER CUIDADOSO. 
        public servicio: T,
        private _cliente: string = null,
        private _vendedor: string = null,
        private _modelo: string = null,
        private _tamano: string = null,
        private _color: string = null,
        private _terminado: string = null,
        private _folio: string = null,
        private _pedido: string = null,
        private _fechaCreacionDesdeEl: string = null,
        private _fechaCreacionHasta: string = null,
        private _fechaEntregaEstimadaDesdeEl: string = null,
        private _fechaEntregaEstimadaHasta: string = null,
        private _fechaFinalizacionFolioDesdeEl: string = null,
        private _fechaFinalizacionFolioHasta: string = null ,
        private _foliosTerminados: string = null,
        private _ordenesGeneradas: string = null,
        private _entregarAProduccion: string = null,
        private _fechaDeEntregaAProduccionDesdeEl: string = null ,
        private _fechaDeEntregaAProduccionHasta: string = null ,

        ) {
            super()
            
        }
    
    public get ordenesGeneradas(): string {
        return this._ordenesGeneradas;
    }
    public setOrdenesGeneradas(value: boolean): FiltrosFolio <T>  {
        this._ordenesGeneradas = value? '1': value === null ? null: '0';
        return this
    }

    public get foliosTerminados(): string {
        return this._foliosTerminados;
    }
    public setFoliosTerminados(value: boolean): FiltrosFolio <T> {
        this._foliosTerminados = value? '1': value === null ? null: '0';
        return this
    }
    
    public get fechaFinalizacionFolioHasta(): string {
        return this._fechaFinalizacionFolioHasta;
    }
    public  setFechaFinalizacionFolioHasta(value: string):FiltrosFolio <T> {
        this._fechaFinalizacionFolioHasta = value;
        return this
    }
    public get fechaFinalizacionFolioDesdeEl(): string {
        return this._fechaFinalizacionFolioDesdeEl;
    }
    public  setFechaFinalizacionFolioDesdeEl(value: string):FiltrosFolio <T> {
        this._fechaFinalizacionFolioDesdeEl = value;
        return this
    }
    public get fechaEntregaEstimadaHasta(): string {
        return this._fechaEntregaEstimadaHasta;
    }
    public  setFechaEntregaEstimadaHasta(value: string):FiltrosFolio <T> {
        this._fechaEntregaEstimadaHasta = value;
        return this
    }
    public get fechaEntregaEstimadaDesdeEl(): string {
        return this._fechaEntregaEstimadaDesdeEl;
    }
    public  setFechaEntregaEstimadaDesdeEl(value: string):FiltrosFolio <T> {
        this._fechaEntregaEstimadaDesdeEl = value;
        return this
    }
    public get fechaCreacionHasta(): string {
        return this._fechaCreacionHasta;
    }
    public  setFechaCreacionHasta(value: string):FiltrosFolio <T> {
        this._fechaCreacionHasta = value;
        return this
    }
    public get fechaCreacionDesdeEl(): string {
        return this._fechaCreacionDesdeEl;
    }
    public  setFechaCreacionDesdeEl(value: string):FiltrosFolio <T> {
        this._fechaCreacionDesdeEl = value;
        return this
    }
    public get pedido(): string {
        return this._pedido;
    }
    public  setPedido(value: string):FiltrosFolio <T> {
        this._pedido = value;
        return this
    }
    public get folio(): string {
        return this._folio;
    }
    public  setFolio(value: string):FiltrosFolio <T> {
        this._folio = value;
        return this
    }
    public get terminado(): string {
        return this._terminado;
    }
    public  setTerminado(value: string):FiltrosFolio <T> {
        this._terminado = value;
        return this
    }
    public get color(): string {
        return this._color;
    }
    public  setColor(value: string):FiltrosFolio <T> {
        this._color = value;
        return this
    }
    public get tamano(): string {
        return this._tamano;
    }
    public  setTamano(value: string):FiltrosFolio <T> {
        this._tamano = value;
        return this
    }
    public get modelo(): string {
        return this._modelo;
    }
    public  setModelo(value: string):FiltrosFolio <T> {
        this._modelo = value;
        return this
    }
    public get vendedor(): string {
        return this._vendedor;
    }
    public  setVendedor(value: string):FiltrosFolio <T> {
        this._vendedor = value;
        return this
    }
    public get cliente(): string {
        return this._cliente;
    }
    public  setCliente(value: string):FiltrosFolio <T> {
        this._cliente = value;
        return this
    }

      
    
}