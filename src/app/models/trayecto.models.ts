import { Departamento } from './departamento.models';
export class Trayecto {
    constructor(
    public orden?: number,
    public departamento?:  Departamento,
    // public siguiente?: Departamento, 
    // public anterior?: Departamento,
    public entrada?: Date,
    public salida?: Date,
    public recivida: boolean = false,

    ) {}

}
