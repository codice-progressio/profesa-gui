import { Trayecto } from "../../trayecto.models";
import { ModeloCompleto } from "../../modeloCompleto.modelo";
import { Usuario } from "../../usuario.model";
import { Cliente } from "../../cliente.models";
import { Laser } from "../../laser.models";
/**
 *La orden con los valores exactos para que coincida
 con el reporte de laser.
 *
 * @class OrdenReporteLaser
 */
export class OrdenReporteLaser {
    constructor(

        public cliente: Cliente,
        public laserCliente: Laser,
        public nivelDeUrgencia?: string, 
        public _id?: string, 
        public numeroDeOrden?: number, 
        public unidad?: number, 
        public piezasTeoricas?: number, 
        public observacionesFolio?: string,
        public observacionesPedido?: string,
        public observaciones?: string, 
        public terminada?: boolean, 
        public porcentajeAvance?: number, 
        public trayectoNormal?: Trayecto[], 
        public trayectoRecorrido?: Trayecto[], 
        public modeloCompleto?: ModeloCompleto, 
        public pedido?: string, 
        public orden?: string, 
        public vendedor?: Usuario, 
        public fechaFolio?: Date, 
        public idFolio?: string, 
        public desdeAlmacen?: boolean, 
        public siguienteDepartamento?: Trayecto, 
        public ubicacionActual?: Trayecto, 
        public pasosParaLlegarALaser?: number) {
    }
}
