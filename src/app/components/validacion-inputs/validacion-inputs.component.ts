import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validacion-inputs',
  templateUrl: './validacion-inputs.component.html',
  styles: []
})
export class ValidacionInputsComponent implements OnInit {
  
  // Este es necesario para saber el estado del input. 
  // Touch, y si tiene error el validador. 
  @Input() campo: AbstractControl = null;
  @Input() especial: string = null;
  
  j = JSON;


  constructor() {}

  ngOnInit() {
  }



}
