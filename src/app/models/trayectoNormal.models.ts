import { Departamento } from './departamento.models';

export class TrayectoNormal {
    constructor(
        public orden?: number,
        public departamento?: Departamento,
    ) {}
}
