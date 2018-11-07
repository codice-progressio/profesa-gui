import { Usuario } from './usuario.model';

export class Seleccion {
    constructor(

    public quebrados?: number ,
    public paraNegro?: number ,
    public seleccionadoPor?: Usuario,
    public createdAt?: Date,
    public updatedAt?: Date,

    ) {}

}
