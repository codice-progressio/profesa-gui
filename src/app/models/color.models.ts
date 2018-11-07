import { OperacionesEnGUI } from './OperacionesEnGUI';

export class Color extends OperacionesEnGUI {
    constructor(
        public _id?: string,
        public color?: string,
    ) {
        super();
    }

    static fromJSON(data: any) {
        return Object.assign(new this, data);
    }

    static fromJSON_Array( data: any []) {
        return data.map( x => x = Color.fromJSON(x));
    }

    
}
