import { sandboxOf } from 'angular-playground'
import { PedidoGlobalCardComponent } from './pedido-global-card.component'
import { PedidosMock } from '../../../../share-sandbox/mocks/pedido-global-card.mock'

import { GoblalTemplateSandbox } from 'src/app/share-sandbox/templates/globlal.template.sandbox'

export default sandboxOf(PedidoGlobalCardComponent)
  .add('Sin pedidos', {
    template: GoblalTemplateSandbox(`<app-pedido-global-card  
    [pedidos]="pedidos"
    [esModoOffline]="true"
  ></app-pedido-global-card>`),
    context: { pedidos: [] }
  })
  .add('2 pedidos online', {
    template: GoblalTemplateSandbox(`<app-pedido-global-card  
    [pedidos]="pedidos"
    [esModoOffline]="false"
  ></app-pedido-global-card>`),
    context: { pedidos: PedidosMock.splice(0, 2) }
  })
  .add('Sincronizando con la nube', {
    template: GoblalTemplateSandbox(`<app-pedido-global-card  
    [pedidos]="pedidos"
    [esModoOffline]="false"
    [cargando]="true"
  ></app-pedido-global-card>`),
    context: { pedidos: PedidosMock.splice(0, 2) }
  })
  .add('Sincronizado', {
    template: GoblalTemplateSandbox(`<app-pedido-global-card  
    [pedidos]="pedidos"
    [esModoOffline]="false"
    [cargando]="false"
  ></app-pedido-global-card>`),
    context: {
      pedidos: PedidosMock.splice(0, 2).map(x => {
        x.sincronizado = true
        return x
      })
    }
  })
  .add('100 pedidos offline', {
    template: GoblalTemplateSandbox(`<app-pedido-global-card  
    [pedidos]="pedidos"
    [esModoOffline]="true"
  ></app-pedido-global-card>`),
    context: { pedidos: PedidosMock }
  })
