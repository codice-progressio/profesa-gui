import { Cliente } from './cliente.models';
import { Usuario } from './usuario.model';
import { FolioLinea } from './folioLinea.models';

export class Folio {
    constructor(
        public _id?: string,
        public numeroDeFolio?: string,
        public cliente?: Cliente,
        public fechaFolio: Date = new Date(),
        public fechaEntrega: Date = new Date(),
        public vendedor?: Usuario,
        public observaciones?: string,
        public observacionesVendedor?: string,
        public folioLineas?: FolioLinea [],
        public createdAt?: Date,
        public updatedAt?: Date,
        public eliminar: boolean = false,
        public nivelDeUrgencia?: string,
        public porcentajeAvance?: number,
        public impreso?: boolean,
        public terminado?: boolean,
        public fechaTerminado?: Date,
        public cantidadProducida?: number,
        public ordenesGeneradas?: boolean,
        /**
         * Esta bandera se pone en true cuando las modificaciones al folio se terminador
         * y se pasa el control a control de produccion. 
         */
        public entregarAProduccion: boolean =false,

        public fechaDeEntregaAProduccion?: Date, 

        // Este es propio del front para
        // interactuar con botones. 
        public mostrandoInfo: boolean = false

        

        

    ) {}


    
}
