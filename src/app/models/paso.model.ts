
export class Paso {
    constructor(
        public orden?: number,
        public descripcion?: string,
        // Solo para ver. 
        public ver: boolean = false,
        public editando: boolean = false
    ) {
        
    }

    static fromJSON(data: any) {
        return Object.assign(new this, data);
    }
  
    static fromJSON_Array( data: any []) {
        return data.map( x => x = Paso.fromJSON(x));
    }
}
