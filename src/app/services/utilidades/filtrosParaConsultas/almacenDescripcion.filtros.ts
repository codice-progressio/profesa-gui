import { FiltrosDeConsultas } from "./FiltrosDeConsultas";

export class AlmacenDescripcionFiltros <T> extends FiltrosDeConsultas<T> {

    constructor(
        public servicio: T
    ){
        super()
    }
}
