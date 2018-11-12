import { Proceso } from './proceso.model';

export class FamiliaDeProcesos {
    constructor(
        public _id?: string,
        public procesos: Procesos[] = [],
        public nombre?: string,
        public createAt?: Date,
        public updateAt?: Date,

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

export class Procesos {
 
    constructor(
        public _id?: any,
        public proceso?: Proceso, 
        public orden?: number,

        // Solo para GUI
        public esDeFamilia: boolean = true,
        // Para ordenador visual. 
        public dragEnable: boolean = true,
    ) {
        
    }
    static fromJSON(data: any) {
        data.proceso = Proceso.fromJSON( data.proceso );
        return Object.assign(new this, data);
    }

    static fromJSON_Array( data: any []) {
        return data.map( x => x = Procesos.fromJSON(x));
    }

  
}
