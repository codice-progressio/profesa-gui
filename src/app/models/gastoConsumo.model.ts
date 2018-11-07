import { Gasto } from './gasto.model';

export class GastoConsumo {
    constructor(
        public gasto?: Gasto, 
        public consumo?: number,
        public editando: boolean = false
    ) {
    }

    static fromJSON(data: any) {
        data.gasto = Gasto.fromJSON( data.gasto );
        return Object.assign(new this, data);
    }
  
    static fromJSON_Array( data: any []) {
        return data.map( x => x = GastoConsumo.fromJSON(x));
    }

    
}
