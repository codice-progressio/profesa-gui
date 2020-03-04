import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenDetalleTransformacionComponent } from './orden-detalle-transformacion.component';

describe('OrdenDetalleTransformacionComponent', () => {
  let component: OrdenDetalleTransformacionComponent;
  let fixture: ComponentFixture<OrdenDetalleTransformacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenDetalleTransformacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenDetalleTransformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
