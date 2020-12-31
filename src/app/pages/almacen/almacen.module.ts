import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { AlmacenComponent } from './almacen.component'
import { UxModule } from '../../ux/ux.module'
import { ComponentsModule } from '../../components/components.module'

const routes: Routes = [
  {
    path: '',
    component: AlmacenComponent,
    data: {
      titulo: 'Almacen'
    }
  }
]

@NgModule({
  declarations: [AlmacenComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UxModule,
    ComponentsModule
  ]
})
export class AlmacenModule {}
