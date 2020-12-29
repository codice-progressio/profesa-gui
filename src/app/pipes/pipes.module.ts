import { NgModule } from '@angular/core'
import { ImagenPipe } from './imagen.pipe'
import { FechaPipe } from './fecha.pipe'
import { CommonModule, DecimalPipe } from '@angular/common'
import { TiempoTranscurridoInformalPipe } from './tiempo-transcurrido-informal.pipe'
import { ContieneElPermisoPipe } from './contiene-el-permiso.pipe'
// Este modulo se tiene que importar en los PAGES por que ahi es donde
// vamos atrabajar con el.
@NgModule({
  imports: [CommonModule],
  declarations: [
    ImagenPipe,
    FechaPipe,
    TiempoTranscurridoInformalPipe,
    ContieneElPermisoPipe
  ],
  exports: [
    ImagenPipe,
    FechaPipe,
    TiempoTranscurridoInformalPipe,
    ContieneElPermisoPipe
  ]
})
export class PipesModule {}
