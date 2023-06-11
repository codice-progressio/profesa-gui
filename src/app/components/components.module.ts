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
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask'
import { SkuLotesComponent } from './almacen/sku-lotes/sku-lotes.component'

import { EtiquetasEditorComponent } from './etiquetas-editor/etiquetas-editor.component'
import { ModalModule } from '@codice-progressio/modal'
import { ControlRemisionesComponent } from './control-remisiones/control-remisiones.component'

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
    EtiquetasEditorComponent,
    ControlRemisionesComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    UxModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule,
    NgxMaskDirective, NgxMaskPipe
  ],
  exports: [
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
    EtiquetasEditorComponent,
    ControlRemisionesComponent
  ],
  providers: [provideNgxMask()]
})
export class ComponentsModule {}
