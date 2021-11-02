import { sandboxOf } from 'angular-playground'
import { EstadoDeProcesoDetalleComponent } from './estado-de-proceso-detalle.component'

import { EstadoDeProcesoMockCopia } from 'src/app/share-sandbox/mocks/estado-de-proceso.mock'

import { GoblalTemplateSandbox } from 'src/app/share-sandbox/templates/globlal.template.sandbox'

export default sandboxOf(EstadoDeProcesoDetalleComponent)
  .add('Sin datos', {
    template: GoblalTemplateSandbox(
      `<app-estado-de-proceso-detalle
    [datos]="datos"
    ></app-estado-de-proceso-detalle>`
    ),
    context: {
      datos: EstadoDeProcesoMockCopia()
        .splice(0, 1)
        .map(x => {
          x.observaciones = null
          x.descripcion = null
          x.hora_inicio = null
          x.icono = null
          x.nombre = null
          return x
        })
    }
  })
  .add('Procesos sin terminar', {
    template: GoblalTemplateSandbox(
      `<app-estado-de-proceso-detalle
    [datos]="datos"
    ></app-estado-de-proceso-detalle>`
    ),
    context: {
      datos: EstadoDeProcesoMockCopia().map(x => {
        x.hora_final = null
        return x
      })
    }
  })
  .add('Procesos terminados', {
    template: GoblalTemplateSandbox(
      `<app-estado-de-proceso-detalle
    [datos]="datos"
    ></app-estado-de-proceso-detalle>`
    ),
    context: {
      datos: EstadoDeProcesoMockCopia()
    }
  })
  .add('Procesos datos faltantes', {
    template: GoblalTemplateSandbox(
      `<app-estado-de-proceso-detalle
    [datos]="datos"
    ></app-estado-de-proceso-detalle>`
    ),
    context: {
      datos: EstadoDeProcesoMockCopia().map(x => {
        x.observaciones = null
        x.descripcion = null
        x.hora_inicio = null
        x.icono = null
        x.nombre = null
        return x
      })
    }
  })
