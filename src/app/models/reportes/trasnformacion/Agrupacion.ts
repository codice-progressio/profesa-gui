import { AgrupacionTransformacionModelo } from './AgrupacionTransformacionModelo';
/**
 *Agrupa las ordenes en diferentes niveles. Este primier nivel las 
 organiza en pasos. 
 *
 * @export
 * @class Agrupacion
 */
export class AgrupacionTransformacion {
    /**
     *Define el numer de paso para la agrupacion. 
     *
     * @type {{
     *         [paso: number]: AgrupacionTransformacionModelo;
     *     }}
     * @memberof AgrupacionTransformacion
     */
    public get paso(): {
        [paso: number]: AgrupacionTransformacionModelo;
    } {
        return this._paso;
    }
    public set paso(value: {[paso: number]: AgrupacionTransformacionModelo;}) {
        this._paso = value;
    }



    constructor(
        
        private _paso?: {
            [paso: number]: AgrupacionTransformacionModelo;
        }
    ) {
        // this.paso[1].modeloCompleto['4107'].pedido['fulanito'][0]
    }

    
}



