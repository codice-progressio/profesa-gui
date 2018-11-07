import { Usuario } from './usuario.model';

export class Pastilla {
    constructor(
        public cantidadPastilla?: number,
        public espesorPastilla: number[] = [],
        public createdAt?: Date,
        public updatedAt?: Date,
        public conto?: Usuario

    ) {
        
    }
}
