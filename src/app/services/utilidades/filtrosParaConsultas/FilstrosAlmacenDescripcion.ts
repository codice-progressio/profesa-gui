import { FiltrosDeConsultas } from "./FiltrosDeConsultas";

export class FilstrosAlmacenDescripcion <T> extends FiltrosDeConsultas<T> {

    constructor(
        public serivicio: T
    ){
        super()
    }
}

