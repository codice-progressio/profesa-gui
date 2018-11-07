import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreLoaderService {
  cargando: boolean = false;
  leyenda: string = '...';
  
  constructor() { }
}
