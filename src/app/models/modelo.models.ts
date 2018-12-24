import { OperacionesEnGUI } from './OperacionesEnGUI';



export class Modelo extends OperacionesEnGUI {
    
    constructor(
       
        public _id?: string,
        public modelo?: string,

        
        ) {
        super();
    }

        static fromJSON(data: any) {
            return Object.assign(new this, data);
        }

        static fromJSON_Array( data: any []) {
            return data.map( x => x = Modelo.fromJSON(x));
        }
    
}

