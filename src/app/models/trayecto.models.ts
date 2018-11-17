import { Departamento } from './departamento.models';
import { Materiales } from './materiales.models';
import { Transformacion } from './transformacion.models';
import { Pulido } from './pulido.models';
import { Seleccion } from './seleccion.models';
export class Trayecto {
    constructor(
    public orden?: number,
    public departamento?:  Departamento,

    public materiales?: Materiales [],
    public transformacion?: Transformacion [],
    public pulido?: Pulido [],
    public seleccion?: Seleccion [],

    // public siguiente?: Departamento, 
    // public anterior?: Departamento,
    public entrada?: Date,
    public salida?: Date,
    public recivida: boolean = false,

    ) {}

}
