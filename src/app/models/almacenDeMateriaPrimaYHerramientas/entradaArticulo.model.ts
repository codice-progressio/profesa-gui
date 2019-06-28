export class EntradaArticulo {
  constructor(
    public fecha?: Date,
    public cantidad?: number,
    public observaciones?: string
  ) {}

  deserialize(input: this): this {
    Object.assign(this, input)
    return this
  }
}
