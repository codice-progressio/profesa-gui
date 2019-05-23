import { Component, OnInit } from '@angular/core';
import { OrdenadorVisualService } from './ordenador-visual.service';

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
