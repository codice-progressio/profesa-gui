import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SkuListaComponent } from './almacen/sku-lista/sku-lista.component'
import { SkuDetalleComponent } from './almacen/sku-detalle/sku-detalle.component'
import { SkuCrearModificarComponent } from './almacen/sku-crear-modificar/sku-crear-modificar.component'
import { DirectivesModule } from '../directives/directives.module'
import { UxModule } from '../ux/ux.module'
import { ReactiveFormsModule } from '@angular/forms'
import { ValidacionInputsComponent } from './validacion-inputs/validacion-inputs.component'
import { VisorDeImagenesConPaginacionComponent } from '../shared/visor-de-imagenes-con-paginacion/visor-de-imagenes-con-paginacion.component'
import { ImagenesGestionRapidaComponent } from './imagenes-gestion-rapida/imagenes-gestion-rapida.component'
import { SkuImagenesComponent } from './almacen/sku-imagenes/sku-imagenes.component'
import { ModalComponent } from './codice-modal/modal.component'
import { BuscadorRapido } from './buscador-rapido/buscador-rapido'
import { BuscadorComponent } from './buscador/buscador.component'

@NgModule({
  declarations: [
    SkuListaComponent,
    SkuDetalleComponent,
    SkuCrearModificarComponent,
    ValidacionInputsComponent,
    VisorDeImagenesConPaginacionComponent,
    ImagenesGestionRapidaComponent,
    SkuImagenesComponent,
    ModalComponent,
    BuscadorComponent
  ],
  imports: [CommonModule, DirectivesModule, UxModule, ReactiveFormsModule],
  exports: [
    SkuListaComponent,
    SkuDetalleComponent,
    SkuCrearModificarComponent,
    ValidacionInputsComponent,
    VisorDeImagenesConPaginacionComponent,
    SkuImagenesComponent,
    ModalComponent,
    BuscadorComponent
  ]
})
export class ComponentsModule {}
