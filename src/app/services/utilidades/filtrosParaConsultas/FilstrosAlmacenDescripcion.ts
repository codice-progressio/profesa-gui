import { FiltrosDeConsultas } from "./FiltrosDeConsultas";

export class FilstrosAlmacenDescripcion <T> extends FiltrosDeConsultas<T> {

    constructor(
        public servicio: T
    ){
        super()
    }
}

