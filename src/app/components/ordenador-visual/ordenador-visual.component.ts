import { Component, OnInit, Input } from '@angular/core';
import { FamiliaDeProcesos, Procesos } from 'src/app/models/familiaDeProcesos.model';
import { ModeloCompleto } from 'src/app/models/modeloCompleto.modelo';
import { OrdenadorVisualService } from './ordenador-visual.service';
import { ProcesoService } from 'src/app/services/service.index';

@Component({
  selector: 'app-ordenador-visual',
  templateUrl: './ordenador-visual.component.html',
  styles: []
})
export class OrdenadorVisualComponent implements OnInit {
  
  procesosOcultos: boolean = false
  constructor (
    public _s: OrdenadorVisualService,
    
  ) {

    
  }

  ngOnInit(): void {
   
  }

 
}
