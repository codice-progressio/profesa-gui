import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannerFormularioDinamicoMaquinasComponent } from './scanner-formulario-dinamico-maquinas.component';

describe('ScannerFormularioDinamicoMaquinasComponent', () => {
  let component: ScannerFormularioDinamicoMaquinasComponent;
  let fixture: ComponentFixture<ScannerFormularioDinamicoMaquinasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScannerFormularioDinamicoMaquinasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannerFormularioDinamicoMaquinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
