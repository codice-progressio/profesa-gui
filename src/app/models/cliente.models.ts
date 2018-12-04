import { Laser } from './laser.models';

export class Cliente {
    constructor(
        public nombre?: string,
        public sae?: string,
        public _id?: string,
        public laserados?: Laser [],
    ) {}
}
