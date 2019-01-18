import { Maquina } from "./maquina.model";

export class Laser {
    constructor(
        public createdAt?: Date,
        public updatedAt?: Date,

        public cantidadDeBoton?: number,
        public bl?: number,
        public maquinaActual?: Maquina,
        
        public guardar?: boolean,
        public trabajando : boolean = false
    ) {
        
    }
}