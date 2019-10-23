import { FiltrosDeConsultas } from "./FiltrosDeConsultas";

export class CursoFiltros <T> extends FiltrosDeConsultas<T> {

    constructor(
        public servicio: T
    ){
        super()
    }
}
