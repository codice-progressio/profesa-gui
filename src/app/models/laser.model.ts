import { Maquina } from "./maquina.model";

/**
 *Guarda los datos del departamento de laser. 
 *
 * @export
 * @class Laser
 */
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