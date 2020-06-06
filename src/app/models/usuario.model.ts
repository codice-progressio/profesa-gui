import { Deserializable } from './deserealizable.model'
export class Usuario {
  constructor(
    public _id?: string,
    public nombre?: string,
    public email?: string,
    public password?: string,
    public img: string = '',
    public permissions: string[] = []
  ) {}
}
