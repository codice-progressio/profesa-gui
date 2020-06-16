import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannerFormularioDinamicoComponent } from './scanner-formulario-dinamico.component';

describe('ScannerFormularioDinamicoComponent', () => {
  let component: ScannerFormularioDinamicoComponent;
  let fixture: ComponentFixture<ScannerFormularioDinamicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScannerFormularioDinamicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannerFormularioDinamicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
