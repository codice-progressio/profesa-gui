import { Departamento } from './departamento.models';
export class Trayecto {
    constructor(
    public departamento?:  Departamento,
    // public siguiente?: Departamento, 
    // public anterior?: Departamento,
    public entrada?: Date,
    public salida?: Date,

    ) {}

}
