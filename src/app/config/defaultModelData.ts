/**
 *Almacena los id por de faults separados semanticamente. 
 *
 * @export
 * @class DefaultModelData
 */
export class DefaultModelData {
    /**
     *
     * @param {string} [SUPER_ADMIN] 
     * @param {DepartamentosDefaults} [DEPARTAMENTOS]
     * @param {ProcesosDefaults} [PROCESOS]
     * @memberof DefaultModelData
     */
    constructor(
        public SUPER_ADMIN?: string,
        public DEPARTAMENTOS?: DepartamentosDefaults,
        public PROCESOS?: ProcesosDefaults,
    ) {
        
    }
}


class DepartamentosDefaults {
    constructor(
        public CONTROL_DE_PRODUCCION: string,
        public MATERIALES: string,
        public PASTILLA: string,
        public TRANSFORMACION: string,
        public PULIDO: string,
        public SELECCION: string,
        public EMPAQUE: string,
        public PRODUCTO_TERMINADO: string,
        public METALIZADO: string,
        public BARNIZADO: string,
        public BURATO: string,
        public LASER: string,
        public ALMACEN_DE_BOTON: string
    ) {
        
    }
}

class ProcesosDefaults {
    constructor(
        public CONTROL_DE_PRODUCCION?: string,
        public LASER?: string,
        public ALMACEN_DE_BOTON?: string
    ) {
        
    }
}

