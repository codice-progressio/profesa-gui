import { FiltrosDeConsultas } from './FiltrosDeConsultas'
/**
 *Esta clase getiona los filtros validos para los modelos completos. 
 Por el momento la tenemos vacia por que necesitamos que genere los
 filtros del paginador. 
 *
 * @export
 * @class FiltrosModelosCompletos
 * @extends {FiltrosDeConsultas<T>}
 * @template T
 */
export class FiltrosModelosCompletos <T> extends FiltrosDeConsultas<T> {
    constructor(
        public servicio: T,

    ) {
        super();
    }
}