import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportePersonalizadoAlmacenProduccionComponent } from './reporte-personalizado-almacen-produccion.component';

describe('ReportePersonalizadoAlmacenProduccionComponent', () => {
  let component: ReportePersonalizadoAlmacenProduccionComponent;
  let fixture: ComponentFixture<ReportePersonalizadoAlmacenProduccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportePersonalizadoAlmacenProduccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportePersonalizadoAlmacenProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
