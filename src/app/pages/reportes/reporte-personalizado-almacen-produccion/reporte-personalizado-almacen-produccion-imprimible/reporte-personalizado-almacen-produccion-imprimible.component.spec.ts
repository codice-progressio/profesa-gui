import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportePersonalizadoAlmacenProduccionImprimibleComponent } from './reporte-personalizado-almacen-produccion-imprimible.component';

describe('ReportePersonalizadoAlmacenProduccionImprimibleComponent', () => {
  let component: ReportePersonalizadoAlmacenProduccionImprimibleComponent;
  let fixture: ComponentFixture<ReportePersonalizadoAlmacenProduccionImprimibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportePersonalizadoAlmacenProduccionImprimibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportePersonalizadoAlmacenProduccionImprimibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
