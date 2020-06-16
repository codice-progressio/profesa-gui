import { NgModule } from '@angular/core'
import { ImagenPipe } from './imagen.pipe'
import { FechaPipe } from './fecha.pipe'
import { ModeloCompletoPipe } from './modelo-completo.pipe'
import { CommonModule, DecimalPipe } from '@angular/common'
import { TiempoTranscurridoInformalPipe } from './tiempo-transcurrido-informal.pipe'
import { FechaDiferenciaPipe } from './fecha-diferencia.pipe'
import { ContieneElPermisoPipe } from './contiene-el-permiso.pipe'
// Esto no se utiliza. ngIf, nfFor.
// import { CommonModule } from '@angular/common';

// Este modulo se tiene que importar en los PAGES por que ahi es donde
// vamos atrabajar con el.
@NgModule({
  imports: [CommonModule],
  declarations: [
    ImagenPipe,
    FechaPipe,
    ModeloCompletoPipe,
    TiempoTranscurridoInformalPipe,
    FechaDiferenciaPipe,
    ContieneElPermisoPipe
  ],
  exports: [
    ImagenPipe,
    FechaPipe,
    ModeloCompletoPipe,
    TiempoTranscurridoInformalPipe,
    FechaDiferenciaPipe,
    ContieneElPermisoPipe
  ]
})
export class PipesModule {}
