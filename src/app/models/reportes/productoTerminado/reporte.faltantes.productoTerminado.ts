export class ReporteFaltantesProductoTerminado {
  constructor(
    public _id?: string,
    public nombreCompleto?: string,
    public stockMinimo?: number,
    public stockMaximo?: number,
    public existencia?: number,
    public pedir?: number,
    public ordenesEnTransito: [
      {
        _id?: string
        idFolio?: string
        idOrden?: string
        cliente?: {
          _id?: string
          nombre?: string
          sae?: number
        }
        vendedor?: {
          _id?: string
          nombre?: string
          email?: string
          img?: string
        }
        observacionesVendedor?: string
        observaciones?: string
        cantidad?: number
        observacionesPedido?: string
        observacionesVendedorPedido?: string
        modeloCompleto?: string
      }
    ] = [{}],
    public enTransito?: number
  ) {}
}
