import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AlmacenComponent } from './almacen.component';


const routes: Routes = [
  { path: '', component: AlmacenComponent }
];

@NgModule({
  declarations: [AlmacenComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AlmacenModule { }
