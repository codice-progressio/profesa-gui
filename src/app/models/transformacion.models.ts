import { Maquina } from './maquina.model';

export class Transformacion {
    constructor(
        public guardar: boolean = false,
        public cantidadDeBoton?: number,
        public espesorBoton?: number,
        public bl?: number,
        public maquinaActual?: Maquina,
        public createdAt?: Date,
        public updatedAt?: Date,
        public trabajando: boolean = false,
    ) {}

}
