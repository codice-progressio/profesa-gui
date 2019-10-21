import { FiltrosDeConsultas } from "./FiltrosDeConsultas";

export class AreaFiltros <T> extends FiltrosDeConsultas<T> {

    constructor(
        public servicio: T
    ){
        super()
    }
}
