import { Deserializable } from "../deserealizable.model"
import { Divisa } from "../divisas/divisa.model"
import { Articulo } from "../almacenDeMateriaPrimaYHerramientas/articulo.modelo"
export class RelacionArticulo implements Deserializable {
  constructor(
    public precioUnitario?: number,
    public divisa?: Divisa,
    public item?: Articulo,
    public tiempoDeEntregaEnDias?: number,
    public prioridad?: number
  ) {}
  deserialize(input: this): this {
    Object.assign(this, input)
    this.item = new Articulo().deserialize(input.item)
    this.divisa = new Divisa().deserialize(input.divisa)
    return this
  }
}
