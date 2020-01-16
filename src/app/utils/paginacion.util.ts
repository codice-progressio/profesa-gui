/**
 *Crea una paginacion. El orden es 1 para ascendete y -1 para descendente.
 *
 * @export
 * @class Paginacion
 */
export class Paginacion {
    /**
     *Creates an instance of Paginacion.
     * @param {number} [limite=5]
     * @param {number} [desde=0]
     * @param {(1 | -1)} [orden=1]
     * @param {string} campoDeOrdenamiento
     * @memberof Paginacion
     */
    constructor(
        public limite: number = 5,
        public desde: number = 0,
        public orden: 1 | -1 = 1,
        public campoDeOrdenamiento: string
    ){}



}