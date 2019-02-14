import { Usuario } from './usuario.model';

export class Seleccion {
    constructor(

    public guardar : boolean = true,
    public trabajando : boolean = false,
    
    public seleccionadoPor?: Usuario,
    public quebrados?: number ,
    public reves?: number ,
    public despostillado?: number ,
    public sinLaser?: number ,
    public sinHoyos?: number ,
    public efectoMalo?: number ,
    public otros?: number ,
    public descripcionDeOtro?: number ,
    
    public createdAt?: Date,
    public updatedAt?: Date,

    ) {}

}
