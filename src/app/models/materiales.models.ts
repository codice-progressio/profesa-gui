import { Usuario } from './usuario.model';

export class Materiales {
    constructor(
        public cargo: Usuario,
        public createdAt?: Date,
        public updatedAt?: Date,
    ) {}

}
