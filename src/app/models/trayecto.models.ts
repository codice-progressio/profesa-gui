import { Departamento } from './departamento.models';
import { Materiales } from './materiales.models';
import { Transformacion } from './transformacion.models';
import { Pulido } from './pulido.models';
import { Seleccion } from './seleccion.models';
export class Trayecto {
    constructor(

    public orden?: number,
    public departamento?:  Departamento,

    public materiales: Materiales = new Materiales() ,
    public transformacion: Transformacion = new Transformacion() ,
    public pulido: Pulido = new Pulido() ,
    public seleccion: Seleccion = new Seleccion() ,

    // public siguiente?: Departamento, 
    // public anterior?: Departamento,
    public entrada?: Date,
    public salida?: Date,
    public recivida: boolean = false,

    ) {}

}
