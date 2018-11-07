export class Departamento {
    constructor(
        public _id?: string,
        public nombre?: string
    ) {
        
    }

    static fromJSON(data: any) {
        return Object.assign(new this, data);
    }
  
    static fromJSON_Array( data: any []) {
        return data.map( x => x = Departamento.fromJSON(x));
    }
}
