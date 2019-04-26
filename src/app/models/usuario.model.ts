import { Deserializable } from './deserealizable.model';
export class Usuario implements Deserializable {

    // Esta clase esta de ayuda para TypeScript

    constructor(
        public nombre?: string,
        public email?: string,
        public password?: string,
        // Despues de un parametro opcional todos los siguientes
        // tambien lo son.
        public img: string = '',
        public role: string[] = [],
        public google?: boolean,
        public _id?: string,
    ) {}

    deserialize(input: this): this {
        
        Object.assign( this, input)
        
        return this
    }

}
