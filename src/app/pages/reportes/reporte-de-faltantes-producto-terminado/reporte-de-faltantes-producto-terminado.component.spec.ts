import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteDeFaltantesProductoTerminadoComponent } from './reporte-de-faltantes-producto-terminado.component';

describe('ReporteDeFaltantesProductoTerminadoComponent', () => {
  let component: ReporteDeFaltantesProductoTerminadoComponent;
  let fixture: ComponentFixture<ReporteDeFaltantesProductoTerminadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteDeFaltantesProductoTerminadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteDeFaltantesProductoTerminadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
