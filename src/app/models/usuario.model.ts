import { Deserializable } from './deserealizable.model'
import { Empleado } from './recursosHumanos/empleados/empleado.model'
export class Usuario {
  constructor(
    public _id?: string,
    public nombre?: string,
    public email?: string,
    public password?: string,
    public img: string = '',
    public permissions: string[] = [],
    public empleado?: Empleado
  ) {}
}
