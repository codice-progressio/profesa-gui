import { Laser } from './laser.models';
import { ModeloCompletoAutorizacion } from './modeloCompletoAutorizacion.model';

export class Cliente {
    constructor(
        public nombre?: string,
        public sae?: string,
        public _id?: string,
        public laserados?: Laser [],
        public modelosCompletosAutorizados: ModeloCompletoAutorizacion [] =[]

    ) {}
}
