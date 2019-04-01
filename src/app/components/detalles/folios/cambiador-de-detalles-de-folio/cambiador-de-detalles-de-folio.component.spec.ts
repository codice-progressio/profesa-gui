import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiadorDeDetallesDeFolioComponent } from './cambiador-de-detalles-de-folio.component';

describe('CambiadorDeDetallesDeFolioComponent', () => {
  let component: CambiadorDeDetallesDeFolioComponent;
  let fixture: ComponentFixture<CambiadorDeDetallesDeFolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambiadorDeDetallesDeFolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiadorDeDetallesDeFolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
