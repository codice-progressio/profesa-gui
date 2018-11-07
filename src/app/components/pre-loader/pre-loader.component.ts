import { Component, OnInit } from '@angular/core';
import { PreLoaderService } from './pre-loader.service';

@Component({
  selector: 'app-pre-loader',
  templateUrl: './pre-loader.component.html',
  styles: []
})
export class PreLoaderComponent implements OnInit {

  constructor(
    public _s: PreLoaderService
  ) { }
  ngOnInit() {
  }

}
