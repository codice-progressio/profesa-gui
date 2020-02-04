import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportePersonalizadoAlmacenProduccionDetalleComponent } from './reporte-personalizado-almacen-produccion-detalle.component';

describe('ReportePersonalizadoAlmacenProduccionDetalleComponent', () => {
  let component: ReportePersonalizadoAlmacenProduccionDetalleComponent;
  let fixture: ComponentFixture<ReportePersonalizadoAlmacenProduccionDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportePersonalizadoAlmacenProduccionDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportePersonalizadoAlmacenProduccionDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
