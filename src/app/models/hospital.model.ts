import { Usuario } from './usuario.model';

export class Hospital {
    constructor(
        public nombre: string,
        // Estos son opcionales
        public usuario?: Usuario,
        public img?: string,
        public _id?: string
    ) {}
}
