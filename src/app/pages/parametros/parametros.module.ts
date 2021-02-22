import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { ParametrosComponent } from './parametros.component'
import { ComponentsModule } from '../../components/components.module'

const routes: Routes = [{ path: '', component: ParametrosComponent }]

@NgModule({
  declarations: [ParametrosComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ComponentsModule]
})
export class ParametrosModule {}
