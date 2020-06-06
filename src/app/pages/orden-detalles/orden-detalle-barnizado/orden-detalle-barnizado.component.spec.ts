import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenDetalleBarnizadoComponent } from './orden-detalle-barnizado.component';

describe('OrdenDetalleBarnizadoComponent', () => {
  let component: OrdenDetalleBarnizadoComponent;
  let fixture: ComponentFixture<OrdenDetalleBarnizadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenDetalleBarnizadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenDetalleBarnizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
