import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenDetalleEmpaqueComponent } from './orden-detalle-empaque.component';

describe('OrdenDetalleEmpaqueComponent', () => {
  let component: OrdenDetalleEmpaqueComponent;
  let fixture: ComponentFixture<OrdenDetalleEmpaqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenDetalleEmpaqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenDetalleEmpaqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
