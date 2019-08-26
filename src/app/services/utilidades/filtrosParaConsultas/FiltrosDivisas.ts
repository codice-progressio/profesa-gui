import { FiltrosDeConsultas } from "./FiltrosDeConsultas";

export class FiltrosDivisas <T> extends FiltrosDeConsultas<T> {

    constructor(
        public servicio: T
    ){
        super()
    }
}


