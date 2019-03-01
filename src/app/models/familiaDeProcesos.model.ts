import { Proceso } from './proceso.model';
import { Procesos } from './procesos.model';

export class FamiliaDeProcesos {
    constructor(
        public _id?: string,
        public procesos: Procesos[] = [],
        public nombre?: string,
        public soloParaProductoTerminado: boolean =  false,
        public createAt?: Date,
        public updateAt?: Date,
        public observaciones?: string,


        // SOLO PARA MOSTRAR INFO.
        public ver: boolean = false,
        public editado: boolean = false
        
    ) {
        
    }

    static fromJSON(data: any) {
        data.procesos = Procesos.fromJSON_Array( data.procesos);
        return Object.assign(new this, data);
    }

    static fromJSON_Array( data: any []) {
        return data.map( x => x = FamiliaDeProcesos.fromJSON(x));
    }

    agregarProceso( orden: number, proceso: Proceso ) {
        this.procesos.push( new Procesos( orden, proceso));
    }
}


