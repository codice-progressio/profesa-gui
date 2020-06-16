import { Proceso } from 'src/app/models/proceso.model'
export class LocalizacionDeOrdenes {
  constructor(
    public procesosIniciales: Proceso[] = [],
    public procesosInicialesAlmacen: Proceso[] = [],
    public procesosFinales: Proceso[] = [],
    public campoFinal?: string
  ) {}
}
