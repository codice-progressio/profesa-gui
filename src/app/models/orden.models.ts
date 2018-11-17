import { Materiales } from './materiales.models';
import { Transformacion } from './transformacion.models';
import { Pulido } from './pulido.models';
import { Seleccion } from './seleccion.models';
import { Trayecto } from './trayecto.models';
 
export class Orden {
    constructor(
        
        public _id?: string,
        // El número de orden que es la suma del folio, el órden de pedido y número de órden. 
        public orden?: string,
        public numeroDeOrden?: number,
        public unidad?: number,
        public piezasTeoricas?: number,
        
        public piezasFinales?: number,
        public observaciones?: string,
        // True cuando la órden esta terminada.
        public terminada: boolean = false,
        public porcentajeAvance: number = 0,

        public trayectoNormal?: Trayecto[],
        public trayectoRecorrido?: Trayecto [],
        public ubicacionActual?: Trayecto,
        public siguienteDepartamento?: Trayecto,
        public nivelDeUrgencia: string = 'PRODUCCIÓN',
        public fechaFolio?: Date,
        // Esta es solo para facilitarnos la vida. 
        public editando: boolean = false,
      

    ) {}

    static fromJSON(data: any) {
        return Object.assign(new this, data);
    }
  
    static fromJSON_Array( data: any []) {
        return data.map( x => x = Orden.fromJSON(x));
    }


}
