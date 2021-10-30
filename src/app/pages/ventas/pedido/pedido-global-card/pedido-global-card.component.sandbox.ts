import { sandboxOf } from 'angular-playground'
import { PedidoGlobalCardComponent } from './pedido-global-card.component'
import { PedidosMock } from './pedido-global-card.mock'

const template = temp => {
  return `
    <div class="container">
    <div class="row">
    <div class="col-12">
    
    ${temp}
    
    </div>
    </div>
    </div>

  `
}

export default sandboxOf(PedidoGlobalCardComponent)
  .add('2 pedidos online', {
    template: template(`<app-pedido-global-card  
    [pedidos]="pedidos"
    [esModoOffline]="false"
  ></app-pedido-global-card>`),
    context: { pedidos: PedidosMock.splice(0, 2) }
  })
  .add('Sincronizando con la nube', {
    template: template(`<app-pedido-global-card  
    [pedidos]="pedidos"
    [esModoOffline]="false"
    [cargando]="true"
  ></app-pedido-global-card>`),
    context: { pedidos: PedidosMock.splice(0, 2) }
  })
  .add('Sincronizado', {
    template: template(`<app-pedido-global-card  
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
    template: template(`<app-pedido-global-card  
    [pedidos]="pedidos"
    [esModoOffline]="true"
  ></app-pedido-global-card>`),
    context: { pedidos: PedidosMock }
  })
