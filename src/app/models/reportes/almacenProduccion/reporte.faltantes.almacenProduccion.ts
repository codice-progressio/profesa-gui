export class ReporteFaltantesAlmacenProduccion {
  constructor(
    public _id?: string,
    public nombre?: string,
    public presentacion?: string,
    public stockMinimo?: number,
    public stockMaximo?: number,
    public existencia?: number,
    public enCamino?: number,
    public pedir?: number,
    public _7: iSalidasUltimosDias[] = [],
    public _30: iSalidasUltimosDias[] = [],
    public _365: iSalidasUltimosDias[] = [],
    public requisicionesPendientes: iRequisicionesPendientes[] = []
  ) {}
}

export interface iSalidasUltimosDias {
  _id?: string
  cantidad?: number
  departamento?: string
  observaciones?: string
  fecha?: Date
}

export interface iRequisicionesPendientes {
  _id?: string
  materiaPrima?: boolean
  consumibles?: boolean
  gastosYServicios?: boolean
  cantidad?: number
  articulo?: string
  razonDeCambioTemp?: string
  esRequisicion?: boolean
  cantidadEntregadaALaFecha?: number
  esOrdenDeCompra?: boolean
  fechaDeGeneracionDeOrdenDeCompra?: Date
  fechaTermino?: Date
  esEntregaParcial?: boolean
  fechaEntregaParcialidad?: Date
  usuario?: string
  createdAt?: Date
  folio?: number
}
