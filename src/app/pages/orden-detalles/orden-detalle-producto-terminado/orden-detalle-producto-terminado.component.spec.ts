import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenDetalleProductoTerminadoComponent } from './orden-detalle-producto-terminado.component';

describe('OrdenDetalleProductoTerminadoComponent', () => {
  let component: OrdenDetalleProductoTerminadoComponent;
  let fixture: ComponentFixture<OrdenDetalleProductoTerminadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenDetalleProductoTerminadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenDetalleProductoTerminadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
