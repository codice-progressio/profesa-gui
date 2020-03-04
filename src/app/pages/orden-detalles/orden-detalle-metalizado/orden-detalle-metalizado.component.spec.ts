import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenDetalleMetalizadoComponent } from './orden-detalle-metalizado.component';

describe('OrdenDetalleMetalizadoComponent', () => {
  let component: OrdenDetalleMetalizadoComponent;
  let fixture: ComponentFixture<OrdenDetalleMetalizadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenDetalleMetalizadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenDetalleMetalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
