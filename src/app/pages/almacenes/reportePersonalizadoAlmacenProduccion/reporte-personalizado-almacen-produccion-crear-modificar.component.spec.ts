import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportePersonalizadoAlmacenProduccionCrearModificarComponent } from './reporte-personalizado-almacen-produccion-crear-modificar.component';

describe('ReportePersonalizadoAlmacenProduccionCrearModificarComponent', () => {
  let component: ReportePersonalizadoAlmacenProduccionCrearModificarComponent;
  let fixture: ComponentFixture<ReportePersonalizadoAlmacenProduccionCrearModificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportePersonalizadoAlmacenProduccionCrearModificarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportePersonalizadoAlmacenProduccionCrearModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
