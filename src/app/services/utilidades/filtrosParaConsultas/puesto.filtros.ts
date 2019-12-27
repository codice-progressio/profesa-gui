import { FiltrosDeConsultas } from "./FiltrosDeConsultas";

export class PuestoFiltros <T> extends FiltrosDeConsultas<T> {

    constructor(
        public servicio: T
    ){
        super()
    }
}
