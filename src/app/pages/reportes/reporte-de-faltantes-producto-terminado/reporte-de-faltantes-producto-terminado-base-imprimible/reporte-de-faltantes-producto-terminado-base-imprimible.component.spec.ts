import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteDeFaltantesProductoTerminadoBaseImprimibleComponent } from './reporte-de-faltantes-producto-terminado-base-imprimible.component';

describe('ReporteDeFaltantesProductoTerminadoBaseImprimibleComponent', () => {
  let component: ReporteDeFaltantesProductoTerminadoBaseImprimibleComponent;
  let fixture: ComponentFixture<ReporteDeFaltantesProductoTerminadoBaseImprimibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteDeFaltantesProductoTerminadoBaseImprimibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteDeFaltantesProductoTerminadoBaseImprimibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
