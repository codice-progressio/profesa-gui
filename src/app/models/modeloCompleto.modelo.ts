import { Modelo } from './modelo.models';
import { Tamano } from './tamano.models';
import { Color } from './color.models';
import { Terminado } from './terminado.models';
import { Laser } from './laser.models';
import { VersionModelo } from './versionModelo.models';
import { FamiliaDeProcesos, Procesos } from './familiaDeProcesos.model';
import { BasicosGUI } from './basicosGUI.model';

export class ModeloCompleto implements BasicosGUI {
    convertido: boolean;
    editado: boolean;
     
    
    constructor(
        public _id?: string,
        public modelo?: Modelo,
        public tamano?: Tamano,
        public color?: Color,
        public terminado?: Terminado,
        public laserAlmacen?: Laser,
        public versionModelo?: VersionModelo,
        public medias: boolean = false,
        public nombreCompleto?: string,
        public familiaDeProcesos?: FamiliaDeProcesos,
        public procesosEspeciales: Procesos[] = [],
        public espesor?: number,
        public porcentajeDeMerma?: number,
        
        // Este es solo para modificaciones de las órdenes. 
        public mediasGeneradas: boolean = false,

        // Para ordenamiento
    ) {
    }

    // Convierte un json a una clase de este tipo 
    //  desde un arreglo. 
    static fromJSON_Array( data: any []) {
        return data.map( x => x = ModeloCompleto.fromJSON(x));
    }

    // Convierte un JSON a esta claser. 
    static fromJSON(data: any) {
        // Convertimos todos los objetos en clases.
        data.modelo = Modelo.fromJSON(data.modelo);
        data.tamano = Tamano.fromJSON(data.tamano);
        data.color = Color.fromJSON(data.color);
        data.terminado = Terminado.fromJSON(data.terminado);
        data.laserAlmacen = Laser.fromJSON(data.laser);
        data.versionModelo = VersionModelo.fromJSON(data.versionModelo);
        data.familiaDeProcesos = FamiliaDeProcesos.fromJSON(data.familiaDeProcesos);
        data.procesosEspeciales = Procesos.fromJSON_Array(data.procesosEspeciales);
        return Object.assign(new this, data);
    }

    static nombreCom(x) {
        let nombreCompleto = '';
        nombreCompleto += x.modelo ? x.modelo.modelo : '';
        nombreCompleto += x.tamano ? '-' + x.tamano.tamano : '';
        nombreCompleto += x.color ? '-' + x.color.color : '';
        nombreCompleto += x.terminado ? '-' + x.terminado.terminado : '';
        nombreCompleto += x.laserAlmacen ? '-' + x.laserAlmacen.laser : '';
        nombreCompleto += x.versionModelo ? '-' + x.versionModelo.versionModelo : '';
        return nombreCompleto;
    }

  


}