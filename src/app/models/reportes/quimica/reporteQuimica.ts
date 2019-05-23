import { OrdenReporteQuimica } from "./OrdenReporteQuimica";
import { PedidoReporteQuimica } from "./PedidoReporteQuimica";
import { NIVEL } from "src/app/config/nivelesDeUrgencia";

/**
 *Esta clase almacena la estrucutura del reporte de quimica. 
 *
 * @export
 * @class ReporteQuimica
 */
export class ReporteQuimica {
    
    
    /**
     *Contiene las ordenes agrupadas por pedidos que estan separadas en 
     * disponibles y pendientes.
     * @type {{
     *         [pedido: string]: PedidoReporteQuimica;
     *     }}
     * @memberof ReporteQuimica
     */
    public get pedidos(): {
        [pedido: string]: PedidoReporteQuimica;
    } {
        return this._pedidos;
    }
    
    public set pedidos(value: {
        [pedido: string]: PedidoReporteQuimica;
    }) {
        this._pedidos = value;
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
        private _pedidos: {
            [pedido: string]: PedidoReporteQuimica;
        } = {}
    ) {
        
    }

    totalDeOrdenes( ): number{
        return this.disponibles.length + this.trabajando.length + this.pendientes.length;
    }


    /**
     *Agrupa las ordenes por pedido. 
     *
     * @memberof ReporteQuimica
     */
    agruparPorPedido( ){

        // Recorremos todas las ordenes disponibles. 
        this.disponibles.forEach( (orden)=>{
            this.clasificar( orden.pedido, orden, 'disponibles');
        })
        
        this.pendientes.forEach( (orden)=>{
            this.clasificar( orden.pedido, orden, 'pendientes');
        })
        
        this.trabajando.forEach( (orden)=>{
            this.clasificar( orden.pedido, orden, 'trabajando');
        })

    }


    private clasificar( numPed:string, orden: OrdenReporteQuimica, status: string ){

        // Revisamos que el pedido exista. 
        if( !this.pedidos.hasOwnProperty( numPed ) ){
            this.pedidos[numPed] = new PedidoReporteQuimica()
        }

        this.pedidos[numPed].cliente = orden.cliente;
        this.pedidos[numPed].fechaPedido = orden.fechaFolio;
        this.pedidos[numPed].modeloCompleto = orden.modeloCompleto;

        this.pedidos[numPed].esBaston = orden.modeloCompleto.esBaston;
        this.pedidos[numPed].laserCliente = orden.laserCliente;
        this.pedidos[numPed].observaciones = orden.observaciones
        
        // Calculamos el nivel de urgencia mayor. 
        if( this.pedidos[numPed].prioridad = '' ){
            this.pedidos[numPed].prioridad = orden.nivelDeUrgencia

        }else{
            let prioridadActual: number = NIVEL.indexOf( this.pedidos[numPed].prioridad )
            let prioridadOrden: number = NIVEL.indexOf( orden.nivelDeUrgencia )
        
            if( prioridadActual < prioridadOrden ) this.pedidos[numPed].prioridad = NIVEL[prioridadOrden];
        }

        switch (status) {
            case 'pendientes':
                this.pedidos[numPed].pendientes.push( orden )
                break;
            
            case 'trabajando':
                this.pedidos[numPed].trabajando.push( orden )
                break;
            
            case 'disponibles':
                this.pedidos[numPed].disponibles.push( orden )
                break;
        }

    };
     
}


