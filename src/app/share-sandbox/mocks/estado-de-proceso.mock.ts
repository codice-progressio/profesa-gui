import { EstadoDeProceso } from 'src/app/componentes-modulares/estado-de-proceso/estado-de-proceso.model'

let contador = 0
export const EstadoDeProcesoMock: Partial<EstadoDeProceso>[] = new Array(10)
  .fill({} as Partial<EstadoDeProceso>)
  .map(x => {
    return {
      _id: Math.trunc(Math.random() * 12) + '',
      nombre: 'PROCESOS ' + contador++,
      descripcion: 'Descripcion del proceso ' + contador,
      hora_inicio: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7),
      hora_final: new Date(new Date()),
      observaciones:
        'Estas son unas observaciones de los datos que estamos generando en proceso ' +
        contador
    }
  })

export const EstadoDeProcesoMockCopia = (): Partial<EstadoDeProceso>[] =>
  JSON.parse(JSON.stringify(EstadoDeProcesoMock)) as Partial<EstadoDeProceso>[]
