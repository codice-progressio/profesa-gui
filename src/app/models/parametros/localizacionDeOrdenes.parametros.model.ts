import { Proceso } from 'src/app/models/proceso.model'
export class LocalizacionDeOrdenes {
  constructor(
    public procesosIniciales: Proceso[] = [],
    public procesosFinales: Proceso[] = []
  ) {}
}
