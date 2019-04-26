import { Deserializable } from './deserealizable.model';

export class ProductoTerminado implements Deserializable{
    constructor(
        public terminada?: boolean,
    ) {}

    deserialize(input: this): this {
        Object.assign(this, input);
    
        return this;
      }

}
