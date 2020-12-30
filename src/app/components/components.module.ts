import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SkuListaComponent } from './almacen/sku-lista/sku-lista.component'
import { SkuDetalleComponent } from './almacen/sku-detalle/sku-detalle.component'
import { SkuCrearModificarComponent } from './almacen/sku-crear-modificar/sku-crear-modificar.component'

@NgModule({
  declarations: [
    SkuListaComponent,
    SkuDetalleComponent,
    SkuCrearModificarComponent
  ],
  imports: [CommonModule],
  exports: [SkuListaComponent, SkuDetalleComponent, SkuCrearModificarComponent]
})
export class ComponentsModule {}
