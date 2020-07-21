import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenDetalleImprimirComponent } from './orden-detalle-imprimir.component';

describe('OrdenDetalleImprimirComponent', () => {
  let component: OrdenDetalleImprimirComponent;
  let fixture: ComponentFixture<OrdenDetalleImprimirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenDetalleImprimirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenDetalleImprimirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
