import { ModeloCompleto } from './modeloCompleto.modelo';
import { Laser } from './laser.models';
import { Orden } from './orden.models';
import { Procesos } from './familiaDeProcesos.model';

export class FolioLinea {
    constructor(
        public _id?: string,
        public modeloCompleto?: ModeloCompleto,
        public cantidad?: number,
        public nivelDeUrgencia?: string,
        public laserCliente?: Laser,
        public almacen: boolean = false,
        public createdAt?: Date,
        public updatedAt?: Date,
        public porcentajeAvance?: number,
        public coloresTenidos: ColoresTenidos[] = [],
        public procesos?: Procesos[],
        public observaciones?: string,
        public terminado?: boolean,

        // Esta es solo para eliminar con animación.
        public eliminar: boolean = false,
        public ordenes: Orden[] = [] ,
        public ordenesGeneradas: boolean = false,

        // Para mostrar la info 
        public mostrandoInfo: boolean = false
    ) {}
}


export class ColoresTenidos {
    constructor(
        public color?: string,
        public cantidad?: number,
        // Para gui
        public valido: boolean = true,
    ) {
        
    }
}
