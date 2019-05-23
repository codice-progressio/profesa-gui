import { Component, OnInit } from '@angular/core';
import { QrScannerService } from './qr-scanner.service';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styles: []
})
export class QrScannerComponent<T> implements OnInit {

  constructor(
    public _s: QrScannerService<T>
  ) { }

  ngOnInit() {
  }

}
