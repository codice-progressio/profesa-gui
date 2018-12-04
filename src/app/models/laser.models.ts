import { OperacionesEnGUI } from './OperacionesEnGUI';

export class Laser extends OperacionesEnGUI {
    constructor(
        public _id?: string,
        public laser?: string,
    ) {
        super();
    }

    static fromJSON(data: any) {
        return Object.assign(new this, data);
    }
    
    static fromJSON_Array( data: any []) {
        return data.map( x => x = Laser.fromJSON(x));
    }

 }
