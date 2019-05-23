import { OrdenReporteLaser } from "./OrdenReporteLaser";
import { Cliente } from "../../cliente.models";
import { ModeloCompleto } from "../../modeloCompleto.modelo";
import { Laser } from "../../laser.models";
import { NIVEL } from "src/app/config/nivelesDeUrgencia";

export class ReporteLaser {
    public get trabajando(): OrdenReporteLaser[] {
        return this._trabajando;
    }
    public set trabajando(value: OrdenReporteLaser[]) {
        this._trabajando = value;
    }
    public get porSurtir(): OrdenReporteLaser[] {
        return this._porSurtir;
    }
    public set porSurtir(value: OrdenReporteLaser[]) {
        this._porSurtir = value;
    }
    public get departamentosPendientes(): OrdenReporteLaser[] {
        return this._departamentosPendientes;
    }
    public set departamentosPendientes(value: OrdenReporteLaser[]) {
        this._departamentosPendientes = value;
    }
    public get disponibles(): OrdenReporteLaser[] {
        return this._disponibles;
    }
    public set disponibles(value: OrdenReporteLaser[]) {
        this._disponibles = value;
    }
    public get pedidos(): {
        [pedido: string]: PedidoReporteLaser;
    } {
        return this._pedidos;
    }
    public set pedidos(value: {
        [pedido: string]: PedidoReporteLaser;
    }) {
        this._pedidos = value;
    }
    
    // disponibles: OrdenReporteLaser [] = []
    // departamentosPendientes: OrdenReporteLaser [] = []
    // porSurtir: OrdenReporteLaser [] = []
    // trabajando: OrdenReporteLaser [] = []

    totalDePiezasDisponibles: number = 0
    totalDePiezasPorSurtir: number = 0
    totalDePiezasConDepartamentosPendientes: number = 0

    
    
    constructor(
        private _disponibles: OrdenReporteLaser[] = [],
        private _departamentosPendientes: OrdenReporteLaser[] = [],
        private _porSurtir: OrdenReporteLaser[] = [],
        private _trabajando: OrdenReporteLaser[] = [],
        private _pedidos: {
            [pedido: string]: PedidoReporteLaser;
        } = {}
    ) {
        
    }


    agruparPorPedido( ) {
         // Recorremos todas las ordenes disponibles. 
        if( this.disponibles ){
            this.disponibles.forEach( (orden)=>{
               this.clasificar( orden.pedido, orden, 'disponibles');
           })
        }
        if( this.departamentosPendientes ){
            this.departamentosPendientes.forEach( (orden)=>{
                this.clasificar( orden.pedido, orden, 'departamentosPendientes');
            })
        } 
        if( this.porSurtir ){
            this.porSurtir.forEach( (orden)=>{
                this.clasificar( orden.pedido, orden, 'porSurtir');
            })
        } 
        if( this.trabajando ){
            this.trabajando.forEach( (orden)=>{
                this.clasificar( orden.pedido, orden, 'trabajando');
            })
        } 

    }

    private clasificar( numPed: string, orden: OrdenReporteLaser, status: string ) {

         // Revisamos que el pedido exista. 
         if( !this.pedidos.hasOwnProperty( numPed ) ){
            this.pedidos[numPed] = new PedidoReporteLaser()
        }

        this.pedidos[numPed].cliente = orden.cliente;
        this.pedidos[numPed].fechaPedido = orden.fechaFolio;
        this.pedidos[numPed].modeloCompleto = orden.modeloCompleto;

        this.pedidos[numPed].esBaston = orden.modeloCompleto.esBaston;
        this.pedidos[numPed].laserCliente = orden.laserCliente;

        if( !this.pedidos[numPed].observaciones ) this.pedidos[numPed].observaciones = ''

        // Comprobamos que las observaciones del folio o pedido ya esten agregadas. 
        
        /**
         * Almacena las observaciones para juntarlas de manera junta. 
         */
        let arrayObservaciones: string [ ] = [
            orden.observacionesFolio,
            orden.observacionesPedido,
            orden.observaciones,
        ]
        
        
        for (let i = 0; i < arrayObservaciones.length; i++) {
            const observacion = arrayObservaciones[i];
            if( observacion ){
                if(!this.pedidos[numPed].observaciones.includes( observacion )) {
                   this.pedidos[numPed].observaciones += `${i ? '~' : '' } ${observacion}`
                }
            }
        }
        

       

        this.pedidos[numPed].totalDePiezasDelPedido += orden.piezasTeoricas



         // Calculamos el nivel de urgencia mayor. 
        if( this.pedidos[numPed].prioridad = '' ){
            this.pedidos[numPed].prioridad = orden.nivelDeUrgencia

        }else{
            let prioridadActual: number = NIVEL.indexOf( this.pedidos[numPed].prioridad )
            let prioridadOrden: number = NIVEL.indexOf( orden.nivelDeUrgencia )
        
            if( prioridadActual < prioridadOrden ) this.pedidos[numPed].prioridad = NIVEL[prioridadOrden];
        }


        

        switch (status) {
            case 'disponibles':
                this.totalDePiezasDisponibles += orden.piezasTeoricas;
                this.pedidos[numPed].disponibles.push( orden )
                break;
            case 'departamentosPendientes':
                this.totalDePiezasConDepartamentosPendientes += orden.piezasTeoricas
                this.pedidos[numPed].departamentosPendientes.push( orden )
                break;
            case 'porSurtir':
                this.totalDePiezasPorSurtir += orden.piezasTeoricas
                this.pedidos[numPed].porSurtir.push( orden )
                break;
            case 'trabajando':
                this.pedidos[numPed].trabajando.push( orden )
                break;
            
        }
    }


}


/**
 *Guarda la informacion de un pedido agrupado atravez del reporte de ordenes que se 
 genera en la api. 
 *
 * @class PedidoReporteLaser
 */
class PedidoReporteLaser {
    
    
    cliente: Cliente
    fechaPedido: Date
    modeloCompleto: ModeloCompleto
    esBaston: boolean
    laserCliente: Laser
    observaciones: string 
    prioridad: string
    totalDePiezasDelPedido: number= 0

    disponibles: OrdenReporteLaser [] = []
    departamentosPendientes: OrdenReporteLaser [] = []
    porSurtir: OrdenReporteLaser [] = []
    trabajando: OrdenReporteLaser [] = []


    constructor() {

    }
}


