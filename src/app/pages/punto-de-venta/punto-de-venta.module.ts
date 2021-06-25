import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PuntoDeVentaComponent } from './punto-de-venta.component';
import { PipesModule } from '../../pipes/pipes.module'
import { NgxMaskModule } from 'ngx-mask'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'


const routes: Routes = [
  { path: '', component: PuntoDeVentaComponent }
];

@NgModule({
  declarations: [
    PuntoDeVentaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PipesModule,
    NgxMaskModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PuntoDeVentaModule { }
