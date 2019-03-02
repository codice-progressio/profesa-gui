import { OrdenReporteTransformacion } from "./OrdenReporteTransformacion";
/**
 *Describe los tres estados posibles que puede tener una orden
 dentro de transformacion: pendientes, trabajando y disponibles.
 *
 * @class Paso
 */
export class Paso {
    /**
     * Las ordenes que ya estan disponibles para empezarse a trabajar.
     *
     * @type {OrdenReporteTransformacion}
     * @memberof Paso
     */
    public get disponibles(): OrdenReporteTransformacion {
        return this._disponibles;
    }
    public set disponibles(value: OrdenReporteTransformacion) {
        this._disponibles = value;
    }
    /**
     *Las ordenes que ya se estan trabajando.
     *
     * @type {OrdenReporteTransformacion}
     * @memberof Paso
     */
    public get trabajando(): OrdenReporteTransformacion {
        return this._trabajando;
    }
    public set trabajando(value: OrdenReporteTransformacion) {
        this._trabajando = value;
    }
    /**
     *Ordenes que todavia no estan en transformacion pero que en algun momento
     van a pasar por transformacion.
     *
     * @type {OrdenReporteTransformacion}
     * @memberof Paso
     */
    public get pendientes(): OrdenReporteTransformacion {
        return this._pendientes;
    }
    public set pendientes(value: OrdenReporteTransformacion) {
        this._pendientes = value;
    }
    constructor(private _pendientes?: OrdenReporteTransformacion, private _trabajando?: OrdenReporteTransformacion, private _disponibles?: OrdenReporteTransformacion) {
    }
}
