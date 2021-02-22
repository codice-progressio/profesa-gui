import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SkuListaComponent } from './almacen/sku-lista/sku-lista.component'
import { SkuDetalleComponent } from './almacen/sku-detalle/sku-detalle.component'
import { SkuCrearModificarComponent } from './almacen/sku-crear-modificar/sku-crear-modificar.component'
import { DirectivesModule } from '../directives/directives.module'
import { UxModule } from '../ux/ux.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ValidacionInputsComponent } from './validacion-inputs/validacion-inputs.component'
import { VisorDeImagenesConPaginacionComponent } from '../shared/visor-de-imagenes-con-paginacion/visor-de-imagenes-con-paginacion.component'
import { ImagenesGestionRapidaComponent } from './imagenes-gestion-rapida/imagenes-gestion-rapida.component'
import { SkuImagenesComponent } from './almacen/sku-imagenes/sku-imagenes.component'
import { BuscadorComponent } from './buscador/buscador.component'
import { SkuSalidaComponent } from './almacen/sku-salida/sku-salida.component'
import { SkuEntradaComponent } from './almacen/sku-entrada/sku-entrada.component'
import { SkuEtiquetasComponent } from './almacen/sku-etiquetas/sku-etiquetas.component'
import { SkuStockMinimoMaximoComponent } from './almacen/sku-stock-minimo-maximo/sku-stock-minimo-maximo.component'
import { NgxMaskModule } from 'ngx-mask'
import { SkuLotesComponent } from './almacen/sku-lotes/sku-lotes.component'
import { PedidosListaComponent } from './pedidos/pedidos-lista/pedidos-lista.component'
import { PedidoCrearEditarDetalleComponent } from './pedidos/pedido-crear-editar-detalle/pedido-crear-editar-detalle.component'
import { EtiquetasEditorComponent } from './etiquetas-editor/etiquetas-editor.component'
import { ModalModule } from '@codice-progressio/modal'

@NgModule({
  declarations: [
    SkuListaComponent,
    SkuDetalleComponent,
    SkuCrearModificarComponent,
    ValidacionInputsComponent,
    VisorDeImagenesConPaginacionComponent,
    ImagenesGestionRapidaComponent,
    SkuImagenesComponent,
    BuscadorComponent,
    SkuSalidaComponent,
    SkuEntradaComponent,
    SkuEtiquetasComponent,
    SkuStockMinimoMaximoComponent,
    SkuLotesComponent,
    PedidosListaComponent,
    PedidoCrearEditarDetalleComponent,
    EtiquetasEditorComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    UxModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forChild(),
    ModalModule
  ],
  exports: [
    SkuListaComponent,
    SkuDetalleComponent,
    SkuCrearModificarComponent,
    ValidacionInputsComponent,
    VisorDeImagenesConPaginacionComponent,
    SkuImagenesComponent,
    BuscadorComponent,
    ImagenesGestionRapidaComponent,
    PedidosListaComponent,
    PedidoCrearEditarDetalleComponent,
    EtiquetasEditorComponent
  ]
})
export class ComponentsModule {}
