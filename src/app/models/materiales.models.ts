import { Usuario } from './usuario.model';
import { Maquina } from './maquina.model';

export class Materiales {
    constructor(
        public createdAt?: Date,
        public updatedAt?: Date,
        
        public cargo?: Usuario,
        public guardar?: boolean,
        public trabajando : boolean = false,
        
        public maquinaActual?: Maquina,

    ) {}

}