import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EstadoDeProcesoComponent } from './estado-de-proceso.component'

@NgModule({
  declarations: [EstadoDeProcesoComponent],
  exports: [EstadoDeProcesoComponent],
  imports: [CommonModule]
})
export class EstadoDeProcesoModule {}
