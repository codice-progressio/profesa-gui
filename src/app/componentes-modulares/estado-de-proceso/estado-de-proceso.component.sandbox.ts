import { sandboxOf } from 'angular-playground'
import { PROCESOS } from 'src/app/config/procesos'
import { EstadoDeProcesoComponent } from './estado-de-proceso.component'
import { EstadoDeProceso } from './estado-de-proceso.model'

let contador = 0
const datos: Partial<EstadoDeProceso>[] = new Array(10)
  .fill({} as Partial<EstadoDeProceso>)
  .map(x => {
    return {
      _id: Math.trunc(Math.random() * 12) + '',
      nombre: 'PROCESOS ' + contador++,
      descripcion: 'Descripcion del proceso ' + contador,
      hora_inicio: new Date(),
      hora_final: new Date(new Date().getDate() + 1),
      observaciones:
        'Estas son unas observaciones de los datos que estamos generando en proceso ' +
        contador
    }
  })

const template = `<app-estado-de-proceso [estados]="estados" ></app-estado-de-proceso>`

export default sandboxOf(EstadoDeProcesoComponent)
  .add('1 estado', {
    template,
    context: {
      estados: datos.slice(0, 1)
    }
  })
  .add('5 estados', {
    template,
    context: {
      estados: datos.slice(0, 5)
    }
  })
  .add('10 estados', {
    template,
    context: {
      estados: datos
    }
  })
