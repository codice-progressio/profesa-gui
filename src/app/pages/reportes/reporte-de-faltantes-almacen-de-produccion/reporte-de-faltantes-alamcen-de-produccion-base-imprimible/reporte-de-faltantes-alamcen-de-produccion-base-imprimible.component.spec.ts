import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteDeFaltantesAlamcenDeProduccionBaseImprimibleComponent } from './reporte-de-faltantes-alamcen-de-produccion-base-imprimible.component';

describe('ReporteDeFaltantesAlamcenDeProduccionBaseImprimibleComponent', () => {
  let component: ReporteDeFaltantesAlamcenDeProduccionBaseImprimibleComponent;
  let fixture: ComponentFixture<ReporteDeFaltantesAlamcenDeProduccionBaseImprimibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteDeFaltantesAlamcenDeProduccionBaseImprimibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteDeFaltantesAlamcenDeProduccionBaseImprimibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
