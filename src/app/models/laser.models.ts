import { OperacionesEnGUI } from './OperacionesEnGUI';
import { Deserializable } from './deserealizable.model';

/**
 *Guarda una marca laser. 
 *
 * @export
 * @class Laser
 * @extends {OperacionesEnGUI}
 */
export class Laser extends OperacionesEnGUI implements Deserializable {
    
    constructor(
        public _id?: string,
        public laser?: string,
        public imagenes: string[] = []
    ) {
        super();
    }

    static fromJSON(data: any) {
        return Object.assign(new this, data);
    }
    
    static fromJSON_Array( data: any []) {
        return data.map( x => x = Laser.fromJSON(x));
    }


    deserialize(input: this ): this {
        
        Object.assign( this, input)

        return this
    }

 }
