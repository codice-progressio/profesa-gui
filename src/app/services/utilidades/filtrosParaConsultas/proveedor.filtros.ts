import { FiltrosDeConsultas } from "./FiltrosDeConsultas";

export class ProveedorFiltros <T> extends FiltrosDeConsultas<T> {

    constructor(
        public servicio: T
    ){
        super()
    }
}


