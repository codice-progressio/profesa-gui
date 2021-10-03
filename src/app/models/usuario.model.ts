import { Imagen } from './Imagen'
export class Usuario {
  constructor(
    public _id?: string,
    public nombre?: string,
    public email?: string,
    public password?: string,
    public img?: Imagen,
    public permissions: string[] = [],
    public inhabilitado?: boolean,
    public password_offline?: string
  ) {}
}
