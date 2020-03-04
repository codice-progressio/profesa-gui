import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenDetalleAvanceComponent } from './orden-detalle-avance.component';

describe('OrdenDetalleAvanceComponent', () => {
  let component: OrdenDetalleAvanceComponent;
  let fixture: ComponentFixture<OrdenDetalleAvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenDetalleAvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenDetalleAvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
