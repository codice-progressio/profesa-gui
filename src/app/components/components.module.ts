import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SkuListaComponent } from './almacen/sku-lista/sku-lista.component'
import { SkuDetalleComponent } from './almacen/sku-detalle/sku-detalle.component'
import { SkuCrearModificarComponent } from './almacen/sku-crear-modificar/sku-crear-modificar.component'
import { DirectivesModule } from '../directives/directives.module'
import { UxModule } from '../ux/ux.module'

@NgModule({
  declarations: [
    SkuListaComponent,
    SkuDetalleComponent,
    SkuCrearModificarComponent
  ],
  imports: [CommonModule, DirectivesModule, UxModule],
  exports: [SkuListaComponent, SkuDetalleComponent, SkuCrearModificarComponent]
})
export class ComponentsModule {}
