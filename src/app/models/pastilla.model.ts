import { Usuario } from './usuario.model';

export class Pastilla {
    constructor(
        public createdAt?: Date,
        public updatedAt?: Date,
        public conto?: Usuario,
        public cantidades: CantidadesPastilla [] = [new CantidadesPastilla()]

    ) {
        
    }
}

export class CantidadesPastilla {
    constructor(
        public peso10Botones?: number, 
        public pesoTotalBoton?: number, 
        public espesorPastilla?: number, 
        // cantidadPastilla?: number, 
    ) {
        
    }
}
