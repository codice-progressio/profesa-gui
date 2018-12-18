import { Laser } from './laser.models';
import { ModeloCompleto } from './modeloCompleto.modelo';
import { Usuario } from './usuario.model';

export class ModeloCompletoAutorizacion {
    constructor(
        public _id?: string,
        public modeloCompleto?: ModeloCompleto,
        public autorizado?: boolean,
        public autorizacionSolicitada?: boolean,
        public usuarioQueSolicitaAutorizacion?: Usuario
           ) {}
}
