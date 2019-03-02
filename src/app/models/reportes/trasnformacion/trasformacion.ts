import { Paso } from "./Paso";

/**
 *Esta clase alamacena la estructura para el reporte de trasformacion 
 que se genera desde la API.
 *
 * @export
 * @class ReporteTransformacion
 */
export class ReporteTransformacion {
    
    public get objetoContenedorDePasos(): {
        [paso: number]: Paso;
    } {
        return this._objetoContenedorDePasos;
    }
    /**
     *Contiene los pasos que actualmente existen. Este valor
     es dinamico y depende las ordenes que existan y cuantos
     pasos tengan. 
     *
     * @memberof ReporteTransformacion
     */
    public set objetoContenedorDePasos(value: {
        [paso: number]: Paso;
    }) {
        this._objetoContenedorDePasos = value;
    }
    constructor(
        private _objetoContenedorDePasos?: {
            [paso: number]: Paso;
        }
    ) {
        
    }
}





