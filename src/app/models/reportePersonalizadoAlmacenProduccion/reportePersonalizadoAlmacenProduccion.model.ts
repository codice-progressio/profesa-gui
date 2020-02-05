import { Articulo } from '../almacenDeMateriaPrimaYHerramientas/articulo.modelo'
export class ReportePersonalizadoAlmacenProduccion {
  constructor(
    public _id?: string,
    public nombre?: string,
    public descripcion?: string,
    public articulos: Articulo[] = [],
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
