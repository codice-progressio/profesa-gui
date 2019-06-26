import { FiltrosDeConsultas } from "./FiltrosDeConsultas";

export class FiltrosArticulos <T> extends FiltrosDeConsultas<T> {

    constructor(
        public serivicio: T
    ){
        super()
    }
}


