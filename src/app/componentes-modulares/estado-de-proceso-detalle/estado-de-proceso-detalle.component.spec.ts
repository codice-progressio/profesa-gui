import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoDeProcesoDetalleComponent } from './estado-de-proceso-detalle.component';

describe('EstadoDeProcesoDetalleComponent', () => {
  let component: EstadoDeProcesoDetalleComponent;
  let fixture: ComponentFixture<EstadoDeProcesoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadoDeProcesoDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoDeProcesoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
