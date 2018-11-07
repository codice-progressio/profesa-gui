import { OperacionesEnGUI } from './OperacionesEnGUI';

export class VersionModelo extends OperacionesEnGUI {
    constructor(
        public _id?: string,
        public versionModelo?: string,
       
    ) {
        super();
    }

    static fromJSON(data: any) {
        return Object.assign(new this, data);
    }

    static fromJSON_Array( data: any []) {
        return data.map( x => x = VersionModelo.fromJSON(x));
    }

   
}
