import { sandboxOf } from 'angular-playground'
import { PROCESOS } from 'src/app/config/procesos'
import { EstadoDeProcesoComponent } from './estado-de-proceso.component'
import { EstadoDeProceso } from './estado-de-proceso.model'
import { EstadoDeProcesoMock } from 'src/app/share-sandbox/mocks/estado-de-proceso.mock'

const template = `<app-estado-de-proceso [estados]="estados" ></app-estado-de-proceso>`

export default sandboxOf(EstadoDeProcesoComponent)
  .add('1 estado', {
    template,
    context: {
      estados: EstadoDeProcesoMock.slice(0, 1)
    }
  })
  .add('5 estados', {
    template,
    context: {
      estados: EstadoDeProcesoMock.slice(0, 5)
    }
  })
  .add('10 estados', {
    template,
    context: {
      estados: EstadoDeProcesoMock
    }
  })
