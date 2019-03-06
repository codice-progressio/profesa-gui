import { Paso } from "./Paso";
import { OrdenReporteTransformacion } from "./OrdenReporteTransformacion";
import { NIVEL } from "src/app/config/nivelesDeUrgencia";
import { Laser } from "../../laser.models";
import { ModeloCompleto } from '../../modeloCompleto.modelo';

/**
 *Muestra el reporte de transformacion de manera simplificada. 
 *
 * @export
 * @class ReporteTransformacionSimplificado
 */
export class ReporteTransformacionSimplificado {
    /**
     *Los pedidos que estan trabajandose. 
     *
     * @type {ContenedorDePedidosReporteTransformacionSimplificado}
     * @memberof ReporteTransformacionSimplificado
     */
    public get contenedorDePedidosTrabajando(): ContenedorDePedidosReporteTransformacionSimplificado {
        return this._contenedorDePedidosTrabajando;
    }
    public set contenedorDePedidosTrabajando(value: ContenedorDePedidosReporteTransformacionSimplificado) {
        this._contenedorDePedidosTrabajando = value;
    }


    /**
     *Almacena la lista de pedidos. 
     *
     * @type {ContenedorDePedidosReporteTransformacionSimplificado}
     * @memberof ReporteTransformacionSimplificado
     */
    public get contenedorDePedidos(): ContenedorDePedidosReporteTransformacionSimplificado {
        return this._contenedorDePedidos;
    }
    public set contenedorDePedidos(value: ContenedorDePedidosReporteTransformacionSimplificado) {
        this._contenedorDePedidos = value;
    }

    /**
     * *Contiene los pasos que actualmente existen. Este valor
        es dinamico y depende las ordenes que existan y cuantos
        pasos tengan. 
     *
     * @type {{
     *         [paso: number]: Paso;
     *       }}
     * @memberof ReporteTransformacionSimplificado
     */
    public get objetoContenedorDePasos(): {
        [paso: number]: Paso;
      } {
        return this._objetoContenedorDePasos;
      }
    
      public set objetoContenedorDePasos(value: { [paso: number]: Paso }) {
        this._objetoContenedorDePasos = value;
      }



      /**
       *Creates an instance of ReporteTransformacionSimplificado.
       * @param {{
       *           [paso: number]: Paso;
       *         }} [_objetoContenedorDePasos]
       * @memberof ReporteTransformacionSimplificado
       */
      constructor(
        private _objetoContenedorDePasos?: {
          [paso: number]: Paso;
        },
        private _contenedorDePedidos: ContenedorDePedidosReporteTransformacionSimplificado =  new ContenedorDePedidosReporteTransformacionSimplificado(),
        private _contenedorDePedidosTrabajando: ContenedorDePedidosReporteTransformacionSimplificado = new ContenedorDePedidosReporteTransformacionSimplificado()
      ) {}


    /**
     *Agrupa las ordenes para mostrarlas de manera simple.
    *
    * @memberof ReporteTransformacionSimplificado
    */
    agrupar(){

        //Itineramos sobre el objeto contenedorDePasos.
        for (const keyPaso in this.objetoContenedorDePasos) {
            if (this.objetoContenedorDePasos.hasOwnProperty(keyPaso)) {
                /**
                 * El contendor de los pasos con pendientes, disponibles, y trabajando. 
                 */
                const paso: Paso = this.objetoContenedorDePasos[keyPaso]
                paso.disponibles.forEach((orden:OrdenReporteTransformacion) => {
                    
                    // Si no existe el pedido registrado creamos uno. 
                    if( !this.contenedorDePedidos.pedido.hasOwnProperty(orden.pedido) ){

                        this.contenedorDePedidos.pedido[ orden.pedido ] = new PedidoReporteTransformacionSimplificado()
                    }

                    this.operacionesDeAgrupacion( orden, this.contenedorDePedidos.pedido[ orden.pedido ], Number(keyPaso))



                });
            }
        }
    }


    operacionesDeAgrupacion( 
                orden: OrdenReporteTransformacion, 
                pedido: PedidoReporteTransformacionSimplificado,
                paso: number) {

        // Calculamos el nivel de prioridad del pedido. 
        if( pedido.prioridadMayor = '' ){
            pedido.prioridadMayor = orden.nivelDeUrgencia
        } 
        
        let prioridadActual: number = NIVEL.indexOf(pedido.prioridadMayor );            
        let prioridadOrden: number = NIVEL.indexOf( orden.nivelDeUrgencia )

        if( prioridadOrden > prioridadActual ) {
            pedido.prioridadMayor = orden.nivelDeUrgencia;
            pedido.cantidadDePrioridadMayor = 1;

        }else{
            if( prioridadOrden === prioridadActual) pedido.cantidadDePrioridadMayor ++;
        }

        pedido.fechaDePedido = orden.fechaFolio
        pedido.observaciones = 
            (orden.observacionesFolio ? orden.observacionesFolio:'') 
            + ' ' + 
            (orden.observacionesPedido ? orden.observacionesPedido:'')
        
        if( !pedido.ordenesDisponibles.hasOwnProperty(paso) ){
            pedido.ordenesDisponibles[paso] = 0;
        }

        pedido.ordenesDisponibles[paso]++;
        
        pedido.cliente = orden.cliente

        pedido.laserCliente = orden.laserCliente

        pedido.modeloCompleto = orden.modeloCompleto

        pedido.ordenes.push( orden )
    }



}

/**
 *
 * Genera un objeto que contiene una lista de pedidos. 
 * @class PedidoReporteTransformacionSimplificado
 */
class ContenedorDePedidosReporteTransformacionSimplificado {
    constructor(
        
        public pedido:{ [pedido: string ]: PedidoReporteTransformacionSimplificado; } = {}
        
    ) {
        
    }
}




/**
 *Contiene todos los datos del pedido agrupado para el reporte de transformacion simplificado. 
 *
 * @class PedidoReporteTransformacionSimplificado
 */
class PedidoReporteTransformacionSimplificado  {
    public get modeloCompleto(): ModeloCompleto {
        return this._modeloCompleto;
    }
    public set modeloCompleto(value: ModeloCompleto) {
        this._modeloCompleto = value;
    }
    
    public get laserCliente(): Laser {
        return this._laserCliente;
    }
    public set laserCliente(value: Laser) {
        this._laserCliente = value;
    }
    /**
     *La cantidad separada por pasos de ordenes disponibles. 
     *
     * @type {{
     *         [paso: number]: number;
     *     }}
     * @memberof PedidoReporteTransformacionSimplificado
     */
    public get ordenesDisponibles(): {
        [paso: number]: number;
    } {
        return this._ordenesDisponibles;
    }
    public set ordenesDisponibles(value: {
        [paso: number]: number;
    }) {
        this._ordenesDisponibles = value;
    }


    /**
     *Cantidad de ordenes con prioridad mayor. 
     *
     * @type {number}
     * @memberof PedidoReporteTransformacionSimplificado
     */
    public get cantidadDePrioridadMayor(): number {
        return this._cantidadDePrioridadMayor;
    }

    public set cantidadDePrioridadMayor(value: number) {
        this._cantidadDePrioridadMayor = value;
    }

    /**
     *La suma de las observaciones del folio y del pedido. 
     *
     * @type {string}
     * @memberof PedidoReporteTransformacionSimplificado
     */
    public get observaciones(): string {
        return this._observaciones;
    }

    public set observaciones(value: string) {
        this._observaciones = value;
    }


    /**
     *El nombre del cliente. 
     *
     * @type {string}
     * @memberof PedidoReporteTransformacionSimplificado
     */
    public get cliente(): string {
        return this._cliente;
    }
    public set cliente(value: string) {
        this._cliente = value;
    }


    /**
     * Las ordenes de este pedido. 
     *
     * @type {OrdenReporteTransformacion[]}
     * @memberof PedidoReporteTransformacionSimplificado
     */
    public get ordenes(): OrdenReporteTransformacion[] {
        return this._ordenes;
    }
    public set ordenes(value: OrdenReporteTransformacion[]) {
        this._ordenes = value;
    }



    /**
     * La fecha del pedido. 
     *
     * @type {Date}
     * @memberof PedidoReporteTransformacionSimplificado
     */
    public get fechaDePedido(): Date {
        return this._fechaDePedido;
    }
    public set fechaDePedido(value: Date) {
        this._fechaDePedido = value;
    }


    /**
     * El nivel de urdenge mas alto. 
     *
     * @type {string}
     * @memberof PedidoReporteTransformacionSimplificado
     */
    public get prioridadMayor(): string {
        return this._prioridadMayor;
    }
    public set prioridadMayor(value: string) {
        this._prioridadMayor = value;
    }


    constructor(

        private _prioridadMayor?: string = '', 
        private _fechaDePedido?: Date,
        private _ordenes: OrdenReporteTransformacion[] = [],
        private _cliente?: string,
        private _observaciones?: string, 
        private _cantidadDePrioridadMayor: number = 0,
        private _ordenesDisponibles: {
            [paso: number]: number;
        } = {},
        private _laserCliente?: Laser,
        private _modeloCompleto?: ModeloCompleto
        
    ) {
        
    }
}
