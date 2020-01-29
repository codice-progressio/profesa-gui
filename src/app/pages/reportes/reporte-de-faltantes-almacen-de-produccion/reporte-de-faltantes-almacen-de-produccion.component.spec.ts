import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteDeFaltantesAlmacenDeProduccionComponent } from './reporte-de-faltantes-almacen-de-produccion.component';

describe('ReporteDeFaltantesAlmacenDeProduccionComponent', () => {
  let component: ReporteDeFaltantesAlmacenDeProduccionComponent;
  let fixture: ComponentFixture<ReporteDeFaltantesAlmacenDeProduccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteDeFaltantesAlmacenDeProduccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteDeFaltantesAlmacenDeProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
