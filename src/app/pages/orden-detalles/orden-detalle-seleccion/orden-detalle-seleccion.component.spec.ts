import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenDetalleSeleccionComponent } from './orden-detalle-seleccion.component';

describe('OrdenDetalleSeleccionComponent', () => {
  let component: OrdenDetalleSeleccionComponent;
  let fixture: ComponentFixture<OrdenDetalleSeleccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenDetalleSeleccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenDetalleSeleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
