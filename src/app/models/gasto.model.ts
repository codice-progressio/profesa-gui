export class Gasto {
    constructor(
        public _id?: string,
        public nombre?: string,
        public costoPorHora?: number,
        public unidadPorHora?: string,
        public gastoDirecto?: boolean,
        public tiempos: any = {},
        // Solo para GUI
        public editandose: boolean = false,
        public ver: boolean = false
    ) {
    }

    
    static fromJSON(data: any) {
        return Object.assign(new this, data);
    }
  
    static fromJSON_Array( data: any []) {
        return data.map( x => x = Gasto.fromJSON(x));
    }

   

    

}
