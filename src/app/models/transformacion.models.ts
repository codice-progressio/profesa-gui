import { Maquina } from './maquina.model';

export class Transformacion {
    constructor(
        public cantidadDeBoton?: number,
        public espesorBoton?: number,
        public bl?: number,
        public maquinaActual?: Maquina,
        public createdAt?: Date,
        public updatedAt?: Date,
    ) {}

}
