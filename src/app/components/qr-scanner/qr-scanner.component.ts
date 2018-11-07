import { Component, OnInit } from '@angular/core';
import { QrScannerService } from '../qrScanner/qr-scanner.service';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styles: []
})
export class QrScannerComponent implements OnInit {

  constructor(
    public _s: QrScannerService
  ) { }

  ngOnInit() {
  }

}
