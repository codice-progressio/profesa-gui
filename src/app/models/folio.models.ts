import { Cliente } from './cliente.models';
import { Usuario } from './usuario.model';
import { FolioLinea } from './folioLinea.models';

export class Folio {
    constructor(
        public _id?: string,
        public numeroDeFolio?: string,
        public cliente?: Cliente,
        public fechaFolio?: Date,
        public fechaEntrega?: Date,
        public vendedor?: Usuario,
        public observaciones?: string,
        public folioLineas?: FolioLinea [],
        public createdAt?: Date,
        public updatedAt?: Date,
        public eliminar: boolean = false,
        public nivelDeUrgencia?: string,
        public porcentajeAvance?: number,

        // Este es propio del front para
        // interactuar con botones. 
        public mostrandoInfo: boolean = false

        

        

    ) {}

    
}
