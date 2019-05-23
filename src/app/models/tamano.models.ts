import { OperacionesEnGUI } from './OperacionesEnGUI';

export class Tamano  extends OperacionesEnGUI {
    constructor(
        public _id?: string,
        public tamano?: string,
        public estandar?: number,
    ) {
        super();
    }

    deserialize(input: this): this {
        Object.assign(this, input)

        return this
    }

    static fromJSON(data: any) {
        return Object.assign(new this, data);
    }
    static fromJSON_Array( data: any []) {
        return data.map( x => x = Tamano.fromJSON(x));
    }

    
}
