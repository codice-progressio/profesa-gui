import { Proceso } from './proceso.model';
export class Procesos {
   
    constructor(
        public _id?: any, 
        public proceso?: Proceso, 
        public orden?: number,
        // El padre de este proceso. Nos sirve para ordenar. 
        public procesoPadre: Proceso = new Proceso(),
       
       
       
        // Solo para GUI
        public esDeFamilia: boolean = true,
        // Para ordenador visual. 
        public dragEnable: boolean = true
        
        ) {
    }
    static fromJSON(data: any) {
        data.proceso = Proceso.fromJSON(data.proceso);
        return Object.assign(new this, data);
    }
    static fromJSON_Array(data: any[]) {
        return data.map(x => x = Procesos.fromJSON(x));
    }
}
